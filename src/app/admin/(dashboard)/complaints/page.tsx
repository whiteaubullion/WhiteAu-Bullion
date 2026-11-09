import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getStoredComplaints } from '@/app/api/complaints/route'
import { ComplaintRowActions } from './ComplaintRowActions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ComplaintItem {
  id: string
  name: string
  phone?: string
  email?: string
  category: string
  branch?: string
  message: string
  status: string
  created_at: string
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
  verticalAlign: 'top'
}

export default async function AdminComplaintsPage() {
  const supabase = await createClient()

  // 1. Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  // 2. Fetch complaints from Supabase or fallback to local backend json
  let complaints: ComplaintItem[] = []
  let isSupabaseConfigured = false
  try {
    const { data: dbComplaints, error } = await supabase
      .from('customer_complaints')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && Array.isArray(dbComplaints)) {
      isSupabaseConfigured = true
      complaints = dbComplaints
    } else {
      complaints = getStoredComplaints()
    }
  } catch {
    complaints = getStoredComplaints()
  }

  // Filter out any complaints marked as deleted in cookies
  try {
    const cookieStore = await cookies()
    const deletedCookie = cookieStore.get('whiteau_deleted_complaints')?.value
    if (deletedCookie) {
      const deletedIds = JSON.parse(deletedCookie)
      if (Array.isArray(deletedIds) && deletedIds.length > 0) {
        complaints = complaints.filter(c => !deletedIds.includes(String(c.id)))
      }
    }
  } catch {}

  const total = complaints.length
  const pending = complaints.filter(c => c.status === 'pending').length
  const investigating = complaints.filter(c => c.status === 'investigating').length
  const resolved = complaints.filter(c => c.status === 'resolved').length

  const getCategoryColor = (cat: string) => {
    switch ((cat || '').toLowerCase()) {
      case 'valuation':
      case 'valuation dispute':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' }
      case 'payment':
      case 'payment issue':
        return { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308', border: 'rgba(234, 179, 8, 0.3)' }
      case 'staff':
      case 'staff behavior':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' }
      default:
        return { bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.3)' }
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold' }}>Customer Complaints &amp; Resolution</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Official complaints submitted through the "File a Complaint" portal. Track grievance investigations and resolve customer concerns.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div style={{
          backgroundColor: 'rgba(234, 162, 33, 0.12)',
          border: '1px solid rgba(234, 162, 33, 0.4)',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          color: '#fef08a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem', color: '#fde047' }}>
            <span>⚡ Action Required: Connect Supabase Database for Real-Time Sync</span>
          </div>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            The <code>customer_complaints</code> table has not been created in your Supabase project yet. Because serverless hosting runs on isolated instances, you must run the 1-click SQL setup script in your Supabase Dashboard so complaints save and sync across all visitors and devices in real time.
          </p>
          <a 
            href="https://supabase.com/dashboard/project/kjjkxevcdlpldqvbmwks/sql/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#eab308',
              color: '#0f172a',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            🚀 Open Supabase SQL Editor (1-Click Setup) →
          </a>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Complaints</p>
          <p style={{ color: '#f8fafc', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{total}</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Pending Review</p>
          <p style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{pending}</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
          <p style={{ color: '#7dd3fc', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Under Investigation</p>
          <p style={{ color: '#38bdf8', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{investigating}</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <p style={{ color: '#86efac', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Resolved</p>
          <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{resolved}</p>
        </div>
      </div>

      {/* Complaints Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
            Official Grievance Log ({total})
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Only administrators can modify or delete complaints
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={thStyle}>Complainant</th>
                <th style={thStyle}>Contact</th>
                <th style={thStyle}>Type &amp; Branch</th>
                <th style={{ ...thStyle, width: '40%' }}>Concern Details</th>
                <th style={thStyle}>Date Filed</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Status &amp; Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    No customer complaints filed yet.
                  </td>
                </tr>
              ) : (
                complaints.map((c) => {
                  const catStyle = getCategoryColor(c.category)
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>ID: {c.id}</div>
                      </td>

                      <td style={tdStyle}>
                        {c.phone ? (
                          <div>
                            <a 
                              href={`tel:${c.phone}`}
                              style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                            >
                              📞 {c.phone}
                            </a>
                          </div>
                        ) : null}
                        {c.email ? (
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                            ✉️ {c.email}
                          </div>
                        ) : null}
                      </td>

                      <td style={tdStyle}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '1rem',
                          backgroundColor: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}>
                          {c.category}
                        </span>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                          📍 {c.branch || 'General'}
                        </div>
                      </td>

                      <td style={tdStyle}>
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.5' }}>
                          "{c.message}"
                        </p>
                      </td>

                      <td style={{ ...tdStyle, color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {c.created_at ? new Date(c.created_at).toLocaleString() : 'Recent'}
                      </td>

                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <ComplaintRowActions id={c.id} name={c.name} currentStatus={c.status} />
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
