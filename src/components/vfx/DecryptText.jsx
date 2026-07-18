import { useRef, useEffect, useCallback } from 'react';

/**
 * Scramble-reveal text animation triggered by IntersectionObserver.
 * When the element enters the viewport, characters cycle through random
 * hex chars for ~300ms before resolving to the target text.
 *
 * Uses rAF only — no setInterval/setTimeout for animation frames.
 * Zero re‑renders: animation state is stored in useRef.
 */
const CHARS = '01%&x#@$<>?/!*+-=:;';
const FRAMES_PER = 3;

export default function DecryptText({ text, className = '' }) {
  const spanRef = useRef(null);
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const shownRef = useRef(false);          // only play once

  const animate = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;

    frameRef.current++;
    const f = frameRef.current;

    let built = '';
    for (let i = 0; i < text.length; i++) {
      const resolveAt = 4 + i * FRAMES_PER;
      if (f >= resolveAt || text[i] === ' ') {
        built += text[i];
      } else {
        built += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }

    el.textContent = built;

    if (f < 4 + text.length * FRAMES_PER + 2) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      el.textContent = text;
    }
  }, [text]);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shownRef.current) {
          shownRef.current = true;
          frameRef.current = 0;
          rafRef.current = requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    // Start immediately if already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && !shownRef.current) {
      shownRef.current = true;
      frameRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }

    observer.observe(el);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [animate]);

  return (
    <span ref={spanRef} className={`decrypt-text ${className}`}>
      {text}
    </span>
  );
}