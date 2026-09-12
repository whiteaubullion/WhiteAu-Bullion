import { createClient } from '@/utils/supabase/server'
import { deleteCustomer } from '../../actions'

export default async function CustomersPage() {
  const supabase = await createClient()

  // Fetch all customers ordered by latest first
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>
        Customer Leads
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        A list of all users who have verified their email addresses to view live rates.
      </p>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          Failed to load customers: {error.message}
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#374151' }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#374151' }}>Email Address</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#374151' }}>Phone Number</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#374151' }}>Date Joined</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', color: '#111827', fontWeight: '500' }}>
                    {customer.name}
                  </td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>
                    {customer.email}
                  </td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>
                    {customer.phone || 'N/A'}
                  </td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>
                    {new Date(customer.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <form action={deleteCustomer}>
                      <input type="hidden" name="id" value={customer.id} />
                      <button 
                        type="submit" 
                        style={{ padding: '0.35rem 0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
