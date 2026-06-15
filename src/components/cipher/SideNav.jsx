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
    <nav className="fixed right-0 top-0 h-screen w-16 bg-obsidian border-l border-cyber-lime/20 flex flex-col items-center justify-center gap-8 z-40">
      {profileData.sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`writing-mode-vertical transform -rotate-90 text-xs font-mono font-bold tracking-widest transition-all duration-300 ${
            activeSection === section.id
              ? 'text-cyber-lime drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]'
              : 'text-gray-500 hover:text-cyber-lime/70'
          }`}
        >
          <span className="inline-block">{section.number}_{section.name}</span>
        </button>
      ))}
    </nav>
  );
};
