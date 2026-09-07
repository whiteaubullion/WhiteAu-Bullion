import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch user role for RBAC
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = adminUser?.role || 'UNAUTHORIZED'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#d4af37' }}>WhiteAu CMS</h2>
          {role !== 'UNAUTHORIZED' && (
            <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.5rem', backgroundColor: '#d4af37', color: '#1f2937', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px' }}>
              {role}
            </span>
          )}
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link href="/admin" style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#d1d5db', textDecoration: 'none', transition: 'background 0.2s' }}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        
        <div style={{ padding: '1.5rem', borderTop: '1px solid #374151' }}>
          <div style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#9ca3af', wordBreak: 'break-all' }}>
            {user.email}
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
