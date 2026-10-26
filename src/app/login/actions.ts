'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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

  const now = new Date().toISOString()
  let leadRecord: any = null
  let currentVisitCount = 1

  try {
    const supabase = await createClient()

    // 1. Check if this customer lead already exists by email
    const { data: existingLead, error: selectError } = await supabase
      .from('customer_leads')
      .select('id, visit_count, full_name, phone_number')
      .eq('email', email)
      .maybeSingle()

    if (selectError) {
      console.error('Error checking existing customer lead:', selectError.message)
    }

    if (existingLead) {
      currentVisitCount = (existingLead.visit_count || 1) + 1
      leadRecord = existingLead

      // Execute lead update and rate access log entry in parallel for maximum speed
      await Promise.all([
        supabase
          .from('customer_leads')
          .update({
            full_name: fullName || existingLead.full_name,
            phone_number: phone || existingLead.phone_number,
            visit_count: currentVisitCount,
            last_login_at: now
          })
          .eq('id', existingLead.id),
        supabase
          .from('customer_rate_access')
          .insert({
            lead_id: existingLead.id,
            full_name: fullName,
            email: email,
            phone_number: phone,
            visit_number: currentVisitCount,
            accessed_at: now
          })
      ])
    } else {
      // 2. New lead - insert into customer_leads
      const { data: newLead, error: insertError } = await supabase
        .from('customer_leads')
        .insert({
          full_name: fullName,
          email: email,
          phone_number: phone,
          visit_count: 1,
          last_login_at: now
        })
        .select('id')
        .single()

      if (insertError) {
        console.warn('Customer lead insert conflict or error, attempting fallback update:', insertError.message)
        const { data: fallbackLead } = await supabase
          .from('customer_leads')
          .select('id, visit_count')
          .eq('email', email)
          .maybeSingle()

        if (fallbackLead) {
          leadRecord = fallbackLead
          currentVisitCount = (fallbackLead.visit_count || 1) + 1

          await Promise.all([
            supabase
              .from('customer_leads')
              .update({
                full_name: fullName,
                phone_number: phone,
                visit_count: currentVisitCount,
                last_login_at: now
              })
              .eq('id', fallbackLead.id),
            supabase
              .from('customer_rate_access')
              .insert({
                lead_id: fallbackLead.id,
                full_name: fullName,
                email: email,
                phone_number: phone,
                visit_number: currentVisitCount,
                accessed_at: now
              })
          ])
        }
      } else {
        leadRecord = newLead
        currentVisitCount = 1

        if (newLead?.id) {
          await supabase.from('customer_rate_access').insert({
            lead_id: newLead.id,
            full_name: fullName,
            email: email,
            phone_number: phone,
            visit_number: 1,
            accessed_at: now
          })
        }
      }
    }

    // Instantly invalidate Admin dashboard caches so the login appears in the Admin panel without delay
    try {
      revalidatePath('/admin')
      revalidatePath('/admin/customer-access')
      revalidatePath('/admin/activity')
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr)
    }
  } catch (dbErr) {
    console.error('Database operation failed during customer login:', dbErr)
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
