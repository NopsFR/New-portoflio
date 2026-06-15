import React from 'react';
import { Shield, Zap, Target } from 'lucide-react';
import { profileData } from '../../lib/profileData';

export const TryHackMeTracker = () => {
  const stats = profileData.tryhackme;

  return (
    <div className="relative bg-cyber-dark border border-cyber-lime/30 rounded-lg p-8 hover:border-cyber-lime/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-cyber-lime/20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-white font-mono">TRYHACKME PROFILE</h2>
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-lime hover:text-cyber-lime/70 text-xs font-mono underline"
          >
            VIEW PROFILE →
          </a>
        </div>
        <p className="text-xs text-gray-500 font-mono">{stats.username}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-obsidian border border-cyber-lime/20 rounded p-4">
          <div className="text-xs text-gray-500 font-mono mb-2">RANK</div>
          <div className="text-cyber-lime font-bold text-lg font-mono">{stats.rank}</div>
          <div className="text-xs text-gray-600 mt-1">Top 2%</div>
        </div>

        <div className="bg-obsidian border border-cyber-lime/20 rounded p-4">
          <div className="text-xs text-gray-500 font-mono mb-2">TIER</div>
          <div className="text-cyber-lime font-bold text-lg font-mono">{stats.tier}</div>
          <div className="text-xs text-gray-600 mt-1">{stats.tierBadge}</div>
        </div>

        <div className="bg-obsidian border border-cyber-lime/20 rounded p-4">
          <div className="text-xs text-gray-500 font-mono mb-2">ROOMS</div>
          <div className="text-cyber-lime font-bold text-lg font-mono">{stats.rooms}</div>
          <div className="text-xs text-gray-600 mt-1">Completed</div>
        </div>

        <div className="bg-obsidian border border-cyber-lime/20 rounded p-4">
          <div className="text-xs text-gray-500 font-mono mb-2">STREAK</div>
          <div className="text-cyber-lime font-bold text-lg font-mono">{stats.streak}</div>
          <div className="text-xs text-gray-600 mt-1">Days Active</div>
        </div>
      </div>

      {/* Pathway Indicators */}
      <div className="space-y-3">
        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Pathways Completed</div>
        <div className="grid grid-cols-3 gap-3">
          {profileData.pathways.map((pathway, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-obsidian border border-cyber-lime/20 rounded px-3 py-2 hover:border-cyber-lime/50 transition-all"
            >
              <div className="w-3 h-3 rounded-full bg-cyber-lime"></div>
              <span className="text-xs font-mono text-gray-300">{pathway.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
