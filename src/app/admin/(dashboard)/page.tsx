import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch metrics in parallel
  const [
    { count: totalUsers },
    { count: totalCustomerLeads },
    { data: recentLogins },
    { data: recentCustomerAccess },
    { count: totalRates },
    { data: latestRates },
    { data: rateHistory }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('customer_leads').select('*', { count: 'exact', head: true }),
    supabase.from('login_activity').select('*, profiles(full_name)').order('login_at', { ascending: false }).limit(5),
    supabase.from('customer_rate_access').select('*').order('accessed_at', { ascending: false }).limit(5),
    supabase.from('gold_rates').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('gold_rates').select('*').eq('is_active', true).order('updated_at', { ascending: false }).limit(4),
    supabase.from('gold_rate_history').select('*, profiles(full_name)').order('updated_at', { ascending: false }).limit(5)
  ])

  // Combine recent logins
  const combinedLogins = [
    ...(recentCustomerAccess?.map(c => ({
      id: c.id,
      name: c.full_name,
      method: `Customer (Visit #${c.visit_number})`,
      time: c.accessed_at
    })) || []),
    ...(recentLogins?.map(l => ({
      id: l.id,
      name: l.profiles?.full_name || 'Admin',
      method: l.login_method,
      time: l.login_at
    })) || [])
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <MetricCard title="Total Customers" value={totalCustomerLeads || 0} />
        <MetricCard title="System Users" value={totalUsers || 0} />
        <MetricCard title="Active Gold Categories" value={totalRates || 0} />
        <MetricCard title="Recent Access Events" value={combinedLogins.length} />
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

        {/* Recent Logins */}
        <DashboardSection title="Recent Login Activity">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>User / Customer</th>
                <th style={thStyle}>Method / Visit</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {combinedLogins.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}>
                    No recent logins.
                  </td>
                </tr>
              ) : (
                combinedLogins.map(login => (
                  <tr key={login.id} style={tdRowStyle}>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{login.name}</td>
                    <td style={tdStyle}>
                      <span style={{ color: '#38bdf8' }}>{login.method}</span>
                    </td>
                    <td style={tdStyle}>{new Date(login.time).toLocaleString()}</td>
                  </tr>
                ))
              )}
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
