'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Award, Target, Flame, Trophy, Shield, BookOpen, Clock, ArrowUpRight, Zap, Medal } from 'lucide-react';
import Button from '@/components/ui/Button';

// TODO: Update these values with your actual TryHackMe stats
const thmStats = {
  username: 'Oscar.Senior',
  profileUrl: 'https://tryhackme.com/p/Oscar.Senior',
  level: 15, // Update with your level
  xp: 12500, // Update with your total XP
  rank: 45000, // Update with your global rank
  streak: 12, // Update with your current streak
  roomsCompleted: 42, // Update with rooms completed
  pathsCompleted: 1, // Update with learning paths completed
};

const achievements = [
  // TODO: Add your actual TryHackMe badges/achievements
  { name: 'Resident Evil', icon: '🏆', description: 'Completed a full learning path' },
  { name: 'Bug Hunter', icon: '🐛', description: 'Found and reported vulnerabilities' },
  { name: '10 Day Streak', icon: '🔥', description: 'Maintained a 10 day learning streak' },
  { name: 'Network Defender', icon: '🛡️', description: 'Completed network security rooms' },
  { name: 'Web Exploiter', icon: '🌐', description: 'Mastered web application security' },
  { name: 'Script Kiddie', icon: '💻', description: 'Completed scripting challenges' },
];

const skills = [
  // TODO: Update with skills you've learned from TryHackMe
  { name: 'Linux Fundamentals', progress: 85 },
  { name: 'Network Security', progress: 70 },
  { name: 'Web Application Security', progress: 75 },
  { name: 'Penetration Testing', progress: 60 },
  { name: 'Cryptography', progress: 55 },
  { name: 'Reverse Engineering', progress: 40 },
];

const recentRooms = [
  // TODO: Add rooms you've recently completed
  { name: 'Linux Fundamentals', category: 'Fundamentals', completed: true },
  { name: 'Intro to Networking', category: 'Network Security', completed: true },
  { name: 'OWASP Top 10', category: 'Web Security', completed: true },
  { name: 'Nmap', category: 'Tools', completed: true },
  { name: 'Metasploit', category: 'Tools', completed: false },
  { name: 'Burp Suite', category: 'Web Security', completed: false },
];

export default function THMProgress() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="thm" className="section-padding relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
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
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center glow-primary"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="text-white" size={32} />
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              TryHackMe <span className="gradient-text">Progress</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Tracking my cyber security learning journey through hands-on challenges and rooms
            </p>
            <motion.a
              href={thmStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-300 transition-colors"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              View Full Profile <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

          {/* Stats Grid - Enhanced with animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Target, label: 'Level', value: thmStats.level, color: 'from-violet-600 to-purple-500', suffix: '' },
              { icon: Zap, label: 'Total XP', value: thmStats.xp.toLocaleString(), color: 'from-cyan-600 to-blue-500', suffix: ' XP' },
              { icon: Flame, label: 'Day Streak', value: `${thmStats.streak}`, color: 'from-orange-600 to-amber-500', suffix: ' days' },
              { icon: Trophy, label: 'Rooms Done', value: thmStats.roomsCompleted, color: 'from-emerald-600 to-teal-500', suffix: ' rooms' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative overflow-hidden glass-card rounded-xl p-6 text-center group"
                whileHover={{
                  y: -5,
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.15)',
                }}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.color} opacity-10`} />
                </div>
                
                <div className="relative">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-white" size={24} />
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-white mb-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Progress - Enhanced with animated bars */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <Medal className="text-violet-500" size={28} />
              </motion.div>
              Skills Developed
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-violet-400 font-mono">{skill.progress}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements - Enhanced with staggered animation */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Trophy className="text-amber-500" size={28} />
              </motion.div>
              Achievements & Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  className="glass-card rounded-xl p-4 text-center group cursor-pointer"
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                    borderColor: 'rgba(251, 191, 36, 0.5)',
                    boxShadow: '0 10px 30px rgba(251, 191, 36, 0.15)',
                  }}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 180 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.8 + index * 0.08 
                  }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="text-sm font-medium text-white mb-1">{achievement.name}</div>
                  <div className="text-xs text-gray-500">{achievement.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Rooms - Enhanced with status indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -180 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="text-cyan-500" size={28} />
              </motion.div>
              Recent Rooms
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentRooms.map((room, index) => (
                <motion.div
                  key={room.name}
                  className="glass-card rounded-xl p-4 flex items-center justify-between group cursor-pointer"
                  whileHover={{
                    scale: 1.03,
                    x: 5,
                    borderColor: room.completed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)',
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                >
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-violet-300 transition-colors">
                      {room.name}
                    </div>
                    <div className="text-sm text-gray-500">{room.category}</div>
                  </div>
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      room.completed 
                        ? 'bg-emerald-500/20 text-emerald-500' 
                        : 'bg-amber-500/20 text-amber-500'
                    }`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    {room.completed ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA - Enhanced */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(thmStats.profileUrl, '_blank', 'noopener,noreferrer')}
                className="group"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ExternalLink size={20} className="mr-2" />
                </motion.span>
                View Full TryHackMe Profile
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}