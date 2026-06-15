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
