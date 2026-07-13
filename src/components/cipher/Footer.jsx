import React, { useState, useEffect } from 'react';

export const Footer = () => {
  const [buildDate, setBuildDate] = useState('');

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setBuildDate(date);
  }, []);

  return (
    <footer className="bg-obsidian border-t border-cyber-lime/20 py-6 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Redirect Links Banner */}
        <div className="mb-6 pb-5 border-b border-cyber-lime/15 text-center">
          <div className="flex flex-col items-center gap-3">
            {/* Privacy / Prism Break Link */}
            <a
              href="/privacy.html"
              className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/40 hover:border-white rounded-sm transition-all duration-300 cursor-pointer"
            >
              <span className="text-sm font-mono font-bold text-white/60 group-hover:text-white transition-colors">
                {'\u00AB'}
              </span>
              <span className="text-sm font-mono font-bold text-white group-hover:text-white transition-colors tracking-wider uppercase">
                Staying safe online and opting out of global data surveillance
              </span>
              <span className="text-sm font-mono font-bold text-white/60 group-hover:text-white transition-colors">
                {'\u00BB'}
              </span>
            </a>

            {/* Personal / About Link */}
            <a
              href="/about.html"
              className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/40 hover:border-white rounded-sm transition-all duration-300 cursor-pointer"
            >
              <span className="text-sm font-mono font-bold text-white/60 group-hover:text-white transition-colors">
                {'\u00AB'}
              </span>
              <span className="text-sm font-mono font-bold text-white group-hover:text-white transition-colors tracking-wider uppercase">
                Personal Bio
              </span>
              <span className="text-sm font-mono font-bold text-white/60 group-hover:text-white transition-colors">
                {'\u00BB'}
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-gray-600">
          <div className="flex gap-4">
            <span>BUILD: v1.0.0</span>
            <span className="text-cyber-lime/50">&bull;</span>
            <span>LAST_UPDATED: {buildDate}</span>
          </div>
          <div>&copy; 2024 Oscar Senior &middot; All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};