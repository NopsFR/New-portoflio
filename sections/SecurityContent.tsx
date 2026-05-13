'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Lock,
  Eye,
  Key,
  AlertTriangle,
  CheckCircle,
  EyeOff,
  Database,
  Wifi,
  Terminal,
  BookOpen,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Hacker Types Data
const hackerTypes = [
  {
    name: 'White Hat',
    icon: '🤍',
    color: 'from-emerald-500 to-green-500',
    description: 'Ethical hackers who use their skills to protect systems. They work with organizations to find and fix vulnerabilities before malicious actors can exploit them.',
    examples: ['Security Researchers', 'Penetration Testers', 'Red Team Members'],
  },
  {
    name: 'Black Hat',
    icon: '🖤',
    color: 'from-red-500 to-rose-500',
    description: 'Malicious hackers who break into systems for personal gain, to steal data, or cause damage. They operate illegally and often sell exploits on the dark web.',
    examples: ['Cybercriminals', 'Data Thieves', 'Ransomware Operators'],
  },
  {
    name: 'Grey Hat',
    icon: '💜',
    color: 'from-purple-500 to-indigo-500',
    description: 'Hackers who operate in a moral grey area. They may break into systems without permission but typically disclose vulnerabilities publicly rather than exploiting them.',
    examples: ['Vulnerability Researchers', 'Hacktivists', 'Bug Bounty Hunters'],
  },
];

// Cybersecurity Roles Data
const cyberRoles = [
  {
    category: 'Security Roles',
    roles: [
      { name: 'Security Analyst', description: 'Monitors systems for breaches and responds to incidents' },
      { name: 'Penetration Tester', description: 'Ethically hacks systems to find vulnerabilities' },
      { name: 'Security Architect', description: 'Designs secure systems and security infrastructure' },
      { name: 'CISO', description: 'Executive responsible for organization-wide security strategy' },
      { name: 'Incident Responder', description: 'Handles and mitigates security breaches' },
      { name: 'Forensics Analyst', description: 'Investigates cybercrimes and collects digital evidence' },
    ],
  },
  {
    category: 'Developer Roles',
    roles: [
      { name: 'Security Engineer', description: 'Builds security tools and secure infrastructure' },
      { name: 'DevSecOps Engineer', description: 'Integrates security into CI/CD pipelines' },
      { name: 'Application Security Engineer', description: 'Focuses on securing software applications' },
      { name: 'Cryptography Engineer', description: 'Implements encryption and security protocols' },
      { name: 'Security Software Developer', description: 'Creates security-focused software solutions' },
      { name: 'Cloud Security Engineer', description: 'Secures cloud infrastructure and services' },
    ],
  },
];

// Online Safety Tips
const safetyTips = [
  {
    icon: Key,
    title: 'Strong Passwords',
    description: 'Use unique, complex passwords for each account. Consider a password manager to keep track of them.',
    tips: ['12+ characters', 'Mix of letters, numbers, symbols', 'No dictionary words', 'Unique per account'],
  },
  {
    icon: Lock,
    title: 'Two-Factor Authentication',
    description: 'Enable 2FA everywhere possible. Even if your password is compromised, attackers cannot access your account.',
    tips: ['Use authenticator apps', 'Hardware keys (YubiKey)', 'Avoid SMS when possible', 'Backup codes stored safely'],
  },
  {
    icon: Eye,
    title: 'Privacy Settings',
    description: 'Regularly review and tighten privacy settings on all platforms. Limit data sharing and tracking.',
    tips: ['Review app permissions', 'Disable ad personalization', 'Use privacy-focused browsers', 'Clear cookies regularly'],
  },
  {
    icon: Wifi,
    title: 'Secure Connections',
    description: 'Always use encrypted connections. Avoid public WiFi for sensitive activities.',
    tips: ['Look for HTTPS', 'Use a VPN on public networks', 'Avoid public WiFi for banking', 'Keep software updated'],
  },
];

// OpSec & InfoSec Data
const opsecInfo = {
  opsec: {
    name: 'OPSEC',
    fullName: 'Operations Security',
    description: 'OPSEC is a process that identifies critical information to determine if friendly information can be exploited by adversaries. It\'s about protecting your digital footprint and preventing information leakage.',
    principles: [
      { name: 'Identify Critical Info', description: 'Determine what information could be valuable to adversaries' },
      { name: 'Analyze Threats', description: 'Understand who might want your information and why' },
      { name: 'Analyze Vulnerabilities', description: 'Identify weaknesses that could expose your information' },
      { name: 'Assess Risks', description: 'Evaluate the likelihood and impact of information exposure' },
      { name: 'Apply Countermeasures', description: 'Implement protections to mitigate identified risks' },
    ],
  },
  infosec: {
    name: 'INFOSEC',
    fullName: 'Information Security',
    description: 'INFOSEC encompasses the practices, policies, and technologies used to protect information from unauthorized access, use, disclosure, disruption, modification, or destruction.',
    pillars: [
      { name: 'Confidentiality', description: 'Ensuring information is accessible only to authorized individuals', icon: '🔒' },
      { name: 'Integrity', description: 'Maintaining accuracy and completeness of information', icon: '✅' },
      { name: 'Availability', description: 'Ensuring information is accessible when needed', icon: '⚡' },
    ],
  },
};

// Security Tools Data
const securityTools = [
  {
    category: 'Password Management',
    tools: [
      { name: 'Bitwarden', description: 'Open-source password manager', icon: '🔑' },
      { name: '1Password', description: 'User-friendly password manager', icon: '🛡️' },
      { name: 'KeePass', description: 'Local, offline password storage', icon: '📦' },
    ],
  },
  {
    category: 'Network Security',
    tools: [
      { name: 'WireGuard', description: 'Modern, fast VPN protocol', icon: '🔗' },
      { name: 'Pi-hole', description: 'Network-wide ad and tracker blocker', icon: '🕳️' },
      { name: 'ProtonVPN', description: 'Privacy-focused VPN service', icon: '🌐' },
    ],
  },
  {
    category: 'Privacy Tools',
    tools: [
      { name: 'Tor Browser', description: 'Anonymous web browsing', icon: '🧅' },
      { name: 'DuckDuckGo', description: 'Privacy-focused search engine', icon: '🦆' },
      { name: 'ProtonMail', description: 'Encrypted email service', icon: '📧' },
    ],
  },
  {
    category: 'Security Scanning',
    tools: [
      { name: 'Wireshark', description: 'Network protocol analyzer', icon: '📡' },
      { name: 'Nmap', description: 'Network discovery and security auditing', icon: '🗺️' },
      { name: 'Burp Suite', description: 'Web application security testing', icon: '🐛' },
    ],
  },
];

// Interactive Data Collection Demo
function DataCollectionDemo() {
  const [collectedData, setCollectedData] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Collect data when component mounts
    const data: Record<string, string> = {
      'User Agent': navigator.userAgent.substring(0, 50) + '...',
      'Screen Resolution': `${window.screen.width}x${window.screen.height}`,
      'Language': navigator.language,
      'Platform': navigator.platform,
      'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No',
      'Time Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Connection Type': (navigator as any).connection?.effectiveType || 'Unknown',
      'Do Not Track': navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled',
    };
    setCollectedData(data);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Database className="text-violet-500" size={28} />
          Live Data Collection Demo
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-4 py-2 rounded-lg bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 transition-colors flex items-center gap-2"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          {isVisible ? 'Hide Data' : 'Reveal Data'}
        </button>
      </div>

      <p className="text-gray-400 mb-6">
        This demo shows what information websites can collect about you just by visiting. 
        All data shown is collected from your browser locally - nothing is sent anywhere.
      </p>

      {isVisible ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(collectedData).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <span className="text-gray-400 text-sm">{key}</span>
              <span className="text-white font-mono text-sm ml-4">{value}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-12 rounded-lg bg-white/5 border border-white/10">
          <div className="text-center">
            <Eye className="mx-auto mb-4 text-gray-500" size={48} />
            <p className="text-gray-500">Click "Reveal Data" to see what information is being collected</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="text-amber-400 font-medium mb-1">Why This Matters</h4>
            <p className="text-amber-200/70 text-sm">
              Websites collect this data to build profiles about you for advertising, analytics, and tracking. 
              Consider using privacy tools like VPNs, tracker blockers, and privacy-focused browsers to minimize your digital footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Common Security Terms
const securityTerms = [
  { term: 'Zero-Day', definition: 'A vulnerability that is unknown to those interested in mitigating it, including the vendor. Attackers can exploit it before a fix is available.' },
  { term: 'Phishing', definition: 'A social engineering attack where attackers impersonate legitimate entities to trick victims into revealing sensitive information.' },
  { term: 'SQL Injection', definition: 'A code injection technique that exploits security vulnerabilities in an application\'s database layer by inserting malicious SQL statements.' },
  { term: 'XSS (Cross-Site Scripting)', definition: 'A vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.' },
  { term: 'Man-in-the-Middle', definition: 'An attack where the attacker secretly relays and possibly alters communications between two parties who believe they are communicating directly.' },
  { term: 'Ransomware', definition: 'Malicious software that encrypts a victim\'s files and demands payment for the decryption key.' },
  { term: 'CVE', definition: 'Common Vulnerabilities and Exposures - a standardized identifier for publicly known cybersecurity vulnerabilities.' },
  { term: 'Attack Surface', definition: 'The sum of all points where an unauthorized user can try to enter data to or extract data from an environment.' },
  { term: 'Defense in Depth', definition: 'A security strategy that employs multiple layers of security controls to protect information assets.' },
  { term: 'Social Engineering', definition: 'Psychological manipulation of people into performing actions or divulging confidential information.' },
];

export default function SecurityContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'opsec' | 'infosec'>('opsec');

  return (
    <div ref={ref} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center glow-primary">
              <Shield className="text-white" size={40} />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Security <span className="gradient-text">Knowledge</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Understanding cybersecurity fundamentals, threats, and best practices 
            for staying safe in the digital world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.querySelector('#hacker-types');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Learning
              <ArrowLeft className="ml-2 rotate-180" size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Hacker Types Section */}
      <section id="hacker-types" className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Types of <span className="gradient-text">Hackers</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            <div className="grid md:grid-cols-3 gap-8">
              {hackerTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="glass-card rounded-2xl p-8 group"
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
                  }}
                >
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{type.name}</h3>
                  <p className="text-gray-400 mb-6">{type.description}</p>
                  <div className="space-y-2">
                    {type.examples.map((example) => (
                      <div key={example} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-emerald-500" />
                        {example}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cybersecurity Roles Section */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Career <span className="gradient-text">Roles</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {cyberRoles.map((category, catIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: catIndex === 0 ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: catIndex === 0 ? -40 : 40 }}
                  transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    {catIndex === 0 ? <Shield className="text-violet-500" /> : <Terminal className="text-cyan-500" />}
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.roles.map((role, roleIndex) => (
                      <motion.div
                        key={role.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.5 + catIndex * 0.1 + roleIndex * 0.05 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors"
                      >
                        <div className="text-white font-medium mb-1">{role.name}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stay Safe Online Section */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Stay <span className="gradient-text">Safe Online</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            <div className="grid md:grid-cols-2 gap-8">
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="glass-card rounded-2xl p-8"
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mb-6">
                    <tip.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                  <p className="text-gray-400 mb-6">{tip.description}</p>
                  <div className="space-y-2">
                    {tip.tips.map((tipItem) => (
                      <div key={tipItem} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {tipItem}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OPSEC & INFOSEC Section */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              OPSEC <span className="gradient-text">&</span> INFOSEC
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
                <button
                  onClick={() => setActiveTab('opsec')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'opsec'
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opsecInfo.opsec.name}
                </button>
                <button
                  onClick={() => setActiveTab('infosec')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'infosec'
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opsecInfo.infosec.name}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'opsec' ? (
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center">
                      <EyeOff className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{opsecInfo.opsec.fullName}</h3>
                      <p className="text-gray-400">{opsecInfo.opsec.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {opsecInfo.opsec.principles.map((principle, index) => (
                      <motion.div
                        key={principle.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium mb-1">{principle.name}</div>
                          <div className="text-sm text-gray-500">{principle.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center">
                      <Lock className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{opsecInfo.infosec.fullName}</h3>
                      <p className="text-gray-400">{opsecInfo.infosec.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {opsecInfo.infosec.pillars.map((pillar, index) => (
                      <motion.div
                        key={pillar.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="text-4xl mb-4">{pillar.icon}</div>
                        <div className="text-white font-bold mb-2">{pillar.name}</div>
                        <div className="text-sm text-gray-500">{pillar.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Data Collection Demo */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <DataCollectionDemo />
          </motion.div>
        </div>
      </section>

      {/* Security Terms Section */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Security <span className="gradient-text">Terminology</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {securityTerms.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.term}</h4>
                      <p className="text-gray-400 text-sm">{item.definition}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Tools Section */}
      <section className="section-padding relative">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Security <span className="gradient-text">Tools</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {securityTools.map((category, catIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Wrench className="text-violet-500" size={24} />
                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="text-2xl">{tool.icon}</div>
                        <div>
                          <div className="text-white font-medium">{tool.name}</div>
                          <div className="text-sm text-gray-500">{tool.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding relative pb-32">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-12 max-w-3xl mx-auto">
              <BookOpen className="mx-auto mb-6 text-violet-500" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Keep <span className="gradient-text">Learning</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Cybersecurity is an ever-evolving field. Stay curious, keep practicing, 
                and never stop learning. The digital world needs more security-conscious individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.open('https://tryhackme.com', '_blank', 'noopener,noreferrer')}
                >
                  Start on TryHackMe
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.location.href = '/';
                  }}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}