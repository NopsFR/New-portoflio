import React, { useState } from 'react';
import { Award, Star, Zap } from 'lucide-react';
import { profileData } from '../../lib/profileData';

export const AchievementGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);

  // Group badges by rarity
  const badgesByRarity = {
    epic: profileData.achievements.filter(b => b.rarity === 'epic'),
    rare: profileData.achievements.filter(b => b.rarity === 'rare'),
    common: profileData.achievements.filter(b => b.rarity === 'common'),
  };

  const getRarityColor = (rarity) => {
    const colors = {
      epic: { bg: 'from-purple-900/40 to-pink-900/40', border: 'border-purple-500/60', text: 'text-purple-300', dot: 'bg-purple-500' },
      rare: { bg: 'from-blue-900/40 to-cyan-900/40', border: 'border-blue-500/60', text: 'text-blue-300', dot: 'bg-blue-500' },
      common: { bg: 'from-green-900/40 to-emerald-900/40', border: 'border-green-500/60', text: 'text-green-300', dot: 'bg-green-500' },
    };
    return colors[rarity] || colors.common;
  };

  const renderBadgeGrid = (badges) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {badges.map((badge, idx) => {
        const rarityColors = getRarityColor(badge.rarity);

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative bg-gradient-to-br ${rarityColors.bg} border ${rarityColors.border} rounded-lg p-4 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]`}
          >
            {/* Badge Icon Container */}
            <div className="flex justify-center mb-3 h-12">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-cyber-lime/50 flex items-center justify-center bg-obsidian/60 group-hover:border-cyber-lime group-hover:shadow-[0_0_10px_rgba(204,255,0,0.4)] transition-all">
                  {badge.rarity === 'epic' ? (
                    <Star className="w-6 h-6 text-purple-400" fill="currentColor" />
                  ) : badge.rarity === 'rare' ? (
                    <Award className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Zap className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className="text-xs font-bold text-white mb-1 line-clamp-2">{badge.name}</h3>
              <p className={`text-xs font-mono ${rarityColors.text} uppercase tracking-wider mb-1`}>
                {badge.rarity}
              </p>
              {badge.percentage && (
                <p className="text-xs text-gray-400 font-mono">{badge.percentage} have it</p>
              )}
            </div>

            {/* Cyber Glow on Hover */}
            {hoveredIndex === idx && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-cyber-lime/10 to-transparent pointer-events-none" />
            )}

            {/* Tooltip on Hover */}
            {hoveredIndex === idx && (
              <div className="absolute inset-0 rounded-lg bg-obsidian/95 border border-cyber-lime/40 flex flex-col items-center justify-center text-center p-3 backdrop-blur-sm z-10">
                <p className="text-xs text-cyber-lime font-mono mb-1 font-bold uppercase">
                  {badge.fullName}
                </p>
                {badge.percentage && (
                  <p className="text-xs text-gray-400">
                    {badge.percentage} of players
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="achievements" className="py-20 px-8 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 font-mono">
            <span className="text-cyber-lime">[03]</span> CREDENTIALS
          </h2>
          <p className="text-gray-500 font-mono text-sm">Verified badges from {profileData.achievements.length} completed challenges</p>
        </div>

        {/* Rarity Filter */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSelectedRarity(null)}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all ${
              selectedRarity === null
                ? 'border-cyber-lime bg-cyber-lime/20 text-cyber-lime'
                : 'border-gray-600 text-gray-400 hover:border-cyber-lime/50'
            }`}
          >
            ALL ({profileData.achievements.length})
          </button>
          <button
            onClick={() => setSelectedRarity('epic')}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all ${
              selectedRarity === 'epic'
                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                : 'border-gray-600 text-gray-400 hover:border-purple-500/50'
            }`}
          >
            ELITE ({badgesByRarity.epic.length})
          </button>
          <button
            onClick={() => setSelectedRarity('rare')}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all ${
              selectedRarity === 'rare'
                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                : 'border-gray-600 text-gray-400 hover:border-blue-500/50'
            }`}
          >
            RARE ({badgesByRarity.rare.length})
          </button>
          <button
            onClick={() => setSelectedRarity('common')}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all ${
              selectedRarity === 'common'
                ? 'border-green-500 bg-green-500/20 text-green-300'
                : 'border-gray-600 text-gray-400 hover:border-green-500/50'
            }`}
          >
            COMMON ({badgesByRarity.common.length})
          </button>
        </div>

        {/* Badge Grids */}
        {selectedRarity === null ? (
          <div className="space-y-12">
            {badgesByRarity.epic.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">
                  ★ ELITE ACHIEVEMENTS
                </h3>
                {renderBadgeGrid(badgesByRarity.epic)}
              </div>
            )}
            {badgesByRarity.rare.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">
                  ◆ RARE BADGES
                </h3>
                {renderBadgeGrid(badgesByRarity.rare)}
              </div>
            )}
            {badgesByRarity.common.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">
                  ◇ COMMON BADGES
                </h3>
                {renderBadgeGrid(badgesByRarity.common)}
              </div>
            )}
          </div>
        ) : (
          renderBadgeGrid(badgesByRarity[selectedRarity])
        )}
      </div>
    </section>
  );
};
