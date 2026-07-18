import { useRef, useEffect } from 'react';

/**
 * Full-screen Matrix rain canvas.
 * Renders green katakana + hex characters falling at consistent speed.
 * Performance optimized — uses requestAnimationFrame with throttled character density.
 */
export default function MatrixRain({ opacity = 0.05, speed = 1.0 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const chars = ('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
                   '0123456789ABCDEF<>?/{}[]|!@#$%^&*()_+-=.:;').split('');
    const fontSize = 13;
    let columns = 0;
    let drops = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -window.innerHeight);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = `rgba(5, 5, 5, ${0.15 * speed})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Skip some columns randomly for sparse rain
        if (Math.random() > 0.018) {
          drops[i] += fontSize * speed;
          if (drops[i] > window.innerHeight && Math.random() > 0.97) drops[i] = 0;
          continue;
        }

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i];

        // Leading character — brighter
        ctx.fillStyle = `rgba(0, 255, 65, ${0.7 * opacity})`;
        ctx.fillText(char, x, y);

        // Faint trail
        for (let j = 1; j <= 3; j++) {
          ctx.fillStyle = `rgba(0, 255, 65, ${(0.4 * opacity) / (j + 1)})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - j * fontSize);
        }

        drops[i] += fontSize * speed;
        if (drops[i] > window.innerHeight && Math.random() > 0.97) {
          drops[i] = 0;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity }}
    />
  );
}