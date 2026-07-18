import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { profileData } from '../../lib/profileData';
import { DecryptText } from '../vfx';

const CATEGORY_DESCRIPTIONS = {
  "Offensive Security": "Hands-on exploitation — breaking into systems with permission, simulating adversary behaviour, building custom payloads, and leveraging social engineering to bypass technical controls.",
  "Post-Exploitation": "Staying quiet after initial access. Lateral movement, privilege escalation, persistence, evasion, and data exfiltration across hardened environments.",
  "Systems & Infrastructure": "Linux hardening, Windows internals, Active Directory attack paths. If you don't understand the infrastructure you're targeting, you're guessing.",
  "Core Technical": "Bash and Python automation, HTTP/DNS internals, network fundamentals, web application security, reverse engineering — the fundamentals I lean on daily."
};

export const CapabilitiesSection = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <section id="arsenal" className="py-24 px-6 md:px-8 w-full" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-mono font-bold mb-2" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-white)' }}>
            <span style={{ color: 'var(--color-accent)' }}>[02]</span>{' '}
            <DecryptText text="OPERATIONAL CAPABILITIES" />
          </h2>
          <p className="font-mono" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
            <DecryptText text="Offensive security expertise and threat vectors" />
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
          {profileData.capabilities.map((capability, idx) => (
            <div
              key={idx}
              data-hover-brackets
              className="flex items-start gap-4 rounded p-5 transition-all duration-100 cursor-default"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span className="font-mono flex-shrink-0 mt-0.5" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>▶</span>
              <span className="font-mono leading-relaxed" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                {capability}
              </span>
            </div>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="space-y-10">
          {Object.entries(profileData.skills).map(([category, skills]) => {
            const isExpanded = expandedCategories[category];
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  data-hover-brackets
                  className="w-full flex items-center gap-3 font-mono uppercase tracking-widest mb-5 text-left transition-colors duration-100 cursor-pointer"
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}
                >
                  <span className="flex-shrink-0 transition-transform"
                    style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                  {category}
                </button>

                {isExpanded && CATEGORY_DESCRIPTIONS[category] && (
                  <div className="mb-4 pl-8 font-mono leading-relaxed rounded p-4"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-muted)',
                      border: '1px solid var(--color-accent-ghost)',
                      backgroundColor: 'rgba(0,255,65,0.02)',
                      borderRadius: 'var(--radius-md)',
                    }}>
                    {CATEGORY_DESCRIPTIONS[category]}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pl-6" style={{ borderLeft: '1px solid var(--color-accent-dim)' }}>
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      data-hover-brackets
                      className="font-mono px-4 py-2.5 rounded cursor-default transition-colors duration-75"
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-accent)',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid rgba(0,255,65,0.15)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
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