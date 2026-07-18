import { useNavigate, useLocation } from 'react-router-dom';
import { getSession, logout } from '../../lib/auth';
import { LayoutDashboard, Users, Shield, Settings, LogOut, Activity, ChevronRight, Image } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/Oscar.admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/Oscar.admin/analytics', label: 'Analytics', icon: Activity },
  { path: '/Oscar.admin/users', label: 'Users', icon: Users },
  { path: '/Oscar.admin/media', label: 'Media', icon: Image },
  { path: '/Oscar.admin/security', label: 'Security', icon: Shield },
  { path: '/Oscar.admin/config', label: 'Config', icon: Settings },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col fixed h-full" style={{ borderRight: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
        <div className="p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h1 className="text-sm font-bold tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
            OSCAR.ADMIN
          </h1>
          <p className="mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>v1.0.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors text-left font-mono"
              style={{
                backgroundColor: location.pathname === item.path ? 'var(--color-accent-dim)' : 'transparent',
                color: location.pathname === item.path ? 'var(--color-accent)' : 'var(--color-muted)',
                border: location.pathname === item.path ? '1px solid var(--color-accent-glow)' : '1px solid transparent',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Session info + logout */}
        <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <p className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
              {session?.email || 'Unknown'}
            </p>
          </div>
          <button
            onClick={() => { logout(); navigate('/Oscar.admin', { replace: true }); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-mono transition-colors"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <LogOut className="w-4 h-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-8 sticky top-0" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>SYSTEM ACTIVE</span>
          </div>
          <span className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
            {new Date().toLocaleDateString()}
          </span>
        </header>

        <main className="p-8" style={{ backgroundColor: 'var(--color-surface)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}