'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { getStoredComplaints, saveComplaints } from '@/app/api/complaints/route'

export async function deleteComplaintAction(id: string) {
  try {
    const supabase = await createClient()

    // 1. Verify admin role
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { error: 'Unauthorized: Only administrators can delete complaints.' }
    }

    // 2. Delete from Supabase if table exists
    try {
      await supabase.from('customer_complaints').delete().eq('id', id)
    } catch {}

    // 3. Delete from local / tmp storage safely
    try {
      const current = getStoredComplaints()
      const filtered = current.filter((c: any) => String(c.id) !== String(id))
      saveComplaints(filtered)
    } catch (e) {
      console.warn('Local complaints storage update failed:', e)
    }

    // 4. Audit log
    try {
      await supabase.from('admin_audit_logs').insert({
        admin_id: user.id,
        action: 'DELETE_CUSTOMER_COMPLAINT',
        entity_type: 'complaints',
        details: { complaint_id: id, deleted_by: profile.full_name }
      })
    } catch {}

    revalidatePath('/admin/complaints')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    console.error('Failed to delete complaint:', err)
    return { error: err.message || 'Failed to delete complaint' }
  }
}

export async function updateComplaintStatusAction(id: string, newStatus: string) {
  try {
    const supabase = await createClient()

    // 1. Verify admin role
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { error: 'Unauthorized: Only administrators can update complaints.' }
    }

    // 2. Update in Supabase if exists
    try {
      await supabase.from('customer_complaints').update({ status: newStatus }).eq('id', id)
    } catch {}

    // 3. Update in local / tmp storage safely
    try {
      const current = getStoredComplaints()
      const updated = current.map((c: any) => {
        if (String(c.id) === String(id)) {
          return { ...c, status: newStatus }
        }
        return c
      })
      saveComplaints(updated)
    } catch (e) {
      console.warn('Local complaints status update failed:', e)
    }

    revalidatePath('/admin/complaints')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    console.error('Failed to update complaint status:', err)
    return { error: err.message || 'Failed to update complaint status' }
  }
}
