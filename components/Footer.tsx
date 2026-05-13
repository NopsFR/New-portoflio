'use client';

import { motion } from 'framer-motion';
import { Heart, ExternalLink, User, AtSign, Send } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/NopsFR', icon: ExternalLink },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/OscarSenior', icon: User },
  { name: 'Email', href: 'mailto:Oscar.s@Disc.ac.uk', icon: AtSign },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="container-custom mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <link.icon size={20} />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>© {currentYear} Portfolio</span>
            <span>·</span>
            <span className="flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-500" /> by Oscar
            </span>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/5 via-transparent to-transparent pointer-events-none" />
    </footer>
  );
}