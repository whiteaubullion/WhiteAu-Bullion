'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Record login activity
  if (data.user) {
    await supabase.from('login_activity').insert({
      user_id: data.user.id,
      login_method: 'email/password',
      login_status: 'success'
    })
  }

  redirect('/live-rates')
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !password || !fullName || !phone) {
    return { error: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const supabase = await createClient()

  // Sign up the user. This will send an OTP to their email.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phone,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, step: 'VERIFY_OTP', email }
}

export async function verifyOtp(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const token = formData.get('token') as string

  if (!email || !token) {
    return { error: 'Email and OTP are required', step: 'VERIFY_OTP', email }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  })

  if (error) {
    return { error: error.message, step: 'VERIFY_OTP', email }
  }

  // After successful verification, create the profile
  if (data.user) {
    const { full_name, phone_number } = data.user.user_metadata
    
    // We do an upsert or check first because auth triggers might be added later
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: data.user.id,
      full_name: full_name || 'User',
      email: data.user.email,
      phone_number: phone_number || null,
      role: 'user',
      account_status: 'active'
    })

    if (profileError) {
      console.error('Error creating profile:', profileError)
    }

    // Record login activity
    await supabase.from('login_activity').insert({
      user_id: data.user.id,
      login_method: 'otp_verification',
      login_status: 'success'
    })
  }

  redirect('/live-rates')
}

export async function resendOtp(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })
  
  if (error) {
    return { error: error.message }
  }
  return { success: true }
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required', step: 'FORGOT_PASSWORD' }
  }

  const supabase = await createClient()
  
  // Note: For a real app you'd want a proper reset flow with a custom redirect URL
  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    return { error: error.message, step: 'FORGOT_PASSWORD' }
  }

  return { success: true, message: 'Password reset link sent to your email.', step: 'LOGIN' }
}
