import { createClient } from '@/utils/supabase/server'
import { DeleteLeadButton, DeleteAccessLogButton } from './DeleteButtons'

export const dynamic = 'force-dynamic'

export default async function CustomerRateAccessPage() {
  const supabase = await createClient()

  // Fetch unique leads with their aggregated visit counts
  const { data: leads } = await supabase
    .from('customer_leads')
    .select('*')
    .order('last_login_at', { ascending: false })

  // Fetch detailed access history logs
  const { data: accessLogs } = await supabase
    .from('customer_rate_access')
    .select('*')
    .order('accessed_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold' }}>Customer Rate Access</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Customer details submitted to view live rates. Returning users show total login/visit count with their original details.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Unique Customers</p>
          <p style={{ color: '#38bdf8', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{leads?.length || 0}</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Rate Views / Logins</p>
          <p style={{ color: '#eab308', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
            {leads?.reduce((sum, lead) => sum + (lead.visit_count || 1), 0) || 0}
          </p>
        </div>
      </div>

      {/* Main Customers Table with Visit Count */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          Customer Details &amp; Visit Counts
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile Number</th>
                <th style={thStyle}>Times Logged In</th>
                <th style={thStyle}>First Visit</th>
                <th style={thStyle}>Last Login</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(!leads || leads.length === 0) ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                    No customer logins recorded yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    <td style={{ ...tdStyle, fontWeight: '600' }}>{lead.full_name}</td>
                    <td style={tdStyle}>{lead.email}</td>
                    <td style={tdStyle}>{lead.phone_number}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.75rem', 
                        borderRadius: '999px', 
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        backgroundColor: lead.visit_count > 1 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                        color: lead.visit_count > 1 ? '#eab308' : '#38bdf8',
                        border: lead.visit_count > 1 ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid rgba(56, 189, 248, 0.3)'
                      }}>
                        {lead.visit_count} {lead.visit_count === 1 ? 'visit' : 'times'}
                      </span>
                    </td>
                    <td style={tdStyle}>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td style={tdStyle}>{new Date(lead.last_login_at || lead.created_at).toLocaleString()}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <DeleteLeadButton id={lead.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Access History Log Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          Recent Rate Access Log
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={thStyle}>Date &amp; Time</th>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile Number</th>
                <th style={thStyle}>Visit #</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(!accessLogs || accessLogs.length === 0) ? (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                    No access events recorded yet.
                  </td>
                </tr>
              ) : (
                accessLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    <td style={tdStyle}>{new Date(log.accessed_at).toLocaleString()}</td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{log.full_name}</td>
                    <td style={tdStyle}>{log.email}</td>
                    <td style={tdStyle}>{log.phone_number}</td>
                    <td style={tdStyle}>
                      <span style={{ color: '#cbd5e1', fontWeight: 'bold' }}>
                        Visit #{log.visit_number}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <DeleteAccessLogButton id={log.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

const thStyle = { padding: '1rem 0.75rem', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }
const tdStyle = { padding: '1rem 0.75rem', color: 'white', fontSize: '0.9rem' }
