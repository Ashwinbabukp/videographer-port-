'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let x = 50;
    let y = 45;
    let tx = 50;
    let ty = 45;
    let animId;

    const onMouseMove = (e) => {
      const rect = glow.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      tx = Math.max(10, Math.min(90, px));
      ty = Math.max(10, Math.min(90, py));
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const t = Date.now();
      // Combine sine/cosine ambient drift with target coords
      const ambientX = 50 + 26 * Math.sin(t / 2600);
      const ambientY = 45 + 14 * Math.cos(t / 3300);

      // Smooth interpolation
      const targetX = tx !== 50 ? (tx * 0.7 + ambientX * 0.3) : ambientX;
      const targetY = ty !== 45 ? (ty * 0.7 + ambientY * 0.3) : ambientY;

      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;

      glow.style.setProperty('--mx', `${x}%`);
      glow.style.setProperty('--my', `${y}%`);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hero">
      <div ref={glowRef} className="glow" />
      <span className="yr">2026</span>
      
      <div className="cp">
        <p className="eyebrow">
          <i className="live" aria-hidden="true" />
          Available now in Bangalore
        </p>
        <h1>Videos that stop the scroll.</h1>
        <p className="lede">
          423+ Reels, 1.9M+ Pexels views and 5+ years behind the camera. Ready to start now.
        </p>
        <a className="ghost" href="#work">
          See my work
        </a>
      </div>

      <a className="sd" href="#work" aria-label="Scroll down to selected work">
        <svg
          width="16"
          height="26"
          viewBox="0 0 16 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v21M2 17l6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
