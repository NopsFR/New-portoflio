import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { profileData } from '../../lib/profileData';

export const CapabilitiesSection = () => {
  return (
    <section id="arsenal" className="py-20 px-8 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 font-mono">
            <span className="text-cyber-lime">[02]</span> OPERATIONAL CAPABILITIES
          </h2>
          <p className="text-gray-500 font-mono text-sm">Offensive security expertise and threat vectors</p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {profileData.capabilities.map((capability, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-cyber-dark border border-cyber-lime/20 rounded p-4 hover:border-cyber-lime/60 transition-all duration-300 group cursor-default"
            >
              <CheckCircle2 className="w-5 h-5 text-cyber-lime flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {capability}
              </span>
            </div>
          ))}
        </div>

        {/* Skill Categories */}
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
