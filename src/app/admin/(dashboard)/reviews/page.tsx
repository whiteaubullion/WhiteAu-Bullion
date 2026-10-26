import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getStoredReviews } from '@/app/api/reviews/route'
import { DeleteReviewButton } from './DeleteReviewButton'

export const dynamic = 'force-dynamic'

interface ReviewItem {
  id: string
  name: string
  role?: string
  rating: number
  title?: string
  text: string
  date?: string
  created_at?: string
}

const thStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  color: '#94a3b8',
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}

const tdStyle: React.CSSProperties = {
  padding: '1rem',
  color: '#f8fafc',
  fontSize: '0.9rem',
  verticalAlign: 'middle'
}

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  // Fetch reviews from Supabase or fallback to backend reviews.json
  let reviews: ReviewItem[] = []
  try {
    const { data: dbReviews, error } = await supabase
      .from('customer_reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && dbReviews && dbReviews.length > 0) {
      reviews = dbReviews
    } else {
      reviews = getStoredReviews()
    }
  } catch {
    reviews = getStoredReviews()
  }

  const totalReviews = reviews.length
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0'
  const fiveStarCount = reviews.filter(r => (Number(r.rating) || 5) >= 5).length

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold' }}>Customer Reviews Management</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Manage customer testimonials displayed on the homepage. Reviews deleted here are instantly removed from the public website.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Customer Reviews</p>
          <p style={{ color: '#38bdf8', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{totalReviews}</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Average Rating</p>
          <p style={{ color: '#eab308', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
            {avgRating} <span style={{ fontSize: '1.2rem', color: '#eab308' }}>★</span>
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>5-Star Reviews</p>
          <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fiveStarCount}</p>
        </div>
      </div>

      {/* Reviews Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
            Published Customer Reviews ({totalReviews})
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Only administrators can delete reviews
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Rating</th>
                <th style={{ ...thStyle, width: '45%' }}>Review Content</th>
                <th style={thStyle}>Date</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    No customer reviews published yet.
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => {
                  const stars = Number(rev.rating) || 5
                  return (
                    <tr key={rev.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: 'white' }}>{rev.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rev.role || 'Verified Customer'}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'inline-flex', gap: '2px', color: '#eab308', fontSize: '1rem' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} style={{ color: i < stars ? '#eab308' : '#475569' }}>★</span>
                          ))}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        {rev.title && (
                          <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>
                            {rev.title}
                          </div>
                        )}
                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>
                          "{rev.text}"
                        </p>
                      </td>
                      <td style={{ ...tdStyle, color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {rev.date || (rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Recent')}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <DeleteReviewButton id={rev.id} reviewName={rev.name} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
