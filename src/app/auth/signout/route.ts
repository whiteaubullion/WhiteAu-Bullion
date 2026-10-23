import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.delete('whiteau_customer_session')

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}
