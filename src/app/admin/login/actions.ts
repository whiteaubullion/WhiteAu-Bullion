'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function adminLogin(prevState: any, formData: FormData) {
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

  if (data.user) {
    // Verify admin role before allowing access
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      // If not an admin, sign them out immediately
      await supabase.auth.signOut()
      return { error: 'Access Denied: You do not have administrative privileges.' }
    }

    // Record login activity
    await supabase.from('login_activity').insert({
      user_id: data.user.id,
      login_method: 'admin_login',
      login_status: 'success'
    })
  }

  redirect('/admin')
}
