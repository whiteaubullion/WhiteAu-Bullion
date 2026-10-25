'use client'

import { useActionState } from 'react'
import { submitLeadAction } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, null)

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 1.5rem 2rem', backgroundColor: 'var(--primary-dark)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', marginBottom: '1rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#000000', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ 
        maxWidth: '480px', 
        width: '100%', 
        padding: '2.5rem 2rem', 
        backgroundColor: 'rgba(10, 10, 10, 0.85)', 
        border: '1px solid rgba(212, 175, 55, 0.25)', 
        borderRadius: '1rem', 
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.35rem 0.85rem', 
            borderRadius: '999px', 
            background: 'rgba(212, 175, 55, 0.1)', 
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: 'var(--color-gold)',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Instant Gold Rate Access
          </div>
          <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>
            View Today&apos;s Gold Rates
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Enter your details below to instantly view live market rates.
          </p>
        </div>

        {/* Error Notification */}
        {state?.error && (
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '0.5rem', 
            color: '#f87171', 
            fontSize: '0.875rem', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: 500 }}>
              Full Name
            </label>
            <input 
              type="text" 
              name="fullName" 
              required 
              placeholder="e.g. Rahul Sharma"
              style={{ 
                padding: '0.85rem 1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: 500 }}>
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="e.g. rahul@example.com"
              style={{ 
                padding: '0.85rem 1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: 500 }}>
              Mobile Number
            </label>
            <input 
              type="tel" 
              name="phone" 
              required 
              inputMode="numeric"
              pattern="[0-9]{10,15}"
              maxLength={15}
              placeholder="e.g. 9876543210"
              onKeyDown={(e) => {
                // Allow control keys (backspace, delete, tab, arrows, copy/paste)
                if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                    (e.ctrlKey || e.metaKey)) {
                  return
                }
                // Only allow digit keys
                if (!/^[0-9]$/.test(e.key)) {
                  e.preventDefault()
                }
              }}
              onInput={(e) => {
                // Remove non-digit characters in case of paste or autofill
                const input = e.currentTarget
                input.value = input.value.replace(/\D/g, '')
              }}
              style={{ 
                padding: '0.85rem 1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none'
              }} 
            />
          </div>

          <button 
            disabled={isPending} 
            type="submit" 
            style={{ 
              marginTop: '0.5rem',
              padding: '0.9rem', 
              borderRadius: '0.5rem', 
              backgroundColor: 'var(--color-gold)', 
              color: '#000000', 
              border: 'none', 
              fontWeight: 'bold', 
              fontSize: '1rem',
              cursor: isPending ? 'not-allowed' : 'pointer', 
              opacity: isPending ? 0.7 : 1,
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}
          >
            {isPending ? 'Checking Details...' : 'Get Live Gold Rates →'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>
            Returning users can enter the same details to view updated rates instantly.
          </p>
        </div>

      </div>
    </main>
  )
}
