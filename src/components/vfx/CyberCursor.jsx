import React, { useEffect, useRef } from 'react';

/**
 * Custom cyberpunk cursor with trail effect.
 * Replaces the default cursor with a glowing crosshair.
 */
export default function CyberCursor({ enabled = true }) {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const dotsRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    // Create trail dots
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);

    // Main cursor
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 24px;
      height: 24px;
      border: 1px solid rgba(0,255,65,0.8);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 8px rgba(0,255,65,0.4), 0 0 16px rgba(0,255,65,0.2);
      transition: width 0.15s, height 0.15s, border-color 0.15s;
      z-index: 10000;
    `;
    container.appendChild(cursor);

    // Inner dot
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #00ff41;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 6px #00ff41, 0 0 12px rgba(0,255,65,0.6);
      z-index: 10001;
    `;
    container.appendChild(dot);

    // Trail dots
    const trailDots = [];
    for (let i = 0; i < 10; i++) {
      const t = document.createElement('div');
      t.style.cssText = `
        position: fixed;
        width: ${2 + (10 - i) * 0.5}px;
        height: ${2 + (10 - i) * 0.5}px;
        background: rgba(0,255,65,${0.15 + (10 - i) * 0.03});
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
      `;
      container.appendChild(t);
      trailDots.push({ el: t, x: -100, y: -100 });
    }
    dotsRef.current = trailDots;

    let lastX = -100;
    let lastY = -100;
    let speed = 0;

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      speed = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
      lastX = e.clientX;
      lastY = e.clientY;
    }

    function onClick() {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.borderColor = 'rgba(0,255,65,1)';
      setTimeout(() => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.borderColor = 'rgba(0,255,65,0.8)';
      }, 150);
    }

    function onMouseDown() {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
    }

    function onMouseUp() {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    }

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // Add cursor none to all elements
    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; } a, button, [role="button"], input, textarea, select { cursor: none !important; }';
    document.head.appendChild(style);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    function animate() {
      const { x, y } = mouseRef.current;

      // Smooth cursor movement
      const currentX = parseFloat(cursor.style.left || '-100');
      const currentY = parseFloat(cursor.style.top || '-100');
      const ease = 0.3;

      cursor.style.left = `${currentX + (x - currentX) * ease}px`;
      cursor.style.top = `${currentY + (y - currentY) * ease}px`;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      // Trail
      const trail = dotsRef.current;
      trail[0].x += (x - trail[0].x) * 0.5;
      trail[0].y += (y - trail[0].y) * 0.5;
      trail[0].el.style.left = `${trail[0].x}px`;
      trail[0].el.style.top = `${trail[0].y}px`;

      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * (0.4 - i * 0.03);
        trail[i].y += (trail[i - 1].y - trail[i].y) * (0.4 - i * 0.03);
        trail[i].el.style.left = `${trail[i].x}px`;
        trail[i].el.style.top = `${trail[i].y}px`;
        trail[i].el.style.opacity = x < 0 ? '0' : '1';
      }

      // Hide cursor when out of bounds
      if (x < 0 || y < 0) {
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
      } else {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    cursorRef.current = cursor;
    trailRef.current = container;

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.remove();
      style.remove();
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [enabled]);

  return null; // Renders via DOM manipulation
}