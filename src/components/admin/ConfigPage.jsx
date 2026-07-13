import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Globe,
  Code,
  Palette,
  FileText,
  Image,
  Link,
  Bell,
  RefreshCw,
  Eye,
  Layout,
  Type,
  Hash,
  Power,
} from 'lucide-react';

function ConfigPage() {
  const [config, setConfig] = useState({
    siteName: 'Nops Portfolio',
    siteDescription: 'Cybersecurity Portfolio',
    siteUrl: window.location.origin,
    primaryColor: '#00ff41',
    backgroundColor: '#0a0a0f',
    secondaryColor: '#1a1a2e',
    accentColor: '#00ff41',
    fontFamily: 'monospace',
    showTryHackMe: true,
    showAchievements: true,
    showCapabilities: true,
    enableDarkMode: true,
    enableScanlines: true,
    enableGridBackground: true,
    enableAnimations: true,
    googleAnalyticsId: '',
    metaKeywords: 'cybersecurity, portfolio, ethical hacking, penetration testing',
    metaAuthor: 'Nops',
    robotsIndex: true,
    robotsFollow: true,
    contactEmail: 'Nopsrust@gmail.com',
    footerText: '© 2026 Nops. All rights reserved.',
    maxSidebarItems: 5,
    cacheDuration: 3600,
  });

  const [saveMessage, setSaveMessage] = useState('');
  const [activeSection, setActiveSection] = useState('general');

  useEffect(() => {
    loadConfig();
  }, []);

  function loadConfig() {
    const saved = JSON.parse(localStorage.getItem('oscar_site_config') || 'null');
    if (saved) {
      setConfig(prev => ({ ...prev, ...saved }));
    }
  }

  function saveConfig() {
    localStorage.setItem('oscar_site_config', JSON.stringify(config));
    setSaveMessage('Configuration saved successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  }

  function updateConfig(key, value) {
    setConfig(prev => ({ ...prev, [key]: value }));
  }

  function resetConfig() {
    if (window.confirm('Reset all configuration to defaults?')) {
      localStorage.removeItem('oscar_site_config');
      loadConfig();
      setSaveMessage('Configuration reset to defaults');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  }

  const sections = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Code },
    { id: 'advanced', label: 'Advanced', icon: Settings },
  ];

  const textInput = (label, key, placeholder = '', type = 'text') => (
    <div>
      <label className="block text-gray-400 font-mono text-xs mb-2">{label}</label>
      <input
        type={type}
        value={config[key] || ''}
        onChange={(e) => updateConfig(key, type === 'number' ? parseInt(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#050508] border border-gray-700 rounded px-4 py-2.5 text-gray-200 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50"
      />
    </div>
  );

  const toggleInput = (label, key, description = '') => (
    <div className="flex items-center justify-between py-3 border-b border-gray-800">
      <div>
        <span className="text-gray-300 font-mono text-sm">{label}</span>
        {description && <p className="text-gray-600 font-mono text-[10px]">{description}</p>}
      </div>
      <button
        onClick={() => updateConfig(key, !config[key])}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          config[key] ? 'bg-[#00ff41]' : 'bg-gray-700'
        }`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          config[key] ? 'translate-x-7' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">Website Configuration</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            Configure all aspects of your website from one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetConfig}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/10 border border-red-800/30 text-red-400 font-mono text-xs hover:bg-red-900/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={saveConfig}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-xs hover:bg-[#00ff41]/20 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="bg-green-900/20 border border-green-800/50 rounded-lg px-4 py-3 text-green-400 font-mono text-xs flex items-center gap-2">
          <Bell className="w-4 h-4" />
          {saveMessage}
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-800">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-3 font-mono text-sm transition-all border-b-2 -mb-[2px] ${
              activeSection === section.id
                ? 'text-[#00ff41] border-[#00ff41]'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <div className="space-y-6">
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-white font-mono font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              General Settings
            </h3>
            {textInput('Site Name', 'siteName')}
            {textInput('Site Description', 'siteDescription')}
            {textInput('Site URL', 'siteUrl')}
            {textInput('Contact Email', 'contactEmail', '', 'email')}
            {textInput('Footer Text', 'footerText')}
          </div>
        </div>
      )}

      {/* Appearance Settings */}
      {activeSection === 'appearance' && (
        <div className="space-y-6">
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-white font-mono font-bold flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              Theme Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 font-mono text-xs mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border border-gray-700"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig('primaryColor', e.target.value)}
                    className="flex-1 bg-[#050508] border border-gray-700 rounded px-4 py-2.5 text-gray-200 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 font-mono text-xs mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border border-gray-700"
                  />
                  <input
                    type="text"
                    value={config.secondaryColor}
                    onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                    className="flex-1 bg-[#050508] border border-gray-700 rounded px-4 py-2.5 text-gray-200 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50"
                  />
                </div>
              </div>
              {textInput('Background Color', 'backgroundColor')}
              {textInput('Accent Color', 'accentColor')}
            </div>
            <div>
              <label className="block text-gray-400 font-mono text-xs mb-2">Font Family</label>
              <select
                value={config.fontFamily}
                onChange={(e) => updateConfig('fontFamily', e.target.value)}
                className="w-full bg-[#050508] border border-gray-700 rounded px-4 py-2.5 text-gray-200 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50"
              >
                <option value="monospace">Monospace</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="system-ui">System Default</option>
              </select>
            </div>
          </div>

          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-1">
            <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
              <Layout className="w-4 h-4 text-yellow-400" />
              Display Options
            </h3>
            {toggleInput('Dark Mode', 'enableDarkMode')}
            {toggleInput('Scanline Effect', 'enableScanlines')}
            {toggleInput('Grid Background', 'enableGridBackground')}
            {toggleInput('Page Animations', 'enableAnimations')}
          </div>
        </div>
      )}

      {/* Content Settings */}
      {activeSection === 'content' && (
        <div className="space-y-6">
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-1">
            <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00ff41]" />
              Content Visibility
            </h3>
            {toggleInput('Show TryHackMe Stats', 'showTryHackMe', 'Display the TryHackMe tracker section')}
            {toggleInput('Show Achievements', 'showAchievements', 'Display the achievement gallery')}
            {toggleInput('Show Capabilities', 'showCapabilities', 'Display the capabilities/skills section')}
          </div>
        </div>
      )}

      {/* SEO Settings */}
      {activeSection === 'seo' && (
        <div className="space-y-6">
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-white font-mono font-bold flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              SEO & Metadata
            </h3>
            {textInput('Meta Keywords', 'metaKeywords')}
            {textInput('Meta Author', 'metaAuthor')}
            {textInput('Google Analytics ID', 'googleAnalyticsId')}
          </div>

          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-1">
            <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-400" />
              Robot Directives
            </h3>
            {toggleInput('Allow Indexing', 'robotsIndex', 'Search engines can index your site')}
            {toggleInput('Allow Following', 'robotsFollow', 'Search engines can follow links')}
          </div>
        </div>
      )}

      {/* Advanced Settings */}
      {activeSection === 'advanced' && (
        <div className="space-y-6">
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-white font-mono font-bold flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              Advanced Configuration
            </h3>
            {textInput('Max Sidebar Items', 'maxSidebarItems', '', 'number')}
            {textInput('Cache Duration (seconds)', 'cacheDuration', '', 'number')}
          </div>

          {/* Current Config Preview */}
          <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6">
            <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              Configuration Preview (JSON)
            </h3>
            <pre className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-gray-300 font-mono text-xs overflow-x-auto max-h-96">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
        <h3 className="text-white font-mono font-bold mb-4">Storage Usage</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-[#00ff41]">
              {Object.keys(localStorage).length}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">LocalStorage Keys</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-blue-400">
              {(new Blob([JSON.stringify(localStorage)]).size / 1024).toFixed(1)} KB
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Storage Used</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-purple-400">
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Last Config Update</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-yellow-400">
              v1.0.0
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Admin Version</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigPage;