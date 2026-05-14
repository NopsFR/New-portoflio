'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Palette,
  Shield,
  Terminal,
  GitBranch,
  Rocket,
} from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'],
    gradient: 'from-violet-600 to-purple-500',
  },
  {
    icon: Palette,
    title: 'Styling & Animation',
    skills: ['Tailwind CSS', 'Framer Motion', 'CSS Animations', 'Responsive Design'],
    gradient: 'from-cyan-600 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    skills: ['TryHackMe', 'OWASP Top 10', 'Network Security', 'Pen Testing Basics'],
    gradient: 'from-emerald-600 to-teal-500',
  },
  {
    icon: Terminal,
    title: 'Tools & Environment',
    skills: ['VS Code', 'Git', 'GitHub', 'Node.js', 'npm/yarn'],
    gradient: 'from-orange-600 to-amber-500',
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    skills: ['Git Workflows', 'Branch Management', 'Pull Requests', 'Code Review'],
    gradient: 'from-pink-600 to-rose-500',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    skills: ['Vercel', 'GitHub Pages', 'Static Site Generation', 'CI/CD Basics'],
    gradient: 'from-indigo-600 to-violet-500',
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto relative z-10">
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
              Technologies <span className="gradient-text">& Tools</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Tools and technologies I work with — some I use every day, others I'm still getting comfortable with
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 group"
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {category.title}
                  </h3>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}