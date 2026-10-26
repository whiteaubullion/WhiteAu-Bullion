'use server'

import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'
import { createClient } from '@/utils/supabase/server'

const REVIEWS_FILE = path.join(process.cwd(), 'src', 'data', 'reviews.json')

export async function deleteReviewAction(id: string) {
  try {
    const supabase = await createClient()

    // 1. Verify admin access
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
      return { error: 'Unauthorized: Only administrators can delete reviews.' }
    }

    // 2. Delete from Supabase if table exists
    try {
      await supabase.from('customer_reviews').delete().eq('id', id)
    } catch {
      // Table might not exist yet
    }

    // 3. Delete from local JSON backend storage
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8')
      const current = JSON.parse(data)
      const filtered = current.filter((r: any) => String(r.id) !== String(id))
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
    }

    // 4. Log to admin audit logs if table exists
    try {
      await supabase.from('admin_audit_logs').insert({
        admin_id: user.id,
        action: 'DELETE_CUSTOMER_REVIEW',
        entity: 'reviews',
        details: { review_id: id, deleted_by: profile.full_name }
      })
    } catch {
      // Audit log optional
    }

    revalidatePath('/')
    revalidatePath('/admin/reviews')
    return { success: true }
  } catch (err: any) {
    console.error('Failed to delete review:', err)
    return { error: err.message || 'Failed to delete review' }
  }
}
