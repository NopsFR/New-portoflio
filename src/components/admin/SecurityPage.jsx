import React, { useState, useEffect } from 'react';
import { getSession, refreshSession } from '../../lib/auth';
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  FileWarning,
  Wifi,
  WifiOff,
  Trash2,
} from 'lucide-react';

function SecurityPage() {
  const session = getSession();

  // Security Settings
  const [settings, setSettings] = useState({
    rateLimiting: true,
    ipLogging: true,
    ddosProtection: true,
    sqlInjectionProtection: true,
    xssProtection: true,
    corsEnabled: true,
    frameAncestors: 'none',
    referrerPolicy: 'strict-origin-when-cross-origin',
    contentSecurityPolicy: true,
    sessionTimeout: 24,
  });

  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('oscar_security_settings') || 'null');
    if (saved) {
      setSettings(saved);
    }
  }

  function saveSettings() {
    localStorage.setItem('oscar_security_settings', JSON.stringify(settings));
    setSaveMessage('Settings saved successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  }

  function toggleSetting(key) {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function updateSetting(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function handleSessionRefresh() {
    refreshSession();
    setSaveMessage('Session refreshed successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  }

  function clearAllData() {
    if (window.confirm('WARNING: This will clear ALL stored data including analytics, settings, and caches. Are you sure?')) {
      const authData = localStorage.getItem('oscar_admin_auth');
      const visitorId = localStorage.getItem('oscar_visitor_id');
      localStorage.clear();
      if (authData) localStorage.setItem('oscar_admin_auth', authData);
      if (visitorId) localStorage.setItem('oscar_visitor_id', visitorId);
      loadSettings();
      setSaveMessage('All data cleared. Auth preserved.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  }

  const securityFeatures = [
    { key: 'rateLimiting', label: 'Rate Limiting', desc: 'Limit requests per IP to prevent abuse', icon: Wifi },
    { key: 'ipLogging', label: 'IP Logging', desc: 'Log visitor IPs for security audit trails', icon: Terminal },
    { key: 'ddosProtection', label: 'DDoS Protection', desc: 'Basic flood detection and mitigation', icon: ShieldAlert },
    { key: 'sqlInjectionProtection', label: 'SQL Injection Guard', desc: 'Block common SQL injection patterns', icon: FileWarning },
    { key: 'xssProtection', label: 'XSS Protection', desc: 'Cross-site scripting attack prevention', icon: ShieldCheck },
    { key: 'corsEnabled', label: 'CORS Enforcement', desc: 'Strict cross-origin resource sharing rules', icon: Globe },
    { key: 'contentSecurityPolicy', label: 'Content Security Policy', desc: 'Restrict resource loading sources', icon: Lock },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">Security</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            Configure web security and access protection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSessionRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs hover:bg-gray-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Session
          </button>
          <button
            onClick={saveSettings}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-xs hover:bg-[#00ff41]/20 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="bg-green-900/20 border border-green-800/50 rounded-lg px-4 py-3 text-green-400 font-mono text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          {saveMessage}
        </div>
      )}

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {securityFeatures.map((feature) => (
          <div
            key={feature.key}
            className={`bg-[#0d0d14] border rounded-lg p-5 transition-all ${
              settings[feature.key]
                ? 'border-green-800/50 bg-green-900/5'
                : 'border-gray-800 bg-[#0d0d14]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  settings[feature.key]
                    ? 'bg-green-400/10 border border-green-400/30'
                    : 'bg-gray-800 border border-gray-700'
                }`}>
                  <feature.icon className={`w-5 h-5 ${
                    settings[feature.key] ? 'text-green-400' : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-mono font-bold text-sm">{feature.label}</h3>
                  <p className="text-gray-500 font-mono text-xs mt-1">{feature.desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting(feature.key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[feature.key] ? 'bg-green-600' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings[feature.key] ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Timeout */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Session Timeout
          </h3>
          <p className="text-gray-500 font-mono text-xs mb-4">
            Auto-logout after period of inactivity (hours)
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="72"
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
              className="flex-1 accent-[#00ff41]"
            />
            <span className="text-[#00ff41] font-mono font-bold text-lg w-12 text-center">
              {settings.sessionTimeout}h
            </span>
          </div>
        </div>

        {/* Referrer Policy */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            Referrer Policy
          </h3>
          <p className="text-gray-500 font-mono text-xs mb-4">
            Control how much referrer info is sent
          </p>
          <select
            value={settings.referrerPolicy}
            onChange={(e) => updateSetting('referrerPolicy', e.target.value)}
            className="w-full bg-[#050508] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50"
          >
            <option value="no-referrer">no-referrer</option>
            <option value="no-referrer-when-downgrade">no-referrer-when-downgrade</option>
            <option value="origin">origin</option>
            <option value="origin-when-cross-origin">origin-when-cross-origin</option>
            <option value="same-origin">same-origin</option>
            <option value="strict-origin">strict-origin</option>
            <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin</option>
            <option value="unsafe-url">unsafe-url</option>
          </select>
        </div>

        {/* Frame Ancestors */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-yellow-400" />
            Frame Ancestors
          </h3>
          <p className="text-gray-500 font-mono text-xs mb-4">
            Control which sites can embed this page in iframes
          </p>
          <select
            value={settings.frameAncestors}
            onChange={(e) => updateSetting('frameAncestors', e.target.value)}
            className="w-full bg-[#050508] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50"
          >
            <option value="none">none (most secure)</option>
            <option value="self">self</option>
            <option value="*">* (allow all)</option>
          </select>
        </div>

        {/* Active Session */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#00ff41]" />
            Active Session Info
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono text-xs">Email</span>
              <span className="text-gray-300 font-mono text-xs">{session?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono text-xs">Login Time</span>
              <span className="text-gray-300 font-mono text-xs">
                {session?.loginTime ? new Date(session.loginTime).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono text-xs">Expires</span>
              <span className="text-gray-300 font-mono text-xs">
                {session?.expiresAt ? new Date(session.expiresAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono text-xs">Browser</span>
              <span className="text-gray-300 font-mono text-xs">{navigator.userAgent.split(' ').pop()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/5 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-red-400 font-mono font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-gray-500 font-mono text-xs mb-4">
          Irreversible actions. Proceed with extreme caution.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={clearAllData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 border border-red-700/50 text-red-400 font-mono text-xs hover:bg-red-900/40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Stored Data
          </button>
          <span className="text-red-400/50 font-mono text-[10px]">
            Preserves authentication session
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper icon components (not available in lucide-react)
function Clock(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Globe(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default SecurityPage;
