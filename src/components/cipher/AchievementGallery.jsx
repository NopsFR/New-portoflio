import { useState } from 'react';
import { Award, Star, Zap } from 'lucide-react';
import { profileData } from '../../lib/profileData';

export const AchievementGallery = () => {
  const [hoveredBadge, setHoveredBadge] = useState(null); // Use badge name (unique) instead of index
  const [selectedRarity, setSelectedRarity] = useState(null);

  const badgesByRarity = {
    epic: profileData.achievements.filter(b => b.rarity === 'epic'),
    rare: profileData.achievements.filter(b => b.rarity === 'rare'),
    common: profileData.achievements.filter(b => b.rarity === 'common'),
  };

  const rarityMeta = {
    epic: { bg: 'from-purple-900/30 to-purple-800/20', border: 'border-purple-500/30', text: 'text-purple-300', dot: 'bg-purple-500', label: 'ELITE ACHIEVEMENTS' },
    rare: { bg: 'from-blue-900/30 to-blue-800/20', border: 'border-blue-500/30', text: 'text-blue-300', dot: 'bg-blue-500', label: 'RARE BADGES' },
    common: { bg: 'from-green-900/30 to-green-800/20', border: 'border-green-500/30', text: 'text-green-300', dot: 'bg-green-500', label: 'COMMON BADGES' },
  };

  function renderBadgeGrid(badges) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {badges.map((badge) => {
          const meta = rarityMeta[badge.rarity];
          return (
            <div
              key={badge.name} // unique
              onMouseEnter={() => setHoveredBadge(badge.name)}
              onMouseLeave={() => setHoveredBadge(null)}
              className={`relative bg-gradient-to-br ${meta.bg} border ${meta.border} rounded-lg p-4 transition-all duration-300 cursor-default group hover:shadow-[0_0_20px_rgba(0,255,65,0.08)]`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded-full border border-[#00ff41]/30 flex items-center justify-center bg-black/40 group-hover:border-[#00ff41]/60 group-hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all">
                  {badge.rarity === 'epic' ? (
                    <Star className="w-5 h-5 text-purple-400" fill="currentColor" />
                  ) : badge.rarity === 'rare' ? (
                    <Award className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xs font-bold text-white mb-1 truncate">{badge.name}</h3>
                <p className={`text-[10px] font-mono ${meta.text} uppercase tracking-wider mb-1`}>
                  {badge.rarity}
                </p>
                {badge.percentage && (
                  <p className="text-[10px] text-gray-500 font-mono">{badge.percentage} have it</p>
                )}
              </div>

              {/* Tooltip on hover */}
              {hoveredBadge === badge.name && (
                <div className="absolute inset-0 rounded-lg bg-black/95 border border-[#00ff41]/30 flex flex-col items-center justify-center text-center p-3 z-10 pointer-events-none">
                  <p className="text-xs text-[#00ff41] font-mono mb-1 font-bold uppercase">
                    {badge.fullName}
                  </p>
                  {badge.percentage && (
                    <p className="text-xs text-gray-400">{badge.percentage} of players</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="achievements" className="py-20 px-6 md:px-8" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
            <span className="text-[#00ff41]">[03]</span> CREDENTIALS
          </h2>
          <p className="text-gray-500 font-mono text-sm">
            Verified badges from {profileData.achievements.length} completed challenges
          </p>
        </div>

        {/* Rarity filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { rarity: null, label: 'ALL', count: profileData.achievements.length, color: 'border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10' },
            { rarity: 'epic', label: 'ELITE', count: badgesByRarity.epic.length, color: 'border-purple-500 text-purple-300 bg-purple-500/10' },
            { rarity: 'rare', label: 'RARE', count: badgesByRarity.rare.length, color: 'border-blue-500 text-blue-300 bg-blue-500/10' },
            { rarity: 'common', label: 'COMMON', count: badgesByRarity.common.length, color: 'border-green-500 text-green-300 bg-green-500/10' },
          ].map((btn) => (
            <button
              key={btn.rarity || 'all'}
              onClick={() => setSelectedRarity(btn.rarity)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                selectedRarity === btn.rarity
                  ? btn.color
                  : 'border-gray-700 text-gray-500 hover:border-gray-500'
              }`}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
        </div>

        {/* Badge grids */}
        {selectedRarity === null ? (
          <div className="space-y-12">
            {Object.entries(badgesByRarity).map(([rarity, badges]) => {
              if (badges.length === 0) return null;
              const meta = rarityMeta[rarity];
              return (
                <div key={rarity}>
                  <h3 className={`text-sm font-mono ${meta.text} uppercase tracking-widest mb-4`}>
                    {meta.label}
                  </h3>
                  {renderBadgeGrid(badges)}
                </div>
              );
            })}
          </div>
        ) : (
          renderBadgeGrid(badgesByRarity[selectedRarity])
        )}
      </div>
    </section>
  );
};