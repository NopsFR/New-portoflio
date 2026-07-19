import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../lib/profileData';

/* ------------------------------------------------------------------ */
/*  TerminalClock                                                      */
/* ------------------------------------------------------------------ */
function TerminalClock() {
  const [time, setTime] = useState('00:00:00');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'GMT', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hero-clock">
      <span className="hero-clock-dot" />
      <span className="hero-clock-label">GMT</span>
      <span className="hero-clock-value">{time}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Character‑resolve title — rAF only, zero re‑renders               */
/* ------------------------------------------------------------------ */
const HEX_CHARS    = '0123456789ABCDEF';
const TARGET       = 'OSCAR SENIOR';
const FRAMES_PER   = 4;
const START_LAG    = 6;

function HackerTitle() {
  const spanRef   = useRef(null);
  const rafId     = useRef(0);
  const frame     = useRef(0);
  const [cursor, setCursor] = useState(false);

  const tick = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;

    frame.current++;
    const f = frame.current;

    let built = '';
    for (let i = 0; i < TARGET.length; i++) {
      if (TARGET[i] === ' ') {
        built += ' ';
        continue;
      }
      const doneAt = START_LAG + i * FRAMES_PER;
      if (f >= doneAt) {
        built += TARGET[i];
      } else {
        built += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
      }
    }

    el.textContent = built;

    if (f < START_LAG + TARGET.length * FRAMES_PER + 4) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      el.textContent = TARGET;
      setCursor(true);
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [tick]);

  return (
    <h1 className="hero-title" aria-label="Oscar Senior">
      <span ref={spanRef} className="hero-title-text">{TARGET}</span>
      <span className={`hero-title-cursor ${cursor ? 'animate-blink' : ''}`} />
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered entrance animation variants                             */
/* ------------------------------------------------------------------ */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */
const HACK_PHRASES = ['BREACH', 'EXPLOIT', 'PERSIST', 'EXFILTRATE', 'DOMINATE'];

export const HeroSection = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx(p => (p + 1) % HACK_PHRASES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="bio" className="hero-section">
      <motion.div
        className="hero-section-inner"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ── Top bar ── */}
        <motion.div className="hero-topbar" variants={fadeSlideUp}>
          <div>
            <div className="hero-status-line">
              <span className="hero-status-dot" />
              <span className="hero-status-text">SYS.ONLINE</span>
              <span className="hero-status-sep">│</span>
              <span className="hero-status-phrase">{HACK_PHRASES[phraseIdx]}</span>
            </div>

            <HackerTitle />

            <p className="hero-subtitle">PENETRATION TESTER · RED TEAM OPERATOR</p>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-status">
              STATUS <span className="hero-meta-accent">{profileData.status}</span>
            </div>
            <TerminalClock />
            <div className="hero-threat">
              <p className="hero-threat-label">THREAT LEVEL</p>
              <div className="hero-threat-bars">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className={`hero-threat-bar ${i < 4 ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bio + Stats ── */}
        <motion.div className="hero-grid" variants={staggerContainer}>
          <motion.div variants={fadeSlideLeft}>
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="hero-card-dot red" />
                <span className="hero-card-dot yellow" />
                <span className="hero-card-dot green" />
                <span className="hero-card-prompt">root@oscar:~# cat /etc/bio</span>
              </div>
              <p className="hero-card-bio">
                <span className="hero-card-prompt-char">$ </span>
                {profileData.bio}
                <span className="hero-card-cursor animate-blink">█</span>
              </p>
            </div>
          </motion.div>

          <motion.div className="hero-stats" variants={fadeSlideRight}>
            {[
              ['LOCATION', profileData.location],
              ['RANK',     `${profileData.tryhackme.rank} · ${profileData.tryhackme.tier}`],
              ['ROOMS',    `${profileData.tryhackme.rooms} completed`],
              ['BADGES',   `${profileData.tryhackme.badges} earned`],
            ].map(([label, value]) => (
              <div key={label} className="hero-stat-row">
                <span className="hero-stat-label">[{label}]</span>
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-indicator" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Pathways ── */}
        <motion.div className="hero-pathways" variants={fadeSlideUp}>
          <div className="hero-pathways-header">
            <span className="hero-pathways-title">COMPLETED PATHWAYS</span>
            <div className="hero-pathways-line" />
          </div>
          <div className="hero-pathways-grid">
            {profileData.pathways.map((p, i) => (
              <motion.div
                key={p.name}
                className="hero-pathway-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="hero-pathway-icon">[{p.icon.toUpperCase()}]</div>
                <h3 className="hero-pathway-name">{p.name}</h3>
                <p className="hero-pathway-date">Completed: {p.completed}</p>
                <div className="hero-pathway-bar">
                  <div className="hero-pathway-fill" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};