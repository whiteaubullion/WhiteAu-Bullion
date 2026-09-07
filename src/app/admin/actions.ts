'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateRate(formData: FormData) {
  const supabase = await createClient()
  
  const itemType = formData.get('itemType') as string
  const rateValue = Number(formData.get('rateValue'))

  if (!itemType || isNaN(rateValue)) {
    return { error: 'Invalid input' }
  }

  // Insert a new active rate. 
  // (In a real system you might want to mark the old one as INACTIVE first, 
  // or just rely on the order by effective_at descending)
  const { error } = await supabase
    .from('gold_rates')
    .insert({
      item_type: itemType,
      rate_value: rateValue,
      status: 'ACTIVE'
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/live-rates')
  revalidatePath('/admin')
  
  return { success: true }
}
