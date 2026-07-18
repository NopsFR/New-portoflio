import { useEffect, useRef } from 'react';

/**
 * Minimal terminal/hacker crosshair cursor.
 * No circles — just a crisp green cross (+) with a tiny center dot.
 * Ultra-smooth via requestAnimationFrame lerp.
 */
export default function CyberCursor({ enabled = true }) {
  const raf = useRef(0);
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);

    // Horizontal line
    const hLine = document.createElement('div');
    hLine.style.cssText = `
      position:fixed;width:20px;height:1px;
      background:rgba(0,255,65,0.7);
      pointer-events:none;z-index:10000;
      transform:translate(-50%,-50%);
      will-change:left,top;transition:opacity 0.1s;
    `;
    container.appendChild(hLine);

    // Vertical line
    const vLine = document.createElement('div');
    vLine.style.cssText = `
      position:fixed;width:1px;height:20px;
      background:rgba(0,255,65,0.7);
      pointer-events:none;z-index:10000;
      transform:translate(-50%,-50%);
      will-change:left,top;transition:opacity 0.1s;
    `;
    container.appendChild(vLine);

    // Tiny center dot
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;width:2px;height:2px;
      background:#00ff41;border-radius:50%;
      pointer-events:none;z-index:10001;
      transform:translate(-50%,-50%);
      box-shadow:0 0 3px #00ff41;
      will-change:left,top;transition:opacity 0.1s;
    `;
    container.appendChild(dot);

    // Hide native cursor on body
    const style = document.createElement('style');
    style.id = 'cyber-cursor-style';
    style.textContent = 'html.cursor-hack, html.cursor-hack *{cursor:none!important}';
    document.head.appendChild(style);
    document.documentElement.classList.add('cursor-hack');

    function onMove(e) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    function onClick() {
      hLine.style.background = 'rgba(0,255,65,1)';
      vLine.style.background = 'rgba(0,255,65,1)';
      dot.style.boxShadow = '0 0 8px #00ff41';
      setTimeout(() => {
        hLine.style.background = 'rgba(0,255,65,0.7)';
        vLine.style.background = 'rgba(0,255,65,0.7)';
        dot.style.boxShadow = '0 0 3px #00ff41';
      }, 100);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);

    let currentX = -100, currentY = -100;

    function animate() {
      const { x, y } = mouse.current;
      currentX += (x - currentX) * 0.35;
      currentY += (y - currentY) * 0.35;

      hLine.style.left = `${currentX}px`;
      hLine.style.top = `${currentY}px`;
      vLine.style.left = `${currentX}px`;
      vLine.style.top = `${currentY}px`;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      const visible = x >= 0 && y >= 0 ? '1' : '0';
      hLine.style.opacity = visible;
      vLine.style.opacity = visible;
      dot.style.opacity = visible;

      raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      container.remove();
      document.getElementById('cyber-cursor-style')?.remove();
      document.documentElement.classList.remove('cursor-hack');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [enabled]);

  return null;
}