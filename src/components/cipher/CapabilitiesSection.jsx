import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { profileData } from '../../lib/profileData';

const categoryDescriptions = {
  "Offensive Security": "The bread and butter of what I do. Covers hands-on exploitation work — breaking into systems with permission, simulating adversary behaviour, building custom payloads, and understanding how social engineering preys on human psychology to bypass even the strongest technical controls.",
  "Post-Exploitation": "Once you're in, the real work begins. This is about staying quiet, moving laterally through a network, escalating from a basic user shell to domain admin, dodging detection, planting persistence so you can get back in later, and pulling data out without anyone noticing.",
  "Systems & Infrastructure": "Knowing the terrain. Linux hardening, Windows internals, Active Directory attack paths, and mapping out networks before you touch anything. If you don't understand the infrastructure you're targeting, you're just guessing.",
  "Core Technical": "The fundamentals I lean on every day. Bash and Python for automation and tooling, understanding how HTTP and DNS actually work under the hood, solid network knowledge, web application security from both sides, and reverse engineering to figure out what a binary is actually doing."
};

export const CapabilitiesSection = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

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

        {/* Skill Categories with Dropdowns */}
        <div className="space-y-8">
          {Object.entries(profileData.skills).map(([category, skills]) => {
            const isExpanded = expandedCategories[category];
            return (
              <div key={category}>
                {/* Clickable Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-2 text-sm font-mono text-cyber-lime uppercase tracking-widest mb-4 hover:text-white transition-colors cursor-pointer group"
                >
                  <span className="flex-shrink-0 transition-transform duration-200">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:text-white" />}
                  </span>
                  <span>╭─ {category}</span>
                </button>

                {/* Description (Dropdown) */}
                {isExpanded && categoryDescriptions[category] && (
                  <div className="mb-3 pl-8 text-xs text-gray-400 font-mono leading-relaxed bg-cyber-dark/50 border border-cyber-lime/10 rounded p-3">
                    {categoryDescriptions[category]}
                  </div>
                )}

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
            );
          })}
        </div>
      </div>
    </section>
  );
};
