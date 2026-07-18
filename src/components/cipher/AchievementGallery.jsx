import { useState } from 'react';
import { Award, Star, Zap } from 'lucide-react';
import { profileData } from '../../lib/profileData';
import { DecryptText } from '../vfx';

export const AchievementGallery = () => {
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);

  const badgesByRarity = {
    epic: profileData.achievements.filter(b => b.rarity === 'epic'),
    rare: profileData.achievements.filter(b => b.rarity === 'rare'),
    common: profileData.achievements.filter(b => b.rarity === 'common'),
  };

  const rarityMeta = {
    epic: { border: 'rgba(168,85,247,0.30)', text: '#a855f7', label: 'ELITE ACHIEVEMENTS' },
    rare: { border: 'rgba(59,130,246,0.30)', text: '#3b82f6', label: 'RARE BADGES' },
    common: { border: 'rgba(34,197,94,0.30)', text: '#22c55e', label: 'COMMON BADGES' },
  };

  function renderBadgeGrid(badges) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {badges.map((badge) => {
          const meta = rarityMeta[badge.rarity];
          return (
            <div
              key={badge.name}
              onMouseEnter={() => setHoveredBadge(badge.name)}
              onMouseLeave={() => setHoveredBadge(null)}
              data-hover-brackets
              className="relative rounded-lg p-4 cursor-default transition-all duration-100"
              style={{
                border: `1px solid ${meta.border}`,
                backgroundColor: 'rgba(0,255,65,0.02)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-100"
                  style={{
                    border: '1px solid rgba(0,255,65,0.20)',
                    backgroundColor: 'rgba(0,0,0,0.40)',
                  }}>
                  {badge.rarity === 'epic' ? (
                    <Star className="w-5 h-5" style={{ color: '#a855f7' }} fill="currentColor" />
                  ) : badge.rarity === 'rare' ? (
                    <Award className="w-5 h-5" style={{ color: '#3b82f6' }} />
                  ) : (
                    <Zap className="w-4 h-4" style={{ color: '#22c55e' }} />
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xs font-bold mb-1 truncate font-mono" style={{ color: 'var(--color-white)' }}>{badge.name}</h3>
                <p className="font-mono uppercase tracking-wider mb-1" style={{ fontSize: '0.625rem', color: meta.text }}>
                  {badge.rarity}
                </p>
                {badge.percentage && (
                  <p className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--color-muted)' }}>{badge.percentage} have it</p>
                )}
              </div>

              {hoveredBadge === badge.name && (
                <div className="absolute inset-0 rounded-lg flex flex-col items-center justify-center text-center p-3 z-10 pointer-events-none"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    border: '1px solid var(--color-accent-dim)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                  <p className="font-mono font-bold uppercase mb-1" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                    {badge.fullName}
                  </p>
                  {badge.percentage && (
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{badge.percentage} of players</p>
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
    <section id="achievements" className="py-24 px-6 md:px-8 w-full" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-mono font-bold mb-2" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-white)' }}>
            <span style={{ color: 'var(--color-accent)' }}>[03]</span>{' '}
            <DecryptText text="CREDENTIALS" />
          </h2>
          <p className="font-mono" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
            Verified badges from {profileData.achievements.length} completed challenges
          </p>
        </div>

        {/* Rarity filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { rarity: null, label: 'ALL', count: profileData.achievements.length, color: 'var(--color-accent)' },
            { rarity: 'epic', label: 'ELITE', count: badgesByRarity.epic.length, color: '#a855f7' },
            { rarity: 'rare', label: 'RARE', count: badgesByRarity.rare.length, color: '#3b82f6' },
            { rarity: 'common', label: 'COMMON', count: badgesByRarity.common.length, color: '#22c55e' },
          ].map((btn) => (
            <button
              key={btn.rarity || 'all'}
              onClick={() => setSelectedRarity(btn.rarity)}
              data-hover-brackets
              className="font-mono px-3 py-1.5 rounded border transition-all duration-100"
              style={{
                fontSize: 'var(--text-xs)',
                borderColor: selectedRarity === btn.rarity ? btn.color : 'var(--color-border)',
                color: selectedRarity === btn.rarity ? btn.color : 'var(--color-muted)',
                backgroundColor: selectedRarity === btn.rarity ? `${btn.color}10` : 'transparent',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
        </div>

        {/* Badge grids */}
        {selectedRarity === null ? (
          <div className="space-y-14">
            {Object.entries(badgesByRarity).map(([rarity, badges]) => {
              if (badges.length === 0) return null;
              const meta = rarityMeta[rarity];
              return (
                <div key={rarity}>
                  <h3 className="font-mono uppercase tracking-widest mb-5" style={{ fontSize: 'var(--text-sm)', color: meta.text }}>
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