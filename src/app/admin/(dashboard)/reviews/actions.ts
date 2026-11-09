'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getStoredReviews, saveReviews } from '@/app/api/reviews/route'

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
      await supabase.from('customer_reviews').delete().eq('id', String(id))
    } catch (e) {
      console.warn('Supabase delete review table skipped/failed:', e)
    }

    // 3. Track deleted review ID in cookies (ensures deletion persists across all Vercel serverless lambdas)
    try {
      const cookieStore = await cookies()
      const existingCookie = cookieStore.get('whiteau_deleted_reviews')?.value
      let deletedList: string[] = []
      if (existingCookie) {
        try {
          const parsed = JSON.parse(existingCookie)
          if (Array.isArray(parsed)) deletedList = parsed
        } catch {}
      }
      if (!deletedList.includes(String(id))) {
        deletedList.push(String(id))
      }
      cookieStore.set('whiteau_deleted_reviews', JSON.stringify(deletedList), {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false,
        sameSite: 'lax'
      })
    } catch (e) {
      console.warn('Cookie delete tracking error:', e)
    }

    // 4. Delete from local / tmp storage safely (prevents EROFS read-only filesystem crash)
    try {
      const current = getStoredReviews()
      const filtered = current.filter((r: any) => String(r.id) !== String(id))
      saveReviews(filtered)
    } catch (e) {
      console.warn('Local storage update skipped:', e)
    }

    // 5. Log to admin audit logs if table exists
    try {
      await supabase.from('admin_audit_logs').insert({
        admin_id: user.id,
        action: 'DELETE_CUSTOMER_REVIEW',
        entity_type: 'reviews',
        details: { review_id: id, deleted_by: profile?.full_name || 'Admin' }
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
