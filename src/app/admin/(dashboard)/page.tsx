import { createClient } from '@/utils/supabase/server'
import { updateRate } from '../actions'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch the latest active rates for each type
  const { data: rawRates } = await supabase
    .from('gold_rates')
    .select('*')
    .eq('status', 'ACTIVE')
    .order('effective_at', { ascending: false })
    .limit(20)

  // Get the most recent rate for each type
  const latestRates: Record<string, number> = {}
  if (rawRates) {
    const itemTypes = ['24K_GOLD', '22K_GOLD', '18K_GOLD', 'SILVER']
    itemTypes.forEach(type => {
      const typeRates = rawRates.filter(r => r.item_type === type)
      if (typeRates.length > 0) {
        latestRates[type] = typeRates[0].rate_value
      } else {
        latestRates[type] = 0 // Fallback if none in DB
      }
    })
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>
        Live Rates Management
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Update the current market rates. Changes will be reflected immediately on the public website.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        
        {['24K_GOLD', '22K_GOLD', '18K_GOLD', 'SILVER'].map(itemType => (
          <div key={itemType} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', margin: 0 }}>
                {itemType.replace('_', ' ')}
              </h2>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                ₹{latestRates[itemType] || '---'}
              </span>
            </div>

            <form action={updateRate} style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="hidden" name="itemType" value={itemType} />
              <input 
                type="number" 
                name="rateValue" 
                placeholder="New rate..." 
                required
                step="0.01"
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
              <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#d4af37', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                Update
              </button>
            </form>
          </div>
        ))}

      </div>
    </div>
  )
}
