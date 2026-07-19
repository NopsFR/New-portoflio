import React, { useEffect, useState } from 'react';

export const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none scanline-overlay" />
  );
};

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#66FCF1" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export const Clock = () => {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const gmt = now.toLocaleTimeString('en-US', { timeZone: 'GMT', hour12: false });
      setTime(gmt);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs tracking-wider" style={{ color: 'var(--color-accent)' }}>
      GMT: {time}
    </div>
  );
};