import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/live-rates'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // If there was no error, check if this is a password reset flow
      // Normally Supabase redirects to / with a #access_token if you don't use PKCE,
      // but if you do, it hits here. 
      // If it's a reset password link, they might want to go to an update password page.
      // We'll just redirect to live-rates, or if they need to update, maybe /login?
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // Just redirect them to the portal.
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Invalid+or+expired+link`)
}
