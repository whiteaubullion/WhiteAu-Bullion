import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch metrics in parallel
  const [
    { count: totalUsers },
    { count: activeUsers },
    { data: recentLogins },
    { count: totalRates },
    { data: latestRates },
    { data: recentRegistrations },
    { data: rateHistory }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('account_status', 'active'),
    supabase.from('login_activity').select('*, profiles(full_name)').order('login_at', { ascending: false }).limit(5),
    supabase.from('gold_rates').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('gold_rates').select('*').eq('is_active', true).order('updated_at', { ascending: false }).limit(4),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('gold_rate_history').select('*, profiles(full_name)').order('updated_at', { ascending: false }).limit(5)
  ])

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <MetricCard title="Total Users" value={totalUsers || 0} />
        <MetricCard title="Active Users" value={activeUsers || 0} />
        <MetricCard title="Active Gold Categories" value={totalRates || 0} />
        <MetricCard title="Recent Logins (24h)" value={recentLogins?.length || 0} />
      </div>

      {/* Grid Layout for tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Latest Gold Rates */}
        <DashboardSection title="Current Gold Rates">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Rate / Gram</th>
                <th style={thStyle}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {latestRates?.map(rate => (
                <tr key={rate.id} style={tdRowStyle}>
                  <td style={tdStyle}>{rate.gold_type}</td>
                  <td style={tdStyle}>{rate.currency} {rate.rate_per_gram}</td>
                  <td style={tdStyle}>{new Date(rate.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DashboardSection>

        {/* Recent Registrations */}
        <DashboardSection title="Recent Registrations">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations?.map(user => (
                <tr key={user.id} style={tdRowStyle}>
                  <td style={tdStyle}>{user.full_name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DashboardSection>

        {/* Recent Logins */}
        <DashboardSection title="Recent Login Activity">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Method</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentLogins?.map(login => (
                <tr key={login.id} style={tdRowStyle}>
                  <td style={tdStyle}>{login.profiles?.full_name || 'Unknown'}</td>
                  <td style={tdStyle}>{login.login_method}</td>
                  <td style={tdStyle}>{new Date(login.login_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DashboardSection>

        {/* Rate History */}
        <DashboardSection title="Recent Rate Updates">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Change (10g)</th>
                <th style={thStyle}>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {rateHistory?.map(history => (
                <tr key={history.id} style={tdRowStyle}>
                  <td style={tdStyle}>{history.gold_type}</td>
                  <td style={tdStyle}>
                    <span style={{ color: history.new_rate > history.previous_rate ? '#4ade80' : '#f87171' }}>
                      {history.previous_rate} → {history.new_rate}
                    </span>
                  </td>
                  <td style={tdStyle}>{history.profiles?.full_name || 'Admin'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DashboardSection>

      </div>
    </div>
  )
}

// Reusable UI Components
function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
      <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</p>
      <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}

function DashboardSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid #334155' }}>
        <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
      </div>
      <div style={{ padding: '1.25rem' }}>
        {children}
      </div>
    </div>
  )
}

const tableStyle = { width: '100%', borderCollapse: 'collapse' as const }
const thRowStyle = { borderBottom: '1px solid #334155' }
const thStyle = { padding: '0.75rem 0', textAlign: 'left' as const, color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }
const tdRowStyle = { borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }
const tdStyle = { padding: '0.75rem 0', color: '#e2e8f0', fontSize: '0.875rem' }
