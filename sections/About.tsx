'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Shield, Sparkles } from 'lucide-react';

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
                      Learning Cybersecurity
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      I'm actively learning cybersecurity through TryHackMe, 
                      working through rooms on penetration testing, networking, 
                      and security fundamentals. I want to understand how systems 
                      can be broken so I can build them more securely. It's a 
                      different way of thinking, and I love the challenge.
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Focus */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center flex-shrink-0">
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