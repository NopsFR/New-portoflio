import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getSession, logout } from '../../lib/auth';
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  LogOut,
  Eye,
  Activity,
  ChevronRight,
  Image,
} from 'lucide-react';

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const session = getSession();

  const handleLogout = () => {
    logout();
    navigate('/Oscar.admin', { replace: true });
  };

  const navItems = [
    { path: '/Oscar.admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/Oscar.admin/analytics', label: 'Analytics', icon: Activity },
    { path: '/Oscar.admin/users', label: 'Users', icon: Users },
    { path: '/Oscar.admin/media', label: 'Media', icon: Image },
    { path: '/Oscar.admin/security', label: 'Security', icon: Shield },
    { path: '/Oscar.admin/config', label: 'Config', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d14] border-r border-gray-800 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#00ff41]" />
            </div>
            <div>
              <h1 className="text-[#00ff41] font-mono text-sm font-bold tracking-wider">
                OSCAR.ADMIN
              </h1>
              <p className="text-gray-600 font-mono text-[10px]">v1.0.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all text-left ${
                isActive(item.path)
                  ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="bg-[#050508] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-wider mb-1">
              Session
            </p>
            <p className="text-gray-400 font-mono text-[11px] truncate">
              {session?.email || 'Unknown'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-900/10 border border-red-800/30 text-red-400 font-mono text-sm hover:bg-red-900/20 hover:border-red-700/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      <div className="ml-64 flex-1">
        <header className="h-16 bg-[#0d0d14] border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-gray-400 font-mono text-xs">SYSTEM ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500 font-mono text-xs">
            <span>{new Date().toLocaleDateString()}</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;