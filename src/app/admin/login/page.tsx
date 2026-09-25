'use client'

import { useActionState } from 'react'
import { adminLogin } from './actions'

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(adminLogin, null)

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2.5rem', backgroundColor: '#1e293b', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid #334155' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>WhiteAu Admin</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Secure Portal Access</p>
        </div>

        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {state?.error && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>
              {state.error}
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>Admin Email</label>
            <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input type="password" name="password" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', outline: 'none' }} />
          </div>

          <button disabled={isPending} type="submit" style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#eab308', color: '#1e293b', border: 'none', fontWeight: 'bold', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1, transition: 'background-color 0.2s' }}>
            {isPending ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

      </div>
    </main>
  )
}
