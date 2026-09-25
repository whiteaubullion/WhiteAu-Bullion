import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = fs.readFileSync('.env.local', 'utf-8')
const vars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.trim().split('=')))

const supabase = createClient(
  vars.NEXT_PUBLIC_SUPABASE_URL,
  vars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testUpdate() {
  console.log("Logging in...")
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'whiteau.bullion@gmail.com',
    password: 'Whiteau@123'
  })

  if (authErr) {
    console.log("Login failed:", authErr)
    return
  }

  console.log("Fetching first rate...")
  const { data: rates } = await supabase.from('gold_rates').select('*').limit(1)
  
  if (!rates || rates.length === 0) {
    console.log("No rates found.")
    return
  }

  const rate = rates[0]
  console.log("Attempting to update rate ID:", rate.id)

  const { data, error } = await supabase.from('gold_rates').update({
    rate_per_gram: rate.rate_per_gram + 1
  }).eq('id', rate.id).select()

  console.log("Update result:", data, error)
}
testUpdate()
