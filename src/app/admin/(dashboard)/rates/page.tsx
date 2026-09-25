import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

async function updateRate(formData: FormData) {
  'use server'
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const rate_per_gram = Number(formData.get('rate_per_gram'))
  const rate_per_10_grams = rate_per_gram * 10
  const rate_per_sovereign = rate_per_gram * 8

  const { data: { user } } = await supabase.auth.getUser()

  if (id && user) {
    const { error: updateError } = await supabase.from('gold_rates').update({
      rate_per_gram,
      rate_per_10_grams,
      rate_per_sovereign,
      updated_by: user.id
    }).eq('id', id)
    
    if (updateError) {
      console.error("Failed to update gold rate:", updateError)
    } else {
      // Log the action
      await supabase.from('admin_audit_logs').insert({
        admin_id: user.id,
        action: 'UPDATE_RATE',
        entity_type: 'gold_rates',
        entity_id: id,
        details: { new_rate: rate_per_gram }
      })
    }
  }

  revalidatePath('/admin/rates')
  revalidatePath('/live-rates')
}

export default async function RatesPage() {
  const supabase = await createClient()
  const { data: rates } = await supabase.from('gold_rates').select('*').order('gold_type')

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Gold Rate Management</h1>
      
      <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #334155', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={thStyle}>Gold Type</th>
              <th style={thStyle}>Purity</th>
              <th style={thStyle}>Current Rate / Gram</th>
              <th style={thStyle}>Update</th>
            </tr>
          </thead>
          <tbody>
            {rates?.map((rate) => (
              <tr key={rate.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <td style={tdStyle}>{rate.gold_type}</td>
                <td style={tdStyle}>{rate.purity}</td>
                <td style={tdStyle}>
                  <form action={updateRate} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input type="hidden" name="id" value={rate.id} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#94a3b8' }}>{rate.currency}</span>
                      <input 
                        type="number" 
                        name="rate_per_gram" 
                        defaultValue={rate.rate_per_gram}
                        step="0.01"
                        style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', width: '120px' }} 
                      />
                    </div>
                    <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#eab308', color: '#1e293b', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                      Update
                    </button>
                  </form>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Last updated: {new Date(rate.updated_at).toLocaleString()}
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
