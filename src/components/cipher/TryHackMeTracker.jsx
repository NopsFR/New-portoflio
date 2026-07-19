import React from 'react';
import { profileData } from '../../lib/profileData';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

const statCards = [
  { label: 'RANK', value: profileData.tryhackme.rank, sub: 'Top 2%' },
  { label: 'TIER', value: profileData.tryhackme.tier, sub: profileData.tryhackme.tierBadge },
  { label: 'ROOMS', value: profileData.tryhackme.rooms, sub: 'Completed' },
  { label: 'STREAK', value: profileData.tryhackme.streak, sub: 'Days Active' },
];

export const TryHackMeTracker = () => {
  return (
    <div
      className="relative rounded-lg p-8 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(31,40,51,0.7) 0%, rgba(11,12,16,0.9) 100%)',
        border: '1px solid rgba(102,252,241,0.12)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(102,252,241,0.03)',
      }}
    >
      {/* Header */}
      <div className="mb-6 pb-4" style={{ borderBottom: '1px solid rgba(102,252,241,0.08)' }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-mono" style={{ color: 'var(--color-white)' }}>
            TRYHACKME PROFILE
          </h2>
          <a
            href={profileData.tryhackme.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glitch-text-hover text-xs font-mono underline cursor-pointer transition-colors duration-150"
            style={{ color: 'var(--color-accent)' }}
          >
            VIEW PROFILE →
          </a>
        </div>
        <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
          {profileData.tryhackme.username}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded p-4 transition-all duration-200"
            style={{
              background: 'linear-gradient(180deg, rgba(31,40,51,0.5) 0%, rgba(11,12,16,0.6) 100%)',
              border: '1px solid rgba(102,252,241,0.10)',
              borderRadius: 'var(--radius-md)',
            }}
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(102,252,241,0.30)',
              transition: { duration: 0.15 },
            }}
          >
            <div className="text-xs font-mono mb-2" style={{ color: 'var(--color-muted)' }}>
              {stat.label}
            </div>
            <div className="font-bold text-lg font-mono" style={{ color: 'var(--color-accent)' }}>
              {stat.value}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pathway Indicators */}
      <div className="space-y-3">
        <div
          className="text-xs font-mono uppercase tracking-wider"
          style={{ color: 'var(--color-muted)' }}
        >
          Pathways Completed
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {profileData.pathways.map((pathway, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-center gap-2 rounded px-3 py-2 transition-all duration-150"
              style={{
                backgroundColor: 'rgba(31,40,51,0.4)',
                border: '1px solid rgba(102,252,241,0.08)',
                borderRadius: 'var(--radius-sm)',
              }}
              whileHover={{
                borderColor: 'rgba(102,252,241,0.35)',
                scale: 1.02,
                transition: { duration: 0.12 },
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: '0 0 6px rgba(102,252,241,0.5)',
                }}
              />
              <span className="text-xs font-mono" style={{ color: 'var(--color-text)' }}>
                {pathway.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};