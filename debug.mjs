import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = fs.readFileSync('.env.local', 'utf-8')
const vars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.trim().split('=')))

const supabase = createClient(
  vars.NEXT_PUBLIC_SUPABASE_URL,
  vars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function check() {
  console.log("Checking DB...")
  const { data, error } = await supabase.from('profiles').select('*')
  console.log("Profiles (no auth):", data, error)
  const { data: auth, error: authError } = await supabase.auth.signInWithPassword({
    email: 'whiteau.bullion@gmail.com',
    password: 'Whiteau@123'
  })
  console.log("Auth:", !!auth?.user, authError)
  if (auth?.user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', auth.user.id)
      .single()
    console.log("My Profile:", profile, profileError)
  }
}
check()
