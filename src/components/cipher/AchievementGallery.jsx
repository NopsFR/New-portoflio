import { useState } from 'react';
import { Award, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../lib/profileData';
import { DecryptText } from '../vfx';

const rarityMeta = {
  epic: { border: 'rgba(192,132,252,0.30)', text: '#C084FC', bg: 'rgba(192,132,252,0.06)', label: 'ELITE ACHIEVEMENTS' },
  rare: { border: 'rgba(96,165,250,0.30)', text: '#60A5FA', bg: 'rgba(96,165,250,0.06)', label: 'RARE BADGES' },
  common: { border: 'rgba(74,222,128,0.30)', text: '#4ADE80', bg: 'rgba(74,222,128,0.06)', label: 'COMMON BADGES' },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const badgeVars = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const filterVars = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const AchievementGallery = () => {
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);

  const badgesByRarity = {
    epic: profileData.achievements.filter(b => b.rarity === 'epic'),
    rare: profileData.achievements.filter(b => b.rarity === 'rare'),
    common: profileData.achievements.filter(b => b.rarity === 'common'),
  };

  function renderBadgeGrid(badges) {
    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
      >
        {badges.map((badge) => {
          const meta = rarityMeta[badge.rarity];
          const isHovered = hoveredBadge === badge.name;
          return (
            <motion.div
              key={badge.name}
              variants={badgeVars}
              onMouseEnter={() => setHoveredBadge(badge.name)}
              onMouseLeave={() => setHoveredBadge(null)}
              whileHover={{
                scale: 1.04,
                borderColor: meta.text,
                transition: { duration: 0.15 },
              }}
              className="relative rounded-lg p-4 cursor-default transition-colors duration-150"
              style={{
                border: `1px solid ${isHovered ? meta.text : meta.border}`,
                background: `linear-gradient(180deg, ${meta.bg} 0%, rgba(11,12,16,0.5) 100%)`,
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div className="flex justify-center mb-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150"
                  style={{
                    border: `1px solid ${meta.border}`,
                    backgroundColor: 'rgba(11,12,16,0.5)',
                    boxShadow: isHovered ? `0 0 12px ${meta.border}` : 'none',
                  }}
                >
                  {badge.rarity === 'epic' ? (
                    <Star className="w-5 h-5" fill="currentColor" style={{ color: meta.text }} />
                  ) : badge.rarity === 'rare' ? (
                    <Award className="w-5 h-5" style={{ color: meta.text }} />
                  ) : (
                    <Zap className="w-4 h-4" fill="currentColor" style={{ color: meta.text }} />
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xs font-bold mb-1 truncate font-mono" style={{ color: 'var(--color-white)' }}>
                  {badge.name}
                </h3>
                <p className="font-mono uppercase tracking-wider mb-1" style={{ fontSize: '0.625rem', color: meta.text }}>
                  {badge.rarity}
                </p>
                {badge.percentage && (
                  <p className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--color-muted)' }}>
                    {badge.percentage} have it
                  </p>
                )}
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute inset-0 rounded-lg flex flex-col items-center justify-center text-center p-3 z-10 pointer-events-none"
                    style={{
                      backgroundColor: 'rgba(11,12,16,0.95)',
                      border: '1px solid var(--color-accent-dim)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <p className="font-mono font-bold uppercase mb-1" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                      {badge.fullName}
                    </p>
                    {badge.percentage && (
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{badge.percentage} of players</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <section id="achievements" className="py-24 px-6 md:px-8 w-full rice-section" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-mono font-bold mb-2"
            style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-white)' }}
            variants={badgeVars}
          >
            <span style={{ color: 'var(--color-accent)' }}>[03]</span>{' '}
            <DecryptText text="CREDENTIALS" />
          </motion.h2>
          <motion.p
            className="font-mono"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}
            variants={badgeVars}
          >
            Verified badges from {profileData.achievements.length} completed challenges
          </motion.p>
        </motion.div>

        {/* Rarity filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { rarity: null, label: 'ALL', count: profileData.achievements.length, color: 'var(--color-accent)' },
            { rarity: 'epic', label: 'ELITE', count: badgesByRarity.epic.length, color: '#C084FC' },
            { rarity: 'rare', label: 'RARE', count: badgesByRarity.rare.length, color: '#60A5FA' },
            { rarity: 'common', label: 'COMMON', count: badgesByRarity.common.length, color: '#4ADE80' },
          ].map((btn, i) => (
            <motion.button
              key={btn.rarity || 'all'}
              custom={i}
              variants={filterVars}
              onClick={() => setSelectedRarity(btn.rarity)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="font-mono px-3 py-1.5 rounded border transition-all duration-150 cursor-pointer"
              style={{
                fontSize: 'var(--text-xs)',
                borderColor: selectedRarity === btn.rarity ? btn.color : 'var(--color-border)',
                color: selectedRarity === btn.rarity ? btn.color : 'var(--color-muted)',
                backgroundColor: selectedRarity === btn.rarity ? `${btn.color}10` : 'transparent',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {btn.label} ({btn.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Badge grids */}
        {selectedRarity === null ? (
          <div className="space-y-14">
            {Object.entries(badgesByRarity).map(([rarity, badges]) => {
              if (badges.length === 0) return null;
              const meta = rarityMeta[rarity];
              return (
                <motion.div
                  key={rarity}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={badgeVars}
                >
                  <h3
                    className="font-mono uppercase tracking-widest mb-5"
                    style={{ fontSize: 'var(--text-sm)', color: meta.text }}
                  >
                    {meta.label}
                  </h3>
                  {renderBadgeGrid(badges)}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRarity}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderBadgeGrid(badgesByRarity[selectedRarity])}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};