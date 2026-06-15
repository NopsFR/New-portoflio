import React, { useEffect, useState } from 'react';

export const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-lime to-transparent opacity-0 animate-scan-line h-1"></div>
    </div>
  );
};

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5 bg-obsidian">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#CCFF00" strokeWidth="0.5"/>
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
    <div className="font-mono text-cyber-lime text-xs tracking-wider">
      GMT: {time}
    </div>
  );
};
