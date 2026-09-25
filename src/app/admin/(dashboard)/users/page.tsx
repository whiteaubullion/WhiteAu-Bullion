import { createClient } from '@/utils/supabase/server'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Registered Users</h1>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <td style={tdStyle}>{u.full_name}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.phone_number || '-'}</td>
                <td style={tdStyle}>{u.role}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem',
                    backgroundColor: u.account_status === 'active' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                    color: u.account_status === 'active' ? '#4ade80' : '#f87171'
                  }}>
                    {u.account_status}
                  </span>
                </td>
                <td style={tdStyle}>{new Date(u.created_at).toLocaleDateString()}</td>
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
