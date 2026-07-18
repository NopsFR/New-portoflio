import { useEffect, useRef, useState } from 'react';
import {
  HeroSection,
  TryHackMeTracker,
  CapabilitiesSection,
  AchievementGallery,
  SideNav,
  Footer,
} from './components/cipher';
import { MatrixRain } from './components/vfx';

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
    <div className="relative text-white overflow-x-hidden min-h-screen" style={{ background: '#050505' }}>
      {/* Full-screen Matrix rain — single canvas, zIndex 0 */}
      <MatrixRain opacity={0.05} speed={0.6} />

      {/* CRT scanline overlay — pure CSS, no canvas */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.04,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <SideNav />

      <main className="md:mr-20 relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <ScrollReveal delay={100}>
          <section className="py-20 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <TryHackMeTracker />
            </div>
          </section>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <CapabilitiesSection />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <AchievementGallery />
        </ScrollReveal>
      </main>

      <ScrollReveal delay={250}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default App;