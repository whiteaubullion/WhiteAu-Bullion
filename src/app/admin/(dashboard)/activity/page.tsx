import { createClient } from '@/utils/supabase/server'

export default async function ActivityPage() {
  const supabase = await createClient()
  const { data: activity } = await supabase
    .from('login_activity')
    .select('*, profiles(full_name, email)')
    .order('login_at', { ascending: true }) // Fetch ascending to calculate counts

  // Calculate iteration counts
  const userCounts: Record<string, number> = {}
  const processedActivity = activity?.map(log => {
    const userId = log.user_id
    if (!userCounts[userId]) userCounts[userId] = 0
    userCounts[userId]++
    return { ...log, iteration: userCounts[userId] }
  }).reverse() || [] // Reverse to show latest first

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Login Activity</h1>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Date & Time</th>
              <th style={thStyle}>User Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {processedActivity.slice(0, 100).map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <td style={tdStyle}>{new Date(log.login_at).toLocaleString()}</td>
                <td style={tdStyle}>
                  {log.profiles?.full_name ? `${log.profiles.full_name} (${log.iteration})` : 'Unknown'}
                </td>
                <td style={tdStyle}>{log.profiles?.email || 'Unknown'}</td>
                <td style={tdStyle}>{log.login_method}</td>
                <td style={tdStyle}>
                  <span style={{ color: log.login_status === 'success' ? '#4ade80' : '#f87171' }}>
                    {log.login_status}
                  </span>
                </td>
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
