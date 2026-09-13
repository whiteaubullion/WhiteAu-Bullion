'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function initialAuthSubmit(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  
  if (!email || !phone) return { error: 'Email and Phone Number are required' }

  const supabase = await createClient()
  
  // Call the secure RPC function to check if the user exists
  const { data: exists, error } = await supabase.rpc('check_email_exists', { lookup_email: email })

  if (error) {
    console.error('Error checking email:', error)
  }

  if (exists) {
    // If user exists, go straight to password login
    return { email, phone, exists: true, step: 'PASSWORD' }
  } else {
    // New user: send OTP immediately
    const { error: otpError } = await supabase.auth.signInWithOtp({ email })
    if (otpError) return { error: otpError.message, email, phone }
    
    return { success: true, email, phone, exists: false, step: 'VERIFY_OTP' }
  }
}

export async function resendOtp(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) return { error: error.message }
  return { success: true }
}

export async function verifyOtp(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const token = formData.get('token') as string

  if (!email || !token) return { error: 'Email and OTP are required', email, phone }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (error) return { error: error.message, email, phone }

  // Successfully verified, proceed to ask for Name
  return { success: true, step: 'SIGNUP_NAME', email, phone }
}

export async function saveName(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const name = formData.get('name') as string

  if (!name) return { error: 'Name is required', email, phone, name }

  const supabase = await createClient()
  
  // Get the authenticated user (which is set after verifyOtp succeeds)
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.from('customers').upsert({
      id: user.id,
      name: name,
      email: email,
      phone: phone
    })
    
    if (error) {
      // If adding 'phone' fails because column doesn't exist yet, try without it as fallback, 
      // but also update auth metadata
      console.error('Error saving customer record:', error)
      await supabase.auth.updateUser({ data: { phone } })
    }
  }

  return { success: true, step: 'SET_PASSWORD' }
}

export async function setPassword(prevState: any, formData: FormData) {
  const password = formData.get('password') as string
  if (!password || password.length < 6) return { error: 'Password must be at least 6 characters' }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) return { error: error.message }
  redirect('/live-rates')
}

export async function loginWithPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and Password are required', email }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message, email }
  redirect('/live-rates')
}
