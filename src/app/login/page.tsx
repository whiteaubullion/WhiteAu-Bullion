'use client'

import React, { useActionState, useState } from 'react'
import { initialAuthSubmit, verifyOtp, saveName, setPassword, loginWithPassword, resendOtp } from './actions'
import styles from './page.module.css'
import Logo from '@/components/layout/Logo'

type Step = 'EMAIL_PHONE' | 'VERIFY_OTP' | 'SIGNUP_NAME' | 'SET_PASSWORD' | 'PASSWORD'

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<Step>('EMAIL_PHONE')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [name, setName] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  // Action states
  const [initialState, initialAction, isSubmittingInitial] = useActionState(async (prev: any, formData: FormData) => {
    // Combine country code and phone before submitting
    const fullPhone = `${countryCode} ${formData.get('phone')}`
    formData.set('phone', fullPhone)
    
    const res = await initialAuthSubmit(prev, formData)
    if (res.step) setCurrentStep(res.step as Step)
    return res
  }, { error: null, email: '', phone: '', exists: false })

  const [verifyState, verifyAction, isVerifying] = useActionState(async (prev: any, formData: FormData) => {
    const res = await verifyOtp(prev, formData)
    if (res.step) setCurrentStep(res.step as Step)
    return res
  }, { error: null })

  const [nameState, nameAction, isSavingName] = useActionState(async (prev: any, formData: FormData) => {
    const res = await saveName(prev, formData)
    if (res.step) setCurrentStep(res.step as Step)
    return res
  }, { error: null })

  const [passwordState, passwordAction, isSettingPassword] = useActionState(setPassword, { error: null })
  const [loginState, loginAction, isLoggingIn] = useActionState(loginWithPassword, { error: null })

  const handleResend = async () => {
    setIsResending(true)
    setResendMessage('')
    const res = await resendOtp(email)
    if (res.error) setResendMessage(res.error)
    else setResendMessage('OTP resent successfully!')
    setIsResending(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        
        {currentStep === 'EMAIL_PHONE' && (
          <>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Enter your email address and phone number to get started.</p>
            <form action={initialAction} className={styles.form}>
              {initialState.error && <div className={styles.error}>{initialState.error}</div>}
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email" name="email" type="email" required className={styles.input}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className={styles.input}
                    style={{ width: '80px', padding: '0.75rem 0.5rem' }}
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input 
                    id="phone" name="phone" type="tel" required className={styles.input} style={{ flex: 1 }}
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmittingInitial} className={styles.submitBtn}>
                {isSubmittingInitial ? 'Continuing...' : 'Continue'}
              </button>
            </form>
          </>
        )}

        {currentStep === 'VERIFY_OTP' && (
          <>
            <h1 className={styles.title}>Verify Email</h1>
            <p className={styles.subtitle}>We've sent a code to {email}</p>
            <form action={verifyAction} className={styles.form}>
              {verifyState.error && <div className={styles.error}>{verifyState.error}</div>}
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />
              <div className={styles.inputGroup}>
                <label htmlFor="token">OTP Code</label>
                <input 
                  id="token" name="token" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={8} required 
                  className={styles.input} style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' }}
                />
              </div>
              <button type="submit" disabled={isVerifying} className={styles.submitBtn}>
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </form>
            
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button 
                type="button" 
                onClick={handleResend} 
                disabled={isResending}
                style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
              {resendMessage && <p style={{ fontSize: '0.75rem', color: resendMessage.includes('error') ? '#ef4444' : '#10b981', marginTop: '0.5rem' }}>{resendMessage}</p>}
            </div>
          </>
        )}

        {currentStep === 'SIGNUP_NAME' && (
          <>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Email verified! Please enter your name to continue.</p>
            <form action={nameAction} className={styles.form}>
              {nameState.error && <div className={styles.error}>{nameState.error}</div>}
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  id="name" name="name" type="text" required className={styles.input}
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isSavingName} className={styles.submitBtn}>
                {isSavingName ? 'Saving...' : 'Continue'}
              </button>
            </form>
          </>
        )}

        {currentStep === 'SET_PASSWORD' && (
          <>
            <h1 className={styles.title}>Set Password</h1>
            <p className={styles.subtitle}>Create a password for your new account.</p>
            <form action={passwordAction} className={styles.form}>
              {passwordState.error && <div className={styles.error}>{passwordState.error}</div>}
              <div className={styles.inputGroup}>
                <label htmlFor="password">New Password</label>
                <input id="password" name="password" type="password" required minLength={6} className={styles.input} />
              </div>
              <button type="submit" disabled={isSettingPassword} className={styles.submitBtn}>
                {isSettingPassword ? 'Saving...' : 'Save & Login'}
              </button>
            </form>
          </>
        )}

        {currentStep === 'PASSWORD' && (
          <>
            <h1 className={styles.title}>Enter Password</h1>
            <p className={styles.subtitle}>Welcome back, {email}</p>
            <form action={loginAction} className={styles.form}>
              {loginState.error && <div className={styles.error}>{loginState.error}</div>}
              <input type="hidden" name="email" value={email} />
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required className={styles.input} />
              </div>
              <button type="submit" disabled={isLoggingIn} className={styles.submitBtn}>
                {isLoggingIn ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
