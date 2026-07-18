import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Tracks mouse position with throttling for performance.
 * Returns { x, y, normalizedX, normalizedY }
 */
export function useMousePosition(throttleMs = 16) {
  const [position, setPosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const lastCall = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastCall.current < throttleMs) return;
      lastCall.current = now;

      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [throttleMs]);

  return position;
}

/**
 * Detects when an element scrolls into view using IntersectionObserver.
 * Returns [ref, isVisible, hasBeenVisible]
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible, hasBeenVisible];
}

/**
 * Simulates a terminal typing effect.
 * Returns the currently displayed text.
 */
export function useTypewriter(text, speed = 40, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsDone(false);
    indexRef.current = 0;

    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    if (indexRef.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
      setIsTyping(false);
    }
  }, [isTyping, displayedText, text, speed]);

  return { displayedText, isTyping, isDone };
}

/**
 * Returns a debounced value that updates after the specified delay.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Tracks which section is currently in view based on scroll position.
 */
export function useActiveSection(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

/**
 * Creates audio context and plays a quick beep/click sound effect.
 * Must be called from a user gesture.
 */
export function useSoundEffects() {
  const audioCtxRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playBeep = useCallback((frequency = 800, duration = 0.08, type = 'square') => {
    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not available
    }
  }, [getContext]);

  const playHover = useCallback(() => playBeep(1200, 0.04, 'sine'), [playBeep]);
  const playClick = useCallback(() => playBeep(600, 0.06, 'square'), [playBeep]);
  const playSuccess = useCallback(() => {
    playBeep(523, 0.1, 'sine');
    setTimeout(() => playBeep(659, 0.1, 'sine'), 100);
    setTimeout(() => playBeep(784, 0.15, 'sine'), 200);
  }, [playBeep]);
  const playError = useCallback(() => playBeep(200, 0.15, 'sawtooth'), [playBeep]);

  return { playBeep, playHover, playClick, playSuccess, playError };
}

/**
 * Measures the current frame rate for performance-aware animations.
 */
export function useFPS() {
  const [fps, setFps] = useState(60);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let rafId;
    const measure = () => {
      frameRef.current++;
      const now = performance.now();
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round(frameRef.current / ((now - lastTimeRef.current) / 1000)));
        frameRef.current = 0;
        lastTimeRef.current = now;
      }
      rafId = requestAnimationFrame(measure);
    };
    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return fps;
}