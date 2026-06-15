import React, { useState } from 'react';
import { Zap, Shield, Lock } from 'lucide-react';
import { profileData } from '../../lib/profileData';

const iconMap = {
  'Zap': Zap,
  'Shield': Shield,
  'Lock': Lock,
};

export const AchievementGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      'Learning Paths': 'from-blue-500/20 to-cyan-500/20',
    };
    return colors[category] || 'from-gray-600/20 to-gray-700/20';
  };

  return (
    <section className="py-20 px-8 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 font-mono">
            <span className="text-cyber-lime">[03]</span> ACHIEVEMENT GALLERY
          </h2>
          <p className="text-gray-500 font-mono text-sm">Verified credentials and completed pathways</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {profileData.achievements.map((badge, idx) => {
            const IconComponent = iconMap[badge.icon] || Lock;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative bg-gradient-to-br ${getCategoryColor(
                  badge.category
                )} border border-cyber-lime/20 rounded-lg p-6 transition-all duration-300 cursor-pointer group hover:border-cyber-lime/60 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]`}
              >
                {/* Badge Icon */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-cyber-lime/40 flex items-center justify-center bg-obsidian/50 group-hover:border-cyber-lime/80 group-hover:bg-obsidian/80 transition-all">
                      <IconComponent
                        className="w-10 h-10 text-cyber-lime"
                        strokeWidth={1.5}
                      />
                    </div>
                    {hoveredIndex === idx && (
                      <div className="absolute inset-0 rounded-full border-2 border-cyber-lime/60 animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Badge Info */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-white mb-1">{badge.name}</h3>
                  <p className="text-xs text-gray-500 font-mono mb-3">{badge.issuer}</p>

                  {/* Tooltip on Hover */}
                  {hoveredIndex === idx && (
                    <div className="absolute inset-0 rounded-lg bg-obsidian/95 border border-cyber-lime/40 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
                      <p className="text-xs text-cyber-lime font-mono mb-2 uppercase tracking-widest">
                        {badge.fullName}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        Earned: {badge.earned}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
