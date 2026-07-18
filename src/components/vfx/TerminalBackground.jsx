import { useRef, useEffect, useCallback } from 'react';

/**
 * Single‑canvas background renderer — organic matrix rain, subtle particle web,
 * and a moving scanline sweep.  All effects run inside one requestAnimationFrame
 * loop on one <canvas> — zero DOM overhead for background VFX.
 *
 * Mouse position is tracked via a ref (not React state) to avoid re‑renders on
 * every pixel of movement.
 */

const MATRIX_CHARS  = 'アイウエオカキクケコ0123456789ABCDEF<>?/{}[]|!@#$%^&*()_+-=:;';
const FONT_SIZE     = 13;
const TRAIL_LEN     = 4;          // characters in the drop trail

export default function TerminalBackground({ opacity = 0.06 }) {
  const canvasRef = useRef(null);
  const rafRef     = useRef(0);
  const mouseRef   = useRef({ x: -1000, y: -1000 });   // off‑screen by default

  /* ---- mouse tracking (rAF‑batched, ref‑based) ---- */
  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  /* ---- canvas loop ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let w = window.innerWidth;
    let h = window.innerHeight;
    let drops = [];                      // matrix rain
    let particles = [];                  // subtle particle web
    let scanY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // -------- re‑init matrix drops --------
      const cols = Math.floor(w / FONT_SIZE);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -h,
        speed: 0.6 + Math.random() * 1.0,
      }));

      // -------- particle web (lightweight, ~25 particles) --------
      particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      /* 1. Fade previous frame (trail effect) */
      ctx.fillStyle = `rgba(5,5,5,0.18)`;
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;

      /* 2. Matrix rain */
      ctx.font = `${FONT_SIZE}px "Fira Code", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * FONT_SIZE;
        const y = d.y;

        // leading character (bright)
        ctx.fillStyle = `rgba(0,255,65,${0.45 * opacity})`;
        ctx.fillText(char, x, y);

        // trail
        for (let j = 1; j <= TRAIL_LEN; j++) {
          ctx.fillStyle = `rgba(0,255,65,${(0.35 * opacity) / (j + 1)})`;
          ctx.fillText(
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
            x,
            y - j * FONT_SIZE
          );
        }

        d.y += FONT_SIZE * d.speed;
        if (d.y > h + FONT_SIZE * TRAIL_LEN && Math.random() > 0.975) d.y = -FONT_SIZE * TRAIL_LEN;
      }

      /* 3. Particle web */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

        // attraction to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }
        p.vx *= 0.998;
        p.vy *= 0.998;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,65,${0.15 * opacity})`;
        ctx.fill();

        // connections near mouse
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0,255,65,${(0.12 * opacity) * (1 - dist / 180)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      /* 4. Scanline sweep */
      scanY = (scanY + 2.5) % h;
      ctx.fillStyle = `rgba(0,255,65,${0.025})`;
      ctx.fillRect(0, scanY, w, 2);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="terminal-bg-canvas"
      aria-hidden="true"
    />
  );
}