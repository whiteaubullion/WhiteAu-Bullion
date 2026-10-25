'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteActivityLogAction(id: string, type: 'customer' | 'admin') {
  try {
    const supabase = await createClient()

    if (type === 'customer') {
      await supabase.from('customer_rate_access').delete().eq('id', id)
    } else {
      await supabase.from('login_activity').delete().eq('id', id)
    }

    revalidatePath('/admin/activity')
    revalidatePath('/admin/customer-access')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to delete record' }
  }
}

export async function deleteCustomerLeadAction(id: string) {
  try {
    const supabase = await createClient()

    // Delete associated rate access logs first if any, then delete lead
    await supabase.from('customer_rate_access').delete().eq('lead_id', id)
    await supabase.from('customer_leads').delete().eq('id', id)

    revalidatePath('/admin/customer-access')
    revalidatePath('/admin/activity')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to delete lead' }
  }
}
