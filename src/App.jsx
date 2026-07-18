import { useEffect, useRef, useState } from 'react';
import {
  HeroSection,
  TryHackMeTracker,
  CapabilitiesSection,
  AchievementGallery,
  SideNav,
  Footer,
} from './components/cipher';
import { MatrixRain, ParticleField, CyberCursor } from './components/vfx';

function ScrollReveal({ children, className = '', direction = 'up', delay = 0, threshold = 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const dirClass = direction === 'left' ? 'reveal-on-scroll-left' :
                   direction === 'right' ? 'reveal-on-scroll-right' :
                   'reveal-on-scroll';

  return (
    <div ref={ref} className={`${dirClass} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="bg-obsidian text-white overflow-x-hidden relative">
      {/* Cyberpunk Cursor */}
      <CyberCursor enabled={true} />

      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.06} density={0.02} speed={0.7} />

      {/* Interactive Particle Field */}
      <ParticleField particleCount={60} opacity={0.4} maxDistance={130} />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff41" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
      </div>

      {/* Moving scanline */}
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.08]">
        <div
          className="absolute w-full h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
            animation: 'scanline 8s linear infinite',
          }}
        />
      </div>

      {/* Navigation */}
      <SideNav />

      {/* Main Content */}
      <main className="md:mr-20 relative z-10">
        <HeroSection />

        {/* TryHackMe Stats */}
        <ScrollReveal direction="up" delay={100}>
          <section className="py-20 px-8 bg-obsidian/50">
            <div className="max-w-6xl mx-auto">
              <TryHackMeTracker />
            </div>
          </section>
        </ScrollReveal>

        {/* Capabilities & Skills */}
        <ScrollReveal direction="up" delay={200}>
          <CapabilitiesSection />
        </ScrollReveal>

        {/* Credentials / Achievement Gallery */}
        <ScrollReveal direction="up" delay={300}>
          <AchievementGallery />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <ScrollReveal direction="up" delay={400}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default App;