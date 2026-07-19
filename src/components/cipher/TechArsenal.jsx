import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../lib/profileData';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const TechArsenal = () => {
  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl font-bold mb-2 font-mono"
            style={{ color: 'var(--color-white)' }}
            variants={fadeSlideUp}
          >
            <span style={{ color: 'var(--color-accent)' }}>[02]</span> TECHNICAL ARSENAL
          </motion.h2>
          <motion.p
            className="font-mono text-sm"
            style={{ color: 'var(--color-muted)' }}
            variants={fadeSlideUp}
          >
            Core capabilities and threat vectors
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(profileData.skills).map(([category, skills]) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeSlideUp}
            >
              <h3
                className="text-sm font-mono uppercase tracking-widest mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                ╭─ {category}
              </h3>

              <motion.div
                className="flex flex-wrap gap-3 pl-4"
                style={{ borderLeft: '1px solid var(--color-accent-dim)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeSlideUp}
                    whileHover={{ scale: 1.06, borderColor: 'rgba(102,252,241,0.40)' }}
                    className="font-mono text-xs px-3 py-2 rounded cursor-default transition-all duration-200"
                    style={{
                      color: 'var(--color-text)',
                      background: 'linear-gradient(180deg, rgba(31,40,51,0.5) 0%, rgba(11,12,16,0.6) 100%)',
                      border: '1px solid rgba(102,252,241,0.12)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};