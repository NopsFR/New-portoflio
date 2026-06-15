import React from 'react';
import { profileData } from '../../lib/profileData';

export const TechArsenal = () => {
  return (
    <section className="py-20 px-8 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 font-mono">
            <span className="text-cyber-lime">[02]</span> TECHNICAL ARSENAL
          </h2>
          <p className="text-gray-500 font-mono text-sm">Core capabilities and threat vectors</p>
        </div>

        <div className="space-y-8">
          {Object.entries(profileData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-mono text-cyber-lime uppercase tracking-widest mb-4">
                ╭─ {category}
              </h3>

              <div className="flex flex-wrap gap-3 pl-4 border-l border-cyber-lime/30">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="font-mono text-xs px-3 py-2 bg-cyber-dark border border-cyber-lime/40 rounded text-cyber-lime hover:bg-cyber-lime hover:text-obsidian transition-all duration-200 cursor-default group relative"
                  >
                    <kbd className="hidden group-hover:inline">⌘</kbd>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
