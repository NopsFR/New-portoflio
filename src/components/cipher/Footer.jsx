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
        {/* Redirect Link Banner */}
        <div className="mb-6 pb-5 border-b border-cyber-lime/15 text-center">
          <a
            href="/privacy.html"
            className="group inline-flex items-center gap-3 px-5 py-2.5 border border-cyber-lime/30 hover:border-cyber-lime rounded-sm transition-all duration-300 cursor-pointer"
          >
            <span className="text-xs font-mono text-cyber-lime/50 group-hover:text-cyber-lime transition-colors">[&raquo;]</span>
            <span className="text-sm font-mono text-cyber-lime/80 group-hover:text-cyber-lime transition-colors tracking-wider uppercase">
              Staying safe online and opting out of global data surveillance
            </span>
            <span className="text-xs font-mono text-cyber-lime/50 group-hover:text-cyber-lime transition-colors">[&laquo;]</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyber-lime group-hover:w-3/4 transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-gray-600">
          <div className="flex gap-4">
            <span>BUILD: v1.0.0</span>
            <span className="text-cyber-lime/50">•</span>
            <span>LAST_UPDATED: {buildDate}</span>
          </div>
          <div>© 2024 Oscar Senior · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};
