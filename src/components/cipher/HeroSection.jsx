import React from 'react';
import { Clock } from './Overlays';
import { profileData } from '../../lib/profileData';

export const HeroSection = () => {
  return (
    <section id="bio" className="relative min-h-screen flex flex-col items-start justify-center px-8 pt-20 pb-32 bg-obsidian">
      <div className="max-w-6xl w-full">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <div className="text-cyber-lime text-sm font-mono mb-2 tracking-widest">
              [SYSTEM_INITIALIZE]
            </div>
            <h1
              className="font-display text-9xl font-black leading-tight mb-4 text-cyber-lime drop-shadow-[0_0_20px_rgba(204,255,0,0.8)]"
              style={{
                letterSpacing: '0.15em',
                fontKerning: 'auto',
              }}
            >
              {profileData.name.split(' ').map((word, i) => (
                <div key={i} className="leading-none">{word}</div>
              ))}
            </h1>
          </div>

          <div className="text-right">
            <div className="font-mono text-xs text-cyber-lime mb-2 tracking-widest">
              STATUS: {profileData.status}
            </div>
            <Clock />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="font-sans text-lg leading-relaxed text-gray-400 mb-4">
              {profileData.bio}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-cyber-lime">[LOCATION]</span>
              <span className="text-gray-400">{profileData.location}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-cyber-lime">[RANK]</span>
              <span className="text-gray-400">{profileData.tryhackme.rank} · {profileData.tryhackme.tier}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-cyber-lime">[ROOMS]</span>
              <span className="text-gray-400">{profileData.tryhackme.rooms} completed</span>
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-lime/20 pt-8">
          <div className="grid grid-cols-3 gap-8">
            {profileData.pathways.map((pathway, idx) => (
              <div key={idx}>
                <div className="font-mono text-xs text-cyber-lime mb-2 tracking-widest">
                  [{pathway.icon.toUpperCase()}]
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{pathway.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{pathway.completed}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
