import { useEffect, useRef, useState } from 'react';
import {
  HeroSection,
  TryHackMeTracker,
  CapabilitiesSection,
  AchievementGallery,
  SideNav,
  Footer,
} from './components/cipher';
import { TerminalBackground } from './components/vfx';

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
    <div className="relative text-white overflow-x-hidden min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Single-canvas background: matrix rain + particle web + scanline sweep */}
      <TerminalBackground opacity={0.06} />

      <SideNav />

      <main className="md:mr-20 relative flex flex-col items-center" style={{ zIndex: 'var(--z-content)' }}>
        <HeroSection />
        <ScrollReveal delay={100}>
          <section className="py-20 px-6 md:px-8 w-full">
            <div className="max-w-6xl mx-auto">
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