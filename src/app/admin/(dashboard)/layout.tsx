import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>WhiteAu Admin</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>{profile.full_name}</p>
        </div>
        
        <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavLink href="/admin" label="Dashboard Overview" />
          <NavLink href="/admin/rates" label="Gold Rate Management" />
          <NavLink href="/admin/history" label="Gold Rate History" />
          <NavLink href="/admin/users" label="Registered Users" />
          <NavLink href="/admin/activity" label="Login Activity" />
          <NavLink href="/admin/audit" label="Admin Audit Logs" />
        </nav>
        
        <div style={{ padding: '1rem', borderTop: '1px solid #334155' }}>
          <form action="/auth/signout" method="post">
            <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>

    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  // In a real app we'd use usePathname to highlight the active link
  return (
    <Link href={href} style={{ padding: '0.75rem 1rem', borderRadius: '0.375rem', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem', transition: 'background-color 0.2s', display: 'block' }}>
      {label}
    </Link>
  )
}
