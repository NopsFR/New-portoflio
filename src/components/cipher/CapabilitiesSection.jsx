import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../lib/profileData';
import { DecryptText } from '../vfx';

const CATEGORY_DESCRIPTIONS = {
  "Offensive Security": "Hands-on exploitation — breaking into systems with permission, simulating adversary behaviour, building custom payloads, and leveraging social engineering to bypass technical controls.",
  "Post-Exploitation": "Staying quiet after initial access. Lateral movement, privilege escalation, persistence, evasion, and data exfiltration across hardened environments.",
  "Systems & Infrastructure": "Linux hardening, Windows internals, Active Directory attack paths. If you don't understand the infrastructure you're targeting, you're guessing.",
  "Core Technical": "Bash and Python automation, HTTP/DNS internals, network fundamentals, web application security, reverse engineering — the fundamentals I lean on daily."
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const skillBadgeVars = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const CapabilitiesSection = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <section
      id="arsenal"
      className="py-24 px-6 md:px-8 w-full rice-section rice-active-window"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
            variants={fadeSlideUp}
          >
            <span style={{ color: 'var(--color-accent)' }}>[02]</span>{' '}
            <DecryptText text="OPERATIONAL CAPABILITIES" />
          </motion.h2>
          <motion.p
            className="font-mono"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}
            variants={fadeSlideUp}
          >
            <DecryptText text="Offensive security expertise and threat vectors" />
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {profileData.capabilities.map((capability, idx) => (
            <motion.div
              key={idx}
              variants={fadeSlideUp}
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(102,252,241,0.30)',
                transition: { duration: 0.15 },
              }}
              className="flex items-start gap-4 rounded p-5 transition-colors duration-150 cursor-default"
              style={{
                border: '1px solid var(--color-border)',
                background: 'linear-gradient(135deg, rgba(31,40,51,0.4) 0%, rgba(11,12,16,0.5) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span className="font-mono flex-shrink-0 mt-0.5" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>▶</span>
              <span className="font-mono leading-relaxed" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                {capability}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="space-y-10">
          {Object.entries(profileData.skills).map(([category, skills]) => {
            const isExpanded = expandedCategories[category];
            return (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeSlideUp}
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-3 font-mono uppercase tracking-widest mb-5 text-left transition-colors duration-150 cursor-pointer"
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}
                >
                  <motion.span
                    className="flex-shrink-0"
                    animate={{ rotate: isExpanded ? 0 : -90 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                  {category}
                </button>

                <AnimatePresence>
                  {isExpanded && CATEGORY_DESCRIPTIONS[category] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4 pl-8 overflow-hidden"
                    >
                      <div className="font-mono leading-relaxed rounded p-4"
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-muted)',
                          border: '1px solid var(--color-accent-dim)',
                          background: 'rgba(102,252,241,0.03)',
                          borderRadius: 'var(--radius-md)',
                        }}>
                        {CATEGORY_DESCRIPTIONS[category]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="flex flex-wrap gap-3 pl-6"
                  style={{ borderLeft: '1px solid var(--color-accent-dim)' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={skillBadgeVars}
                      whileHover={{
                        scale: 1.06,
                        borderColor: 'rgba(102,252,241,0.40)',
                        color: 'var(--color-accent)',
                        transition: { duration: 0.12 },
                      }}
                      className="font-mono px-4 py-2.5 rounded cursor-default transition-all duration-75"
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text)',
                        background: 'linear-gradient(180deg, rgba(31,40,51,0.5) 0%, rgba(11,12,16,0.6) 100%)',
                        border: '1px solid rgba(102,252,241,0.10)',
                        borderRadius: 'var(--radius-sm)',
                        backdropFilter: 'blur(3px)',
                        WebkitBackdropFilter: 'blur(3px)',
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};