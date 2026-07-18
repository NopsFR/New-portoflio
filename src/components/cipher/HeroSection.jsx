import { useState, useEffect, useRef, useCallback } from 'react';
import { profileData } from '../../lib/profileData';

// Memoized clock — updates once per second, not on every render
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
    <div className="font-mono text-xs flex items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
      <span style={{ color: 'var(--color-muted)' }}>GMT</span>
      <span style={{ color: 'var(--color-accent)' }}>{time}</span>
    </div>
  );
}

// Binary rain canvas — scoped to the name area, not full-screen
function BinaryRain({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const chars = ['0', '1'];
    const fontSize = 11;
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
      const cols = Math.floor(rect.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -rect.height);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.025) {
          drops[i] += fontSize;
          if (drops[i] > h && Math.random() > 0.97) drops[i] = 0;
          continue;
        }
        ctx.fillStyle = 'rgba(0, 255, 65, 0.25)';
        ctx.fillText(chars[Math.floor(Math.random() * 2)], i * fontSize, drops[i]);
        drops[i] += fontSize;
        if (drops[i] > h && Math.random() > 0.97) drops[i] = 0;
      }
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: 0.5 }} />;
}

// Section title — consistent styling
function SectionTitle({ number, children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: 'var(--color-accent)' }}>[{number}]</span>{' '}
      <span style={{ color: 'var(--color-white)' }}>{children}</span>
    </h2>
  );
}

export const HeroSection = () => {
  const hackPhrases = useRef(['BREACH', 'EXPLOIT', 'PERSIST', 'EXFILTRATE', 'DOMINATE']);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx(p => (p + 1) % hackPhrases.current.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="bio" className="relative min-h-screen flex flex-col items-start justify-center px-6 md:px-12 pt-20 pb-32 overflow-hidden">
      <div className="max-w-6xl w-full relative" style={{ zIndex: 'var(--z-content)' }}>
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-accent)' }}>SYS.ONLINE</span>
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>│</span>
              <span className="font-mono text-xs tracking-wider transition-colors" style={{ color: 'var(--color-muted)' }}>
                {hackPhrases.current[phraseIdx]}
              </span>
            </div>

            {/* Name with binary rain background */}
            <div className="relative inline-block overflow-hidden rounded" style={{ borderRadius: 'var(--radius-md)' }}>
              <BinaryRain />
              <h1
                className="font-black leading-tight relative px-4 py-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                  textShadow: '0 0 10px rgba(0,255,65,0.4), 0 0 30px rgba(0,255,65,0.15)',
                  zIndex: 10,
                }}
              >
                OSCAR SENIOR
                <span className="inline-block ml-2 animate-blink" style={{
                  width: '0.06em', height: '0.7em',
                  backgroundColor: 'var(--color-accent)',
                  verticalAlign: 'baseline',
                }} />
              </h1>
            </div>

            <p className="font-mono text-xs tracking-widest mt-2" style={{ color: 'var(--color-muted)' }}>
              PENETRATION TESTER · RED TEAM OPERATOR
            </p>
          </div>

          {/* Right-side status */}
          <div className="text-right space-y-2 flex-shrink-0">
            <div className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-muted)' }}>
              STATUS <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{profileData.status}</span>
            </div>
            <TerminalClock />
            <div className="mt-3">
              <p className="font-mono text-right mb-1" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>THREAT LEVEL</p>
              <div className="flex gap-1 justify-end">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="w-4 h-1.5 transition-colors" style={{
                    backgroundColor: i < 4 ? 'var(--color-accent)' : 'var(--color-border)',
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
          <div className="reveal-on-scroll-left">
            <div className="rounded-lg p-5" style={{ border: '1px solid var(--color-accent-ghost)', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-lg)' }}>
              <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid var(--color-accent-ghost)' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ef4444', opacity: 0.6 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#eab308', opacity: 0.6 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e', opacity: 0.6 }} />
                <span className="font-mono ml-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                  root@oscar:~# cat /etc/bio
                </span>
              </div>
              <p className="text-sm leading-relaxed font-mono" style={{ color: 'var(--color-text)' }}>
                <span style={{ color: 'var(--color-accent)' }}>$ </span>
                {profileData.bio}
                <span className="animate-blink ml-0.5" style={{ color: 'var(--color-accent)' }}>█</span>
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
              <div key={label} className="flex items-center gap-3 px-4 py-2.5 rounded border transition-colors group"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                <span className="font-mono w-20 flex-shrink-0" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', opacity: 0.5 }}>[{label}]</span>
                <span className="text-sm font-mono truncate group-hover:text-white" style={{ color: 'var(--color-text)' }}>{value}</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full transition-all flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Pathways */}
        <div className="reveal-on-scroll pt-8" style={{ borderTop: '1px solid var(--color-accent-ghost)' }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono tracking-widest" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', opacity: 0.4 }}>COMPLETED PATHWAYS</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.2), transparent)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {profileData.pathways.map(p => (
              <div key={p.name} className="group p-5 rounded border transition-colors"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)' }}>
                <div className="font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>[{p.icon.toUpperCase()}]</div>
                <h3 className="text-base font-bold mb-1 font-mono group-hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-white)' }}>{p.name}</h3>
                <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>Completed: {p.completed}</p>
                <div className="mt-3 h-0.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                  <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: 'var(--color-accent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
          <span className="font-mono tracking-widest" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', opacity: 0.5 }}>SCROLL</span>
          <div className="w-3.5 h-3.5 border-r border-b rotate-45 animate-bounce" style={{ borderColor: 'var(--color-accent)', opacity: 0.4 }} />
        </div>
      </div>
    </section>
  );
};