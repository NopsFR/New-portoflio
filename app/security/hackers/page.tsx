import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

const hackerTypes = [
  {
    name: 'White Hat',
    icon: '🤍',
    color: 'from-emerald-500 to-green-500',
    description: 'The good guys of the cyber world. White hat hackers use their skills ethically to help organizations find and fix security vulnerabilities before the bad guys can exploit them.',
    fullDescription: `Think of white hats as digital security guards. They're hired by companies to break into their systems legally, find weaknesses, and report them so they can be fixed. Many work as penetration testers, security researchers, or as part of "red teams" that simulate attacks.

These hackers often have certifications like CEH (Certified Ethical Hacker) or OSCP (Offensive Security Certified Professional). They follow a strict code of ethics and always get permission before testing systems.

Some white hats work independently, participating in bug bounty programs where companies pay them to find vulnerabilities. Others are full-time employees protecting their organization's digital assets.`,
    examples: [
      { name: 'Security Researchers', desc: 'Find and report vulnerabilities responsibly' },
      { name: 'Penetration Testers', desc: 'Get paid to hack into systems legally' },
      { name: 'Red Team Members', desc: 'Simulate real-world attacks to test defenses' },
      { name: 'Bug Bounty Hunters', desc: 'Find bugs for rewards on platforms like HackerOne' },
    ],
  },
  {
    name: 'Black Hat',
    icon: '🖤',
    color: 'from-red-500 to-rose-500',
    description: 'The criminals of cyberspace. Black hat hackers break into systems illegally for personal gain, to steal data, cause damage, or for malicious purposes.',
    fullDescription: `Black hat hackers are the ones you see in the news. They break into systems without permission, steal sensitive data, deploy ransomware, or cause chaos for fun or profit. Their activities are entirely illegal and can result in serious prison time.

These hackers might sell stolen data on the dark web, hold companies hostage with ransomware, or steal intellectual property. Some work alone, while others are part of organized cybercrime groups or even state-sponsored teams.

Common black hat activities include phishing scams, creating malware, credit card fraud, and attacking critical infrastructure. They often exploit human psychology (social engineering) just as much as technical vulnerabilities.`,
    examples: [
      { name: 'Cybercriminals', desc: 'Steal data and money for personal gain' },
      { name: 'Ransomware Operators', desc: 'Encrypt data and demand payment' },
      { name: 'State-Sponsored Hackers', desc: 'Attack on behalf of governments' },
      { name: 'Hacktivists (malicious)', desc: 'Attack for political or ideological reasons' },
    ],
  },
  {
    name: 'Grey Hat',
    icon: '💜',
    color: 'from-purple-500 to-indigo-500',
    description: 'Operating in the moral grey area between white and black. Grey hats may break into systems without permission but typically expose vulnerabilities publicly rather than exploiting them for personal gain.',
    fullDescription: `Grey hat hackers are the rebels of the security world. They might hack into systems without permission (which is illegal), but instead of stealing data or causing damage, they'll often publicly expose the vulnerability to force the company to fix it.

The ethics here are debatable. On one hand, they're helping improve security. On the other, they're breaking the law and potentially exposing users to risk by revealing vulnerabilities before patches are available.

Some grey hats started as black hats who changed their ways. Others genuinely believe their actions serve the greater good, even if the methods are questionable. Many have been arrested despite their "good intentions."`,
    examples: [
      { name: 'Vulnerability Researchers', desc: 'Find and sometimes publicly disclose flaws' },
      { name: 'Hacktivists', desc: 'Hack for political or social causes' },
      { name: 'Security Journalists', desc: 'Expose security issues through investigation' },
      { name: 'Reformed Black Hats', desc: 'Former criminals now using skills ethically' },
    ],
  },
];

export default function HackersPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <div className="relative z-10 pt-24 pb-32">
        <div className="container-custom mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Link
              href="/security"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Security Hub
            </Link>
            
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center glow-primary"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="text-white" size={40} />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Types of <span className="gradient-text">Hackers</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Not all hackers are criminals. Understanding the different types helps you 
              grasp the complex world of cybersecurity and the people who shape it.
            </p>
          </motion.div>

          {/* Hacker Type Cards */}
          <div className="max-w-5xl mx-auto space-y-16">
            {hackerTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card rounded-3xl p-8 md:p-12"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="text-6xl flex-shrink-0">{type.icon}</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {type.name}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {type.fullDescription}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {type.examples.map((example) => (
                    <motion.div
                      key={example.name}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                      whileHover={{ 
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        x: 5 
                      }}
                    >
                      <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <div className="text-white font-medium">{example.name}</div>
                        <div className="text-sm text-gray-500">{example.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/security"
                className="px-6 py-3 rounded-xl glass-card hover:border-violet-500/50 transition-colors text-violet-400 hover:text-violet-300"
              >
                ← Security Hub
              </Link>
              <Link
                href="/security/roles"
                className="px-6 py-3 rounded-xl glass-card hover:border-violet-500/50 transition-colors text-violet-400 hover:text-violet-300"
              >
                Career Roles →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}