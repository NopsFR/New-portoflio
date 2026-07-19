import { useState, useEffect, useCallback } from 'react';
import { profileData } from '../../lib/profileData';

const navIcons = {
  '01': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7"/>
    </svg>
  ),
  '02': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
    </svg>
  ),
  '03': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.5 12l2 2 4-4"/>
    </svg>
  ),
};

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('bio');
  const [hoveredItem, setHoveredItem] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(() => {
    const sections = profileData.sections;
    for (let section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const accentColor = 'var(--color-accent)';

  return (
    <>
      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around py-3 px-4"
        style={{
          backgroundColor: 'rgba(11,12,16,0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--color-accent-dim)',
        }}
      >
        {profileData.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="flex flex-col items-center gap-1 transition-all duration-300"
            style={{
              color: activeSection === section.id
                ? accentColor
                : 'var(--color-muted)',
              transform: activeSection === section.id ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <div
              className="transition-transform duration-300"
              style={{ transform: activeSection === section.id ? 'scale(1.1)' : 'scale(1)' }}
            >
              {navIcons[section.number] || (
                <span className="font-mono text-xs font-bold">{section.number}</span>
              )}
            </div>
            <span className="text-[9px] font-mono font-bold tracking-wider">
              {section.name.split(' ')[0]}
            </span>
            {activeSection === section.id && (
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: '0 0 6px rgba(102,252,241,0.6)',
                }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Desktop right side nav */}
      <nav
        className="hidden md:flex fixed right-0 top-0 h-screen w-20 flex-col items-center justify-center gap-10 z-40 px-2"
        style={{
          backgroundColor: 'rgba(11,12,16,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderLeft: '1px solid var(--color-accent-dim)',
        }}
      >
        {profileData.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredItem(section.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex flex-col items-center gap-2 transition-all duration-300 group relative"
            style={{
              color: activeSection === section.id
                ? accentColor
                : 'var(--color-muted)',
              filter: activeSection === section.id
                ? 'drop-shadow(0 0 10px rgba(102,252,241,0.5))'
                : 'none',
            }}
            title={section.name}
          >
            {/* Active indicator line */}
            {activeSection === section.id && (
              <div
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full animate-pulse"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: '0 0 8px rgba(102,252,241,0.6)',
                }}
              />
            )}

            {/* Hover glow */}
            {hoveredItem === section.id && activeSection !== section.id && (
              <div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                style={{ backgroundColor: 'var(--color-accent-dim)' }}
              />
            )}

            <div
              className="transition-transform duration-300"
              style={{
                transform: activeSection === section.id
                  ? 'scale(1.1)'
                  : 'scale(1)',
              }}
            >
              <div className="font-mono text-xs font-bold mb-1 text-center">
                {section.number}
              </div>
              <div className="flex flex-col items-center gap-0.5">
                {section.name.split('').map((char, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] font-bold leading-none"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </>
  );
};