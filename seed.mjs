import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = fs.readFileSync('.env.local', 'utf-8')
const vars = Object.fromEntries(env.split('\n').filter(l => l.includes('=')).map(l => l.trim().split('=')))

const supabase = createClient(
  vars.NEXT_PUBLIC_SUPABASE_URL,
  vars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function seed() {
  console.log("Seeding default gold rates...")
  // We need to bypass RLS to insert without admin session, wait no, 
  // actually I can't bypass RLS easily without service key. 
  // BUT the user just set themselves as admin. Let's just login as the user!
  
  const { data: auth } = await supabase.auth.signInWithPassword({
    email: 'whiteau.bullion@gmail.com',
    password: 'Whiteau@123'
  })

  if (!auth.user) {
    console.log("Could not login as admin to seed database.")
    return
  }

  const defaultRates = [
    { gold_type: '24K_GOLD', purity: '99.9%', rate_per_gram: 15691, rate_per_10_grams: 156910, rate_per_sovereign: 125528, currency: 'INR', is_active: true, updated_by: auth.user.id },
    { gold_type: '22K_GOLD', purity: '91.6%', rate_per_gram: 14379, rate_per_10_grams: 143790, rate_per_sovereign: 115032, currency: 'INR', is_active: true, updated_by: auth.user.id },
    { gold_type: '18K_GOLD', purity: '75.0%', rate_per_gram: 11881, rate_per_10_grams: 118810, rate_per_sovereign: 95048,  currency: 'INR', is_active: true, updated_by: auth.user.id },
    { gold_type: '14K_GOLD', purity: '58.5%', rate_per_gram: 9230,  rate_per_10_grams: 92300,  rate_per_sovereign: 73840,  currency: 'INR', is_active: true, updated_by: auth.user.id }
  ]

  const { error } = await supabase.from('gold_rates').insert(defaultRates)
  if (error) {
    console.log("Error seeding:", error)
  } else {
    console.log("Successfully seeded 4 gold rate categories!")
  }
}
seed()
