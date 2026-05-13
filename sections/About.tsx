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
                      Cybersecurity Enthusiast & Developer
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      I'm passionate about cybersecurity and hands-on learning through TryHackMe. 
                      I've completed 42 rooms covering everything from basic Linux commands to 
                      full penetration testing methodologies. What started as curiosity about 
                      how hackers think has turned into a genuine obsession with understanding 
                      vulnerabilities, exploitation techniques, and how to build more secure 
                      applications from the ground up.
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
                      TryHackMe Progress & Achievements
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      My journey through TryHackMe has been incredible. I've gone from 
                      knowing nothing about cybersecurity to completing rooms on network 
                      scanning, web application exploitation, privilege escalation, and 
                      even some reverse engineering. Every room teaches something new — 
                      whether it's using Nmap to discover open ports, exploiting SQL 
                      injection vulnerabilities, or understanding how Active Directory 
                      attacks work. I've earned badges for completing learning paths, 
                      maintained a 12-day streak, and accumulated over 12,500 XP through 
                      consistent daily practice. Currently at Level 15 with 42 rooms 
                      completed, and I'm working through the "Complete Beginner to Advanced" 
                      learning path while preparing for my OSCP certification.
                    </p>
                  </div>
                </div>
              </div>

              {/* THM Rooms Completed */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Terminal className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Key Rooms Completed
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'Linux Fundamentals', desc: 'Mastered basic Linux commands, file permissions, and system navigation' },
                        { name: 'Intro to Networking', desc: 'Learned OSI model, TCP/IP, subnetting, and network protocols' },
                        { name: 'OWASP Top 10', desc: 'Studied the most critical web application security risks and how to exploit them' },
                        { name: 'Nmap Live Host Discovery', desc: 'Hands-on experience with network scanning and host enumeration' },
                        { name: 'Metasploit Introduction', desc: 'Learned exploitation framework for penetration testing' },
                        { name: 'Burp Suite Basics', desc: 'Web application security testing with the industry-standard proxy tool' },
                      ].map((room, index) => (
                        <motion.div
                          key={room.name}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            <div>
                              <div className="text-white font-medium">{room.name}</div>
                              <div className="text-sm text-gray-500">{room.desc}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Learned */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Target className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Technical Skills from TryHackMe
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Through hands-on labs and real-world scenarios, I've developed practical 
                      skills in various areas of cybersecurity. These aren't just theoretical — 
                      I've actually used these tools and techniques in guided exercises.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'Linux & Bash', level: 85, desc: 'Command line, scripting, file permissions' },
                        { name: 'Network Scanning', level: 75, desc: 'Nmap, host discovery, port scanning' },
                        { name: 'Web Exploitation', level: 70, desc: 'SQLi, XSS, CSRF, directory traversal' },
                        { name: 'Privilege Escalation', level: 60, desc: 'Linux & Windows escalation techniques' },
                        { name: 'Cryptography Basics', level: 55, desc: 'Encryption, hashing, encoding' },
                        { name: 'Reverse Engineering', level: 40, desc: 'Basic binary analysis, Ghidra' },
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
                          <div className="text-xs text-gray-500 mb-1">{skill.desc}</div>
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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Flame className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      What I'm Working On Now
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Completing the "Complete Beginner to Advanced" learning 
                          path on TryHackMe — currently working through intermediate 
                          penetration testing modules
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Practicing Active Directory exploitation — learning how 
                          Kerberos attacks work and how to pivot through networks
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Building secure web applications by applying what I've 
                          learned about vulnerabilities — writing code that's 
                          resistant to OWASP Top 10 attacks
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-400">
                        <span className="text-violet-500 mt-1">→</span>
                        <span>
                          Preparing for OSCP certification — practicing on 
                          HackTheBox and doing additional penetration testing 
                          labs outside of TryHackMe
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
