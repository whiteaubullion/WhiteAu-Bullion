'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submitLeadAction(prevState: any, formData: FormData) {
  const fullName = (formData.get('fullName') as string || '').trim()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const phone = (formData.get('phone') as string || '').trim()

  if (!fullName || !email || !phone) {
    return { error: 'Please enter your Full Name, Email Address, and Mobile Number.' }
  }

  // Validate phone number (digits only, 10 to 15 digits)
  const cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length < 10 || cleanPhone.length > 15 || !/^\d+$/.test(phone)) {
    return { error: 'Please enter a valid mobile number (10 to 15 digits only).' }
  }

  // Basic email validation
  if (!email.includes('@') || !email.includes('.')) {
    return { error: 'Please enter a valid email address.' }
  }

  // Helper to ensure database calls don't hang if Supabase is unreachable
  const withTimeout = <T>(promise: PromiseLike<T> | Promise<T>, ms: number = 3000): Promise<T> => {
    return Promise.race([
      Promise.resolve(promise),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('DB_TIMEOUT')), ms))
    ])
  }

  let leadRecord: any = null
  let currentVisitCount = 1

  try {
    const supabase = await createClient()

    // 1. Check if this customer lead already exists by email
    const { data: existingLead } = await withTimeout(
      supabase
        .from('customer_leads')
        .select('*')
        .eq('email', email)
        .maybeSingle()
    )

    if (existingLead) {
      currentVisitCount = (existingLead.visit_count || 1) + 1
      const { data: updatedLead } = await withTimeout(
        supabase
          .from('customer_leads')
          .update({
            full_name: fullName || existingLead.full_name,
            phone_number: phone || existingLead.phone_number,
            visit_count: currentVisitCount,
            last_login_at: new Date().toISOString()
          })
          .eq('id', existingLead.id)
          .select()
          .single()
      )
      leadRecord = updatedLead || existingLead
    } else {
      const { data: newLead } = await withTimeout(
        supabase
          .from('customer_leads')
          .insert({
            full_name: fullName,
            email: email,
            phone_number: phone,
            visit_count: 1,
            last_login_at: new Date().toISOString()
          })
          .select()
          .single()
      )
      leadRecord = newLead
      currentVisitCount = 1
    }

    // 2. Insert into customer_rate_access log table
    if (leadRecord?.id) {
      await withTimeout(
        supabase.from('customer_rate_access').insert({
          lead_id: leadRecord.id,
          full_name: fullName,
          email: email,
          phone_number: phone,
          visit_number: currentVisitCount,
          accessed_at: new Date().toISOString()
        })
      )
    }
  } catch (dbErr) {
    console.warn('Database access timed out or failed, proceeding with session:', dbErr)
  }

  // 3. Set a secure customer session cookie so user stays authenticated to view live rates
  const cookieStore = await cookies()
  const customerSession = JSON.stringify({
    leadId: leadRecord?.id,
    fullName: fullName,
    email: email,
    phone: phone,
    visitCount: currentVisitCount
  })

  cookieStore.set('whiteau_customer_session', customerSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  })

  redirect('/live-rates')
}

// Fallback signout
export async function customerSignOut() {
  const cookieStore = await cookies()
  cookieStore.delete('whiteau_customer_session')
  redirect('/login')
}
