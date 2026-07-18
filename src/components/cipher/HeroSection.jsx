import { useState, useEffect, useRef } from 'react';
import { profileData } from '../../lib/profileData';

function TerminalClock() {
  const [time, setTime] = useState('00:00:00');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'GMT', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="font-mono text-xs flex items-center gap-2 text-gray-400">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
      <span className="text-gray-600">GMT</span>
      <span className="text-[#00ff41]">{time}</span>
    </div>
  );
}

/**
 * Binary rain canvas behind the name — pure 0s and 1s
 */
function BinaryRain({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const chars = ['0', '1'];
    const fontSize = 11;
    let columns = 0;
    let drops = [];
    let animId;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(rect.width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -rect.height);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.025) {
          drops[i] += fontSize;
          if (drops[i] > h && Math.random() > 0.97) drops[i] = 0;
          continue;
        }
        const char = chars[Math.floor(Math.random() * 2)];
        const x = i * fontSize;
        const y = drops[i];
        ctx.fillStyle = 'rgba(0, 255, 65, 0.25)';
        ctx.fillText(char, x, y);
        drops[i] += fontSize;
        if (drops[i] > h && Math.random() > 0.97) drops[i] = 0;
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
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.5 }}
    />
  );
}

export const HeroSection = () => {
  const hackPhrases = ['BREACH', 'EXPLOIT', 'PERSIST', 'EXFILTRATE', 'DOMINATE'];
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % hackPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [hackPhrases.length]);

  return (
    <section
      id="bio"
      className="relative min-h-screen flex flex-col items-start justify-center px-6 md:px-12 pt-20 pb-32 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl w-full relative z-10">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] animate-pulse" />
                <span className="text-[#00ff41] text-xs font-mono tracking-[0.3em]">
                  SYS.ONLINE
                </span>
              </div>
              <span className="text-gray-700 text-xs font-mono">│</span>
              <span className="text-xs font-mono text-gray-500 tracking-wider transition-all duration-300">
                {hackPhrases[phraseIdx]}
              </span>
            </div>

            {/* Hacker name with binary rain background */}
            <div className="relative overflow-hidden rounded-lg" style={{ display: 'inline-block' }}>
              <BinaryRain />
              <h1
                className="font-black leading-tight relative z-10 px-4 py-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  letterSpacing: '0.1em',
                  color: '#CCFF00',
                  textShadow: '0 0 10px rgba(204,255,0,0.6), 0 0 30px rgba(204,255,0,0.3), 0 0 60px rgba(204,255,0,0.15)',
                  WebkitTextStroke: '1px rgba(204,255,0,0.15)',
                }}
              >
                OSCAR SENIOR
                <span
                  className="inline-block align-middle ml-2 animate-blink"
                  style={{
                    width: '0.06em',
                    height: '0.7em',
                    backgroundColor: '#CCFF00',
                    boxShadow: '0 0 8px #CCFF00',
                    verticalAlign: 'baseline',
                  }}
                />
              </h1>
            </div>

            <p className="text-gray-500 text-xs font-mono tracking-[0.3em] mt-2">
              PENETRATION TESTER · RED TEAM OPERATOR
            </p>
          </div>

          <div className="text-right space-y-2 flex-shrink-0">
            <div className="font-mono text-xs text-gray-500 tracking-widest">
              STATUS <span className="text-[#00ff41] font-bold">{profileData.status}</span>
            </div>
            <TerminalClock />
            <div className="mt-3">
              <div className="text-[10px] font-mono text-gray-600 text-right mb-1">THREAT LEVEL</div>
              <div className="flex gap-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-1.5 transition-all duration-300 ${
                      i < 4 ? 'bg-[#00ff41] shadow-[0_0_6px_#00ff41]' : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
          <div className="reveal-on-scroll-left">
            <div className="border border-[#00ff41]/10 rounded-lg p-5 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3 border-b border-[#00ff41]/5 pb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 ml-2">
                  root@oscar:~# cat /etc/bio
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 font-mono">
                <span className="text-[#00ff41] mr-1">$</span>
                {profileData.bio}
                <span className="animate-blink text-[#00ff41] ml-0.5">█</span>
              </p>
            </div>
          </div>

          <div className="reveal-on-scroll-right space-y-2">
            {[
              ['LOCATION', profileData.location],
              ['RANK', `${profileData.tryhackme.rank} · ${profileData.tryhackme.tier}`],
              ['ROOMS', `${profileData.tryhackme.rooms} completed`],
              ['BADGES', `${profileData.tryhackme.badges} earned`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2.5 rounded border border-gray-800/60 bg-black/30 hover:border-[#00ff41]/20 transition-all duration-200 group"
              >
                <span className="font-mono text-[10px] text-[#00ff41]/50 tracking-[0.15em] w-20 flex-shrink-0">
                  [{label}]
                </span>
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-mono truncate">
                  {value}
                </span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00ff41]/20 group-hover:bg-[#00ff41] group-hover:shadow-[0_0_6px_#00ff41] transition-all flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Pathways */}
        <div className="border-t border-[#00ff41]/10 pt-8 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono text-[#00ff41]/40 tracking-[0.3em]">
              COMPLETED PATHWAYS
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {profileData.pathways.map((p) => (
              <div
                key={p.name}
                className="group relative p-5 rounded border border-gray-800/50 bg-black/30 hover:border-[#00ff41]/30 transition-all duration-300"
              >
                <div className="font-mono text-xs text-[#00ff41] mb-2 tracking-widest">
                  [{p.icon.toUpperCase()}]
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-mono group-hover:text-[#00ff41] transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono">Completed: {p.completed}</p>
                <div className="mt-3 h-0.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00ff41] rounded-full shadow-[0_0_4px_#00ff41]"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
          <span className="text-[10px] font-mono text-[#00ff41]/50 tracking-[0.3em]">SCROLL</span>
          <div className="w-3.5 h-3.5 border-r border-b border-[#00ff41]/40 rotate-45 animate-bounce" />
        </div>
      </div>
    </section>
  );
};