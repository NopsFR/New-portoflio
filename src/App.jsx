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

function ScrollReveal({ children, className = '', delay = 0 }) {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-on-scroll ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="relative text-white overflow-x-hidden" style={{ background: '#050505' }}>
      {/* Full-site Matrix rain background */}
      <MatrixRain opacity={0.04} speed={0.6} />

      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.025 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0L0 0 0 50" fill="none" stroke="#00ff41" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
      </div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.03 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}/>
      </div>

      {/* Cyberpunk crosshair cursor */}
      <CyberCursor enabled={true} />

      {/* Interactive particle field — low density for smoothness */}
      <ParticleField particleCount={40} opacity={0.25} maxDistance={110} />

      {/* Navigation */}
      <SideNav />

      {/* Main Content */}
      <main className="md:mr-20 relative z-10">
        <HeroSection />

        <ScrollReveal delay={100}>
          <section className="py-20 px-6 md:px-8" style={{ background: 'transparent' }}>
            <div className="max-w-6xl mx-auto">
              <TryHackMeTracker />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <CapabilitiesSection />
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <AchievementGallery />
        </ScrollReveal>
      </main>

      <ScrollReveal delay={400}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default App;