import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeroSection,
  TryHackMeTracker,
  CapabilitiesSection,
  AchievementGallery,
  SideNav,
  Footer,
} from './components/cipher';
import { TerminalBackground } from './components/vfx';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <div
      className="relative text-white overflow-x-hidden min-h-screen"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Single-canvas background: matrix rain + particle web + scanline sweep */}
      <TerminalBackground opacity={0.06} />

      <SideNav />

      <main
        className="md:mr-20 relative flex flex-col items-center"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <HeroSection />

        {/* TryHackMe section */}
        <ScrollReveal delay={100}>
          <section className="rice-section w-full">
            <div className="max-w-6xl mx-auto acrylic-card p-0">
              <TryHackMeTracker />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={150} className="w-full">
          <CapabilitiesSection />
        </ScrollReveal>

        <ScrollReveal delay={200} className="w-full">
          <AchievementGallery />
        </ScrollReveal>

        <ScrollReveal delay={250} className="w-full">
          <Footer />
        </ScrollReveal>
      </main>
    </div>
  );
}

export default App;