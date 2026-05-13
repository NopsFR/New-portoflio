'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Shield, Sparkles, Terminal, Award, Target, Trophy, Flame, Zap } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Intro */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Code2 className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Frontend Developer
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      I build modern, polished web interfaces using React, Next.js, 
                      and Tailwind CSS. I care deeply about the details — smooth 
                      animations, responsive layouts, and clean visual design. 
                      When I'm coding, I'm usually thinking about how to make 
                      things feel better for the user.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cybersecurity Journey */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Cybersecurity Journey on TryHackMe
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      I'm actively learning cybersecurity through TryHackMe, 
                      working through rooms on penetration testing, networking, 
                      and security fundamentals. I want to understand how systems 
                      can be broken so I can build them more securely.
                    </p>
                    
                    {/* THM Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <motion.div 
                        className="p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-violet-400">15</div>
                        <div className="text-sm text-gray-500">Level</div>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded-xl bg-cyan-600/10 border border-cyan-500/20 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-cyan-400">12,500</div>
                        <div className="text-sm text-gray-500">Total XP</div>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded-xl bg-orange-600/10 border border-orange-500/20 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-orange-400">12</div>
                        <div className="text-sm text-gray-500">Day Streak</div>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-emerald-400">42</div>
                        <div className="text-sm text-gray-500">Rooms Done</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Learned */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Terminal className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Skills I've Developed
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'Linux Fundamentals', level: 85 },
                        { name: 'Network Security', level: 70 },
                        { name: 'Web App Security', level: 75 },
                        { name: 'Penetration Testing', level: 60 },
                        { name: 'Cryptography', level: 55 },
                        { name: 'Reverse Engineering', level: 40 },
                      ].map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-violet-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Focus */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      What I'm Focused On
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Building better animations and micro-interactions 
                          with Framer Motion
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Improving my TypeScript skills and writing more 
                          type-safe code
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Completing TryHackMe rooms and learning security 
                          fundamentals
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Experimenting with Next.js 13+ features and 
                          modern deployment workflows
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
