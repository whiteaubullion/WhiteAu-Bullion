import { createClient } from '@/utils/supabase/server'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: history } = await supabase
    .from('gold_rate_history')
    .select('*, profiles(full_name)')
    .order('updated_at', { ascending: false })

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Gold Rate History</h1>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Date & Time</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Previous Rate (10g)</th>
              <th style={thStyle}>New Rate (10g)</th>
              <th style={thStyle}>Updated By</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((entry) => (
              <tr key={entry.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <td style={tdStyle}>{new Date(entry.updated_at).toLocaleString()}</td>
                <td style={tdStyle}>{entry.gold_type}</td>
                <td style={tdStyle}>{entry.previous_rate}</td>
                <td style={tdStyle}>{entry.new_rate}</td>
                <td style={tdStyle}>{entry.profiles?.full_name || 'Admin'}</td>
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
