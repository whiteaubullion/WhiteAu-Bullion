import { createClient } from '@/utils/supabase/server'

export default async function AuditPage() {
  const supabase = await createClient()
  const { data: logs } = await supabase
    .from('admin_audit_logs')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Admin Audit Logs</h1>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>Admin Name</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Entity</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <td style={tdStyle}>{new Date(log.created_at).toLocaleString()}</td>
                <td style={tdStyle}>{log.profiles?.full_name || 'Unknown Admin'}</td>
                <td style={tdStyle}>
                  <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {log.action}
                  </span>
                </td>
                <td style={tdStyle}>{log.entity_type}</td>
                <td style={tdStyle}><pre style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{JSON.stringify(log.details)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle = { padding: '1rem 0.5rem', color: '#94a3b8', fontSize: '0.875rem' }
const tdStyle = { padding: '1rem 0.5rem', color: 'white' }
