import React, { useState, useEffect } from 'react';
import { profileData } from '../../lib/profileData';

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('bio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = profileData.sections;
      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-0 top-0 h-screen w-20 bg-obsidian border-l border-cyber-lime/20 flex-col items-center justify-center gap-12 z-40 px-2 hidden md:flex">
      {profileData.sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 group ${
            activeSection === section.id
              ? 'text-cyber-lime drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]'
              : 'text-gray-500 hover:text-cyber-lime/70'
          }`}
          title={section.name}
        >
          <div className="font-mono text-xs font-bold">{section.number}</div>
          <div className="font-mono text-xs font-bold leading-tight tracking-wider text-center whitespace-pre-line">
            {section.name.split('').join('\n')}
          </div>
        </button>
      ))}
    </nav>
  );
};
