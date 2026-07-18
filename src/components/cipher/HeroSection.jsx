import { useState, useEffect, useRef } from 'react';
import { profileData } from '../../lib/profileData';
import { GlitchText, NeonText } from '../vfx';

function TerminalClock() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const gmt = now.toLocaleTimeString('en-US', { timeZone: 'GMT', hour12: false });
      setTime(gmt);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[#00ff41] text-xs tracking-wider flex items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_6px_#00ff41]" />
      <span className="text-gray-500">GMT:</span>
      <span className="text-glow-green">{time}</span>
    </div>
  );
}

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drops = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    const fontSize = 12;
    let columns = 0;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    resize();
    window.addEventListener('resize', resize);

    let animId;
    function draw() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.02) {
          drops[i]++;
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          continue;
        }
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = `rgba(0, 255, 65, ${0.15 + Math.random() * 0.1})`;
        ctx.fillText(char, x, y);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    />
  );
}

export const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Glitch hack text that cycles
  const hackPhrases = ['BREACH', 'EXPLOIT', 'PERSIST', 'EXFILTRATE', 'DOMINATE'];
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % hackPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hackPhrases.length]);

  return (
    <section
      id="bio"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-start justify-center px-8 pt-20 pb-32 bg-obsidian overflow-hidden"
    >
      {/* Hero Matrix background */}
      <MatrixBackground />

      {/* Radial glow following mouse */}
      <div
        className="absolute pointer-events-none opacity-20 transition-all duration-300"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0,255,65,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <div className="mb-12 flex items-start justify-between">
          <div>
            {/* Animated status line */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_8px_#00ff41]" />
                <span className="text-[#00ff41] text-xs font-mono tracking-[0.3em] animate-pulse">
                  SYS.ONLINE
                </span>
              </div>
              <span className="text-gray-700 text-xs font-mono">|</span>
              <GlitchText
                className="text-xs font-mono text-[#00ff41]/60 tracking-wider"
                intensity="subtle"
                active={true}
              >
                {hackPhrases[phraseIdx]}
              </GlitchText>
            </div>

            {/* Auto-glitching neon name */}
            <h1
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-tight mb-4 relative"
              style={{ letterSpacing: '0.15em' }}
            >
              <span
                className="text-[#CCFF00] block relative animate-flicker"
                style={{
                  textShadow: '0 0 10px #CCFF00, 0 0 30px rgba(204,255,0,0.6), 0 0 60px rgba(204,255,0,0.3)',
                }}
              >
                {/* Red channel offset */}
                <span
                  className="absolute inset-0 text-[#ff0040] opacity-70"
                  style={{
                    animation: 'glitch-shake 0.15s infinite',
                    clipPath: 'polygon(0 20%, 100% 20%, 100% 35%, 0 35%)',
                  }}
                  aria-hidden="true"
                >
                  {profileData.name}
                </span>
                {/* Blue channel offset */}
                <span
                  className="absolute inset-0 text-[#00d4ff] opacity-70"
                  style={{
                    animation: 'glitch-shake 0.2s infinite reverse',
                    clipPath: 'polygon(0 65%, 100% 65%, 100% 80%, 0 80%)',
                  }}
                  aria-hidden="true"
                >
                  {profileData.name}
                </span>
                {/* Main text */}
                {profileData.name}
              </span>
            </h1>
          </div>

          <div className="text-right space-y-3">
            <div className="font-mono text-xs text-[#00ff41] tracking-widest">
              STATUS:
              <NeonText color="#00ff41" className="ml-2">
                {profileData.status}
              </NeonText>
            </div>
            <TerminalClock />
            {/* Animated security level indicator */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-gray-600 text-right mb-1">
                THREAT LEVEL
              </div>
              <div className="flex gap-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-1.5 ${
                      i < 4
                        ? 'bg-[#00ff41] shadow-[0_0_6px_#00ff41]'
                        : 'bg-gray-800'
                    } transition-all duration-500`}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animation: i < 4 ? 'flicker 1.5s infinite' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="reveal-on-scroll-left">
            <div className="relative">
              {/* Terminal-style bio */}
              <div className="border border-[#00ff41]/20 rounded-lg p-5 bg-[#0a0a0f]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3 border-b border-[#00ff41]/10 pb-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 ml-2">
                    oscar@nops:~$ cat bio.txt
                  </span>
                </div>
                <p className="font-sans text-base leading-relaxed text-gray-300 font-mono">
                  <span className="text-[#00ff41] mr-1">$</span>
                  {profileData.bio}
                  <span className="animate-blink text-[#00ff41] ml-0.5">▌</span>
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll-right space-y-3">
            {[
              { label: 'LOCATION', value: profileData.location, icon: '📍' },
              { label: 'RANK', value: `${profileData.tryhackme.rank} · ${profileData.tryhackme.tier}`, icon: '🏆' },
              { label: 'ROOMS', value: `${profileData.tryhackme.rooms} completed`, icon: '🎯' },
              { label: 'BADGES', value: `${profileData.tryhackme.badges} earned`, icon: '⭐' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-800 bg-[#0a0a0f]/60 hover:border-[#00ff41]/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.05)] transition-all duration-300 group cursor-default hover-lift"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <span className="font-mono text-[10px] text-[#00ff41]/70 tracking-widest block">
                    [{item.label}]
                  </span>
                  <span className="text-gray-300 group-hover:text-white transition-colors font-mono text-sm">
                    {item.value}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]/30 group-hover:bg-[#00ff41] group-hover:shadow-[0_0_8px_#00ff41] transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#00ff41]/20 pt-8">
          <div className="reveal-on-scroll">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-[#00ff41]/60 tracking-[0.3em]">
                COMPLETED PATHWAYS
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {profileData.pathways.map((pathway, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-lg border border-gray-800 bg-[#0a0a0f]/60 hover:border-[#00ff41]/40 transition-all duration-500 hover-lift overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/0 to-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="font-mono text-xs text-[#00ff41] mb-2 tracking-widest animate-pulse">
                      [{pathway.icon.toUpperCase()}]
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 font-mono group-hover:text-[#00ff41] transition-colors">
                      {pathway.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">
                      Completed: {pathway.completed}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-3 w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00ff41] rounded-full transition-all duration-1000"
                        style={{
                          width: '100%',
                          boxShadow: '0 0 6px #00ff41',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono text-[#00ff41]/50 tracking-[0.3em]">SCROLL</span>
          <div className="w-4 h-4 border-r-2 border-b-2 border-[#00ff41]/50 rotate-45 animate-bounce" />
        </div>
      </div>
    </section>
  );
};