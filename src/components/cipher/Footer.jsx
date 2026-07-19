import React, { useState, useEffect } from 'react';

export const Footer = () => {
  const [buildDate, setBuildDate] = useState('');

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setBuildDate(date);
  }, []);

  return (
    <footer className="py-6 px-8 rice-section w-full" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {/* Redirect Links Banner */}
        <div className="mb-6 pb-5" style={{ borderBottom: '1px solid rgba(102,252,241,0.08)' }}>
          <div className="flex flex-col items-center gap-3">
            {/* Privacy / Prism Break Link */}
            <a
              href="/privacy.html"
              className="group inline-flex items-center gap-3 px-5 py-2.5 border rounded-sm transition-all duration-300 cursor-pointer glitch-text-hover"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
                ':hover': { borderColor: 'var(--color-white)' },
              }}
            >
              <span className="text-sm font-mono font-bold transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {'\u00AB'}
              </span>
              <span className="text-sm font-mono font-bold transition-colors tracking-wider uppercase"
                style={{ color: 'var(--color-white)' }}>
                Staying safe online and opting out of global data surveillance
              </span>
              <span className="text-sm font-mono font-bold transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {'\u00BB'}
              </span>
            </a>

            {/* Personal / About Link */}
            <a
              href="/about.html"
              className="group inline-flex items-center gap-3 px-5 py-2.5 border rounded-sm transition-all duration-300 cursor-pointer glitch-text-hover"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
              }}
            >
              <span className="text-sm font-mono font-bold transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {'\u00AB'}
              </span>
              <span className="text-sm font-mono font-bold transition-colors tracking-wider uppercase"
                style={{ color: 'var(--color-white)' }}>
                Personal Bio
              </span>
              <span className="text-sm font-mono font-bold transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {'\u00BB'}
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono"
          style={{ color: 'var(--color-muted)' }}>
          <div className="flex gap-4">
            <span>BUILD: v1.0.0</span>
            <span style={{ color: 'rgba(102,252,241,0.3)' }}>&bull;</span>
            <span>LAST_UPDATED: {buildDate}</span>
            <span style={{ color: 'rgba(102,252,241,0.3)' }}>&bull;</span>
            <a
              href="/Oscar.admin"
              className="transition-colors duration-500 cursor-default"
              style={{ color: 'var(--color-muted)' }}
              title=""
            >
              ┤
            </a>
          </div>
          <div>&copy; 2024 Oscar Senior &middot; All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};