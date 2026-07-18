import React, { useEffect, useRef } from 'react';

/**
 * Minimal, smooth cyberpunk cursor with subtle trail.
 * Uses requestAnimationFrame for buttery 60fps.
 */
export default function CyberCursor({ enabled = true }) {
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const containerRef = useRef(null);
  const cursorEl = useRef(null);
  const dotEl = useRef(null);
  const trailEls = useRef([]);

  useEffect(() => {
    if (!enabled) return;

    // Build DOM once
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);
    containerRef.current = container;

    // Main ring — smaller (16px), thin border
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position:fixed;width:16px;height:16px;
      border:1px solid rgba(0,255,65,0.7);
      border-radius:50%;pointer-events:none;
      transform:translate(-50%,-50%);
      box-shadow:0 0 6px rgba(0,255,65,0.25);
      transition:width 0.12s,height 0.12s,border-color 0.12s,box-shadow 0.12s;
      z-index:10000;will-change:left,top;
    `;
    container.appendChild(cursor);
    cursorEl.current = cursor;

    // Center dot — tiny (3px)
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;width:3px;height:3px;
      background:#00ff41;border-radius:50%;pointer-events:none;
      transform:translate(-50%,-50%);
      box-shadow:0 0 4px #00ff41,0 0 8px rgba(0,255,65,0.5);
      z-index:10001;will-change:left,top;
    `;
    container.appendChild(dot);
    dotEl.current = dot;

    // Trail — only 5 dots for performance
    const trailDots = [];
    for (let i = 0; i < 5; i++) {
      const t = document.createElement('div');
      t.style.cssText = `
        position:fixed;
        width:${1 + (5 - i) * 0.3}px;
        height:${1 + (5 - i) * 0.3}px;
        background:rgba(0,255,65,${0.08 + (5 - i) * 0.04});
        border-radius:50%;pointer-events:none;
        transform:translate(-50%,-50%);
        will-change:left,top,opacity;
      `;
      container.appendChild(t);
      trailDots.push({ el: t, x: -100, y: -100 });
    }
    trailEls.current = trailDots;

    // Hide default cursor only for body (not admin pages — they're on different route but same DOM)
    const style = document.createElement('style');
    style.id = 'cyber-cursor-style';
    style.textContent = `
      html.cyber-cursor-active, html.cyber-cursor-active * { cursor: none !important; }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add('cyber-cursor-active');

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onClick() {
      if (cursorEl.current) {
        cursorEl.current.style.width = '10px';
        cursorEl.current.style.height = '10px';
        cursorEl.current.style.borderColor = 'rgba(0,255,65,0.9)';
        cursorEl.current.style.boxShadow = '0 0 12px rgba(0,255,65,0.5)';
        setTimeout(() => {
          if (cursorEl.current) {
            cursorEl.current.style.width = '16px';
            cursorEl.current.style.height = '16px';
            cursorEl.current.style.borderColor = 'rgba(0,255,65,0.7)';
            cursorEl.current.style.boxShadow = '0 0 6px rgba(0,255,65,0.25)';
          }
        }, 120);
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick);

    function animate() {
      const { x, y } = mouseRef.current;
      const c = cursorEl.current;
      const d = dotEl.current;
      const trail = trailEls.current;

      // Smooth cursor ring (lerp)
      if (c) {
        const cx = parseFloat(c.style.left || '-100');
        const cy = parseFloat(c.style.top || '-100');
        c.style.left = `${cx + (x - cx) * 0.25}px`;
        c.style.top = `${cy + (y - cy) * 0.25}px`;
        c.style.opacity = x < 0 ? '0' : '1';
      }

      // Dot follows instantly
      if (d) {
        d.style.left = `${x}px`;
        d.style.top = `${y}px`;
        d.style.opacity = x < 0 ? '0' : '1';
      }

      // Trail
      if (trail.length > 0) {
        trail[0].x += (x - trail[0].x) * 0.4;
        trail[0].y += (y - trail[0].y) * 0.4;
        trail[0].el.style.left = `${trail[0].x}px`;
        trail[0].el.style.top = `${trail[0].y}px`;

        for (let i = 1; i < trail.length; i++) {
          trail[i].x += (trail[i - 1].x - trail[i].x) * 0.3;
          trail[i].y += (trail[i - 1].y - trail[i].y) * 0.3;
          trail[i].el.style.left = `${trail[i].x}px`;
          trail[i].el.style.top = `${trail[i].y}px`;
          trail[i].el.style.opacity = x < 0 ? '0' : '1';
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.remove();
      const s = document.getElementById('cyber-cursor-style');
      if (s) s.remove();
      document.documentElement.classList.remove('cyber-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, [enabled]);

  return null;
}