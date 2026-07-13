import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../../lib/auth';
import { Lock, Eye, EyeOff, Shield, User } from 'lucide-react';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/Oscar.admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for security feel
    await new Promise(resolve => setTimeout(resolve, 800));

    if (authenticate(email, password)) {
      navigate('/Oscar.admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 mb-4">
            <Shield className="w-8 h-8 text-[#00ff41]" />
          </div>
          <h1 className="text-3xl font-mono font-bold text-[#00ff41] tracking-wider">
            ADMIN PANEL
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-2">
            Restricted Access — Authorized Personnel Only
          </p>
          <div className="mt-4 text-xs text-gray-600 font-mono">
            <span className="text-[#00ff41]/50">[</span>
            <span className="text-[#00ff41]/70"> SYSTEM LOCKED </span>
            <span className="text-[#00ff41]/50">]</span>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0d0d14] border border-gray-800 rounded-lg p-8 space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-gray-400 font-mono text-xs mb-2 uppercase tracking-wider">
              <User className="w-3 h-3 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              placeholder="admin@domain.com"
              className="w-full bg-[#050508] border border-gray-700 rounded px-4 py-3 text-gray-200 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 font-mono text-xs mb-2 uppercase tracking-wider">
              <Lock className="w-3 h-3 inline mr-1" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                placeholder="••••••••••••"
                className="w-full bg-[#050508] border border-gray-700 rounded px-4 py-3 text-gray-200 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ff41] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 rounded px-4 py-3 text-red-400 font-mono text-xs flex items-center gap-2">
              <span className="text-red-500">[!]</span>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono font-bold py-3 rounded hover:bg-[#00ff41]/20 hover:border-[#00ff41]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-pulse">Authenticating</span>
                <span className="inline-block w-2 h-2 bg-[#00ff41] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="inline-block w-2 h-2 bg-[#00ff41] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="inline-block w-2 h-2 bg-[#00ff41] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Authenticate
              </>
            )}
          </button>

          {/* Footer */}
          <div className="text-center text-gray-600 font-mono text-[10px] space-y-1">
            <p>UNAUTHORIZED ACCESS IS PROHIBITED</p>
            <p className="text-[#00ff41]/30">SESSION WILL BE LOGGED AND TRACKED</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;