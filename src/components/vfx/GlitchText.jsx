import React, { useState, useEffect, useCallback } from 'react';

/**
 * Cyberpunk glitch text component.
 * Randomly glitches the text display with chromatic aberration and offset slices.
 */
export default function GlitchText({
  children,
  as: Tag = 'span',
  className = '',
  intensity = 'normal', // 'subtle' | 'normal' | 'intense'
  glitchOnHover = true,
  active = false,
  ...props
}) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchSeed, setGlitchSeed] = useState(0);

  const triggerGlitch = useCallback(() => {
    if (glitchOnHover && !isGlitching) {
      setIsGlitching(true);
      setGlitchSeed(Math.random());

      setTimeout(() => {
        setIsGlitching(false);
      }, intensity === 'intense' ? 400 : intensity === 'subtle' ? 120 : 250);
    }
  }, [glitchOnHover, isGlitching, intensity]);

  // Periodic glitch when active
  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setGlitchSeed(Math.random());

      setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, intensity === 'intense' ? 1500 : 3500);

    return () => clearInterval(interval);
  }, [active, intensity]);

  const clipPaths = ['0% 0%, 100% 0%, 100% 45%, 0% 45%', '0% 55%, 100% 55%, 100% 100%, 0% 100%'];

  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
      {...props}
    >
      {/* Original text (invisible) */}
      <span className={isGlitching ? 'invisible' : 'visible'}>
        {children}
      </span>

      {/* Glitch overlay */}
      {isGlitching && (
        <span className="absolute inset-0" aria-hidden="true">
          {/* Red channel */}
          <span
            className="absolute inset-0"
            style={{
              clipPath: `polygon(${glitchSeed > 0.5 ? clipPaths[0] : clipPaths[1]})`,
              color: '#ff0040',
              transform: `translate(${(glitchSeed - 0.5) * 6}px, ${(glitchSeed - 0.5) * 3}px)`,
            }}
          >
            {children}
          </span>
          {/* Blue channel */}
          <span
            className="absolute inset-0"
            style={{
              clipPath: `polygon(${glitchSeed > 0.5 ? clipPaths[1] : clipPaths[0]})`,
              color: '#00d4ff',
              transform: `translate(${(0.5 - glitchSeed) * 6}px, ${(0.5 - glitchSeed) * 3}px)`,
            }}
          >
            {children}
          </span>
          {/* Main glitch */}
          <span
            className="absolute inset-0 text-[#00ff41]"
            style={{
              clipPath: `polygon(${clipPaths[0]})`,
              transform: `translate(${(glitchSeed - 0.5) * 4}px, 0)`,
            }}
          >
            {children}
          </span>
        </span>
      )}
    </Tag>
  );
}

/**
 * Text with a glowing underline/box effect that pulses.
 */
export function NeonText({
  children,
  color = '#00ff41',
  className = '',
  as: Tag = 'span',
  ...props
}) {
  return (
    <Tag
      className={`relative ${className}`}
      style={{
        textShadow: `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals text letter by letter with a glow trail.
 */
export function RevealText({
  children,
  className = '',
  delay = 0,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-4 blur-sm'
      } ${className}`}
    >
      {children}
    </span>
  );
}