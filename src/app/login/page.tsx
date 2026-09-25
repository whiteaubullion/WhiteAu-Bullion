'use client'

import { useActionState, useState, useEffect } from 'react'
import { login, signup, verifyOtp, resendOtp, resetPassword } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'SIGNUP' | 'VERIFY_OTP' | 'FORGOT_PASSWORD'>('LOGIN')
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [countdown, setCountdown] = useState(0)

  // Login Action State
  const [loginState, loginAction, isLoginPending] = useActionState(login, null)
  
  // Signup Action State
  const [signupState, signupAction, isSignupPending] = useActionState(signup, null)
  
  // Verify Action State
  const [verifyState, verifyAction, isVerifyPending] = useActionState(verifyOtp, null)
  
  // Reset Action State
  const [resetState, resetAction, isResetPending] = useActionState(resetPassword, null)

  // Handle state changes based on server responses
  useEffect(() => {
    if (signupState?.success && signupState.step === 'VERIFY_OTP') {
      setActiveTab('VERIFY_OTP')
      setRegisteredEmail(signupState.email)
      setCountdown(60) // Start 60s countdown for resend
    }
  }, [signupState])

  useEffect(() => {
    if (verifyState?.error && verifyState.step === 'VERIFY_OTP') {
      setActiveTab('VERIFY_OTP')
      if (verifyState.email) setRegisteredEmail(verifyState.email)
    }
  }, [verifyState])

  useEffect(() => {
    if (resetState?.step) {
      setActiveTab(resetState.step)
    }
  }, [resetState])

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendOtp = async () => {
    if (countdown > 0) return
    const res = await resendOtp(registeredEmail)
    if (res.success) {
      setCountdown(60)
    } else {
      alert(res.error || 'Failed to resend OTP')
    }
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: 'var(--primary-dark)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '2rem', backgroundColor: 'rgba(10, 10, 10, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
        
        {/* Header & Tabs */}
        {(activeTab === 'LOGIN' || activeTab === 'SIGNUP') && (
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <button 
              onClick={() => setActiveTab('LOGIN')}
              style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', border: 'none', color: activeTab === 'LOGIN' ? 'var(--color-gold)' : 'white', borderBottom: activeTab === 'LOGIN' ? '2px solid var(--color-gold)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('SIGNUP')}
              style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', border: 'none', color: activeTab === 'SIGNUP' ? 'var(--color-gold)' : 'white', borderBottom: activeTab === 'SIGNUP' ? '2px solid var(--color-gold)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Register
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {activeTab === 'LOGIN' && (
          <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Welcome Back</h2>
            {loginState?.error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center' }}>{loginState.error}</p>}
            {resetState?.message && <p style={{ color: '#51cf66', fontSize: '0.875rem', textAlign: 'center' }}>{resetState.message}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Email Address</label>
              <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Password</label>
              <input type="password" name="password" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setActiveTab('FORGOT_PASSWORD')} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.875rem' }}>
                Forgot Password?
              </button>
            </div>

            <button disabled={isLoginPending} type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'black', border: 'none', fontWeight: 'bold', cursor: isLoginPending ? 'not-allowed' : 'pointer', opacity: isLoginPending ? 0.7 : 1 }}>
              {isLoginPending ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {activeTab === 'SIGNUP' && (
          <form action={signupAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Create an Account</h2>
            {signupState?.error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center' }}>{signupState.error}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Full Name</label>
              <input type="text" name="fullName" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Email Address</label>
              <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Phone Number</label>
              <input type="tel" name="phone" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Password</label>
              <input type="password" name="password" required minLength={6} style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Confirm Password</label>
              <input type="password" name="confirmPassword" required minLength={6} style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <button disabled={isSignupPending} type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'black', border: 'none', fontWeight: 'bold', cursor: isSignupPending ? 'not-allowed' : 'pointer', opacity: isSignupPending ? 0.7 : 1 }}>
              {isSignupPending ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        )}

        {/* OTP VERIFICATION FORM */}
        {activeTab === 'VERIFY_OTP' && (
          <form action={verifyAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Verify Email</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.875rem' }}>We've sent a verification code to {registeredEmail}.</p>
            {verifyState?.error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center' }}>{verifyState.error}</p>}
            
            <input type="hidden" name="email" value={registeredEmail} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>OTP Code</label>
              <input type="text" name="token" required placeholder="123456" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.25rem' }} />
            </div>

            <button disabled={isVerifyPending} type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'black', border: 'none', fontWeight: 'bold', cursor: isVerifyPending ? 'not-allowed' : 'pointer', opacity: isVerifyPending ? 0.7 : 1 }}>
              {isVerifyPending ? 'Verifying...' : 'Verify & Continue'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                Didn't receive the code? <br />
                <button type="button" onClick={handleResendOtp} disabled={countdown > 0} style={{ background: 'none', border: 'none', color: countdown > 0 ? 'rgba(255,255,255,0.3)' : 'var(--color-gold)', cursor: countdown > 0 ? 'not-allowed' : 'pointer', marginTop: '0.5rem', fontWeight: 'bold' }}>
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                </button>
              </p>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activeTab === 'FORGOT_PASSWORD' && (
          <form action={resetAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Reset Password</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.875rem' }}>Enter your email and we'll send you a password reset link.</p>
            {resetState?.error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center' }}>{resetState.error}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Email Address</label>
              <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
            </div>

            <button disabled={isResetPending} type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'black', border: 'none', fontWeight: 'bold', cursor: isResetPending ? 'not-allowed' : 'pointer', opacity: isResetPending ? 0.7 : 1 }}>
              {isResetPending ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setActiveTab('LOGIN')} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.875rem' }}>
                Back to Login
              </button>
            </div>
          </form>
        )}

      </div>
    </main>
  )
}
