import React, { useRef, useEffect } from 'react';

/**
 * Canvas-based Matrix rain effect.
 * Renders falling green characters for a cyberpunk aesthetic.
 */
export default function MatrixRain({ opacity = 0.08, density = 0.03, speed = 1.0 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let drops = [];
    let columns = 0;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/?{}[]|!@#$%^&*()_+-=.:;'.split('');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 14);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
      }
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = `rgba(5, 5, 5, ${0.15 * speed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '13px monospace';

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > density) {
          drops[i] += 14 * speed;
          if (drops[i] > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          continue;
        }

        const char = chars[Math.floor(Math.random() * chars.length)];

        // Leading character (brighter)
        ctx.fillStyle = `rgba(0, 255, 65, ${0.9 * opacity})`;
        ctx.fillText(char, i * 14, drops[i]);

        // Trail characters
        for (let j = 1; j < 5; j++) {
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          const trailOpacity = (0.7 * opacity) / (j + 1);
          ctx.fillStyle = `rgba(0, 255, 65, ${trailOpacity})`;
          ctx.fillText(trailChar, i * 14, drops[i] - j * 14);
        }

        drops[i] += 14 * speed;

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [opacity, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}