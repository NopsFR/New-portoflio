'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Globe, ArrowRight, Code, Shield, Layout, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const projects = [
  {
    title: 'Modern Portfolio Website',
    description: 'A premium portfolio built with Next.js, TypeScript, and Tailwind CSS. Features smooth Framer Motion animations, glassmorphism design, and fully responsive layouts. Deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    icon: Layout,
    gradient: 'from-violet-600 to-purple-500',
    liveUrl: 'https://github.com/bigst',
    githubUrl: 'https://github.com/bigst',
  },
  {
    title: 'Secure Auth System',
    description: 'A full-stack authentication system implementing JWT tokens, refresh tokens, rate limiting, and protection against common attacks like SQL injection and XSS.',
    tags: ['Node.js', 'Express', 'JWT', 'bcrypt', 'Security'],
    icon: Shield,
    gradient: 'from-cyan-600 to-blue-500',
    liveUrl: 'https://github.com/bigst',
    githubUrl: 'https://github.com/bigst',
  },
  {
    title: 'Animated Landing Page',
    description: 'An experimental landing page focused on micro-interactions and scroll-triggered animations. Exploring the limits of Framer Motion and CSS animations.',
    tags: ['React', 'Framer Motion', 'CSS', 'GSAP'],
    icon: Sparkles,
    gradient: 'from-emerald-600 to-teal-500',
    liveUrl: 'https://github.com/bigst',
    githubUrl: 'https://github.com/bigst',
  },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleLiveClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGithubClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="work" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-64 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
              Projects <span className="gradient-text">& Experiments</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              A collection of projects I've built while learning frontend development and cybersecurity
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                    {/* Icon Header */}
                    <div className="relative p-6 pb-0">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-white" size={28} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 flex-1 leading-relaxed text-sm">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLiveClick(project.liveUrl)}
                          className="flex-1 text-sm"
                        >
                          <Globe size={14} className="mr-2" />
                          Demo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleGithubClick(project.githubUrl)}
                          className="text-sm"
                        >
                          <Code size={14} className="mr-2" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-gray-500 mb-6">
              I'm always working on new projects and experiments. 
              Check out my GitHub for more.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleGithubClick('https://github.com/bigst')}
            >
              <ExternalLink size={20} className="mr-2" />
              View GitHub Profile
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}