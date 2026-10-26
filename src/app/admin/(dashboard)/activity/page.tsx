import { createClient } from '@/utils/supabase/server'
import DeleteActivityButton from './DeleteActivityButton'

export const dynamic = 'force-dynamic'

export default async function ActivityPage() {
  const supabase = await createClient()

  // 1. Fetch Customer Logins (Name, Email, Mobile, Visit #)
  const { data: customerAccess } = await supabase
    .from('customer_rate_access')
    .select('*')
    .order('accessed_at', { ascending: false })
    .limit(100)

  // 2. Fetch Any Standard/Admin Login Activity
  const { data: adminActivity } = await supabase
    .from('login_activity')
    .select('*, profiles(full_name, email, phone_number)')
    .order('login_at', { ascending: false })
    .limit(50)

  // Normalize both into a single combined activity feed
  type UnifiedLog = {
    id: string
    date: string
    userName: string
    email: string
    phone: string
    method: string
    status: string
    type: 'customer' | 'admin'
    iteration?: number
  }

  const logs: UnifiedLog[] = []

  customerAccess?.forEach((c) => {
    logs.push({
      id: c.id,
      date: c.accessed_at,
      userName: c.full_name,
      email: c.email,
      phone: c.phone_number || '-',
      method: 'Customer Rate Access',
      status: 'success',
      type: 'customer',
      iteration: c.visit_number
    })
  })

  adminActivity?.forEach((a) => {
    logs.push({
      id: a.id,
      date: a.login_at,
      userName: a.profiles?.full_name || 'Admin',
      email: a.profiles?.email || '-',
      phone: a.profiles?.phone_number || '-',
      method: a.login_method || 'admin_login',
      status: a.login_status || 'success',
      type: 'admin'
    })
  })

  // Sort descending by date
  logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold' }}>Login Activity</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Real-time record of all user and customer logins, including returning visit counts.
        </p>
      </div>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Date &amp; Time</th>
              <th style={thStyle}>User Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Mobile Number</th>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                  No login activity recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                  <td style={tdStyle}>{new Date(log.date).toLocaleString()}</td>
                  <td style={{ ...tdStyle, fontWeight: '600' }}>
                    {log.userName}
                    {log.iteration !== undefined && (
                      <span style={{ 
                        marginLeft: '0.5rem', 
                        fontSize: '0.75rem', 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '999px',
                        backgroundColor: log.iteration > 1 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                        color: log.iteration > 1 ? '#eab308' : '#38bdf8',
                        fontWeight: 'bold'
                      }}>
                        Visit #{log.iteration}
                      </span>
                    )}
                  </td>
                  <td style={tdStyle}>{log.email}</td>
                  <td style={tdStyle}>{log.phone}</td>
                  <td style={tdStyle}>
                    <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{log.method}</span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      backgroundColor: log.status === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                      color: log.status === 'success' ? '#4ade80' : '#f87171' 
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <DeleteActivityButton id={log.id} type={log.type} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle = { padding: '1rem 0.75rem', color: '#94a3b8', fontSize: '0.875rem' }
const tdStyle = { padding: '1rem 0.75rem', color: 'white', fontSize: '0.9rem' }
