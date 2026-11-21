'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimecode('00:04:23:18');
      return;
    }

    const t0 = Date.now();
    const pad = (n) => (n < 10 ? '0' : '') + n;

    const interval = setInterval(() => {
      const elapsed = Date.now() - t0;
      const totalFrames = Math.floor((elapsed / 1000) * 24);
      const totalSeconds = Math.floor(totalFrames / 24);
      const hours = Math.floor(totalSeconds / 3600) % 100;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const seconds = totalSeconds % 60;
      const frames = totalFrames % 24;

      setTimecode(
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`
      );
    }, 42);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="frame-hero-wrap">
      <div className="frame">
        {/* Cinema Viewfinder Corner Brackets */}
        <i className="tl" aria-hidden="true" />
        <i className="tr" aria-hidden="true" />
        <i className="bl" aria-hidden="true" />
        <i className="br" aria-hidden="true" />

        {/* Viewfinder Center Crosshair */}
        <div className="crosshair" aria-hidden="true">
          <span className="ch-h" />
          <span className="ch-v" />
        </div>

        {/* Top Camera HUD Bar */}
        <div className="bar top-bar">
          <div className="rec-badge">
            <span className="dot" aria-hidden="true" />
            <span>REC</span>
          </div>
          <div id="tc" className="timecode">
            {timecode}
          </div>
          <div className="fps-badge">24 FPS • 4K UHD</div>
        </div>

        {/* Center Hero Content */}
        <div className="frame-content">
          <h1>Videos that stop the scroll.</h1>
          <p className="lede">
            423+ Reels, 1.9M+ Pexels views and 5+ years behind the camera. Ready
            to start now.
          </p>

          <div className="btns">
            <a href="#work" className="btn-primary">
              See my work
            </a>
            <a
              href="https://wa.me/917034333646"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Connect
            </a>
          </div>

          <div className="hs">
            <div>
              <b>423+</b>
              <span>Reels Produced</span>
            </div>
            <div>
              <b>1.9M+</b>
              <span>Pexels Views</span>
            </div>
            <div>
              <b>5+</b>
              <span>Years Experience</span>
            </div>
          </div>
        </div>

        {/* Bottom Camera Telemetry Bar */}
        <div className="bar bottom-bar">
          <div>ISO 400 • 5600K</div>
          <div>SHUTTER 1/50 • F/1.8</div>
          <div>RAW • LOG 10-BIT</div>
        </div>
      </div>
    </div>
  );
}
