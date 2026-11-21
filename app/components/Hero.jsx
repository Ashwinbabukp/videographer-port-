'use client';

import HoverImageReveal from './HoverImageReveal';

export default function Hero() {
  const heroItems = {
    itemCount: 3,
    item1: {
      text: "PLAN",
      image: {
        src: "/assets/IMG_1899.jpg",
        alt: "Plan - Content strategy, audience analytics and scripting"
      },
      link: "#work",
    },
    item2: {
      text: "EXECUTE",
      image: {
        src: "/assets/IMG_1900.jpg",
        alt: "Execute - Multi-camera shoot, lighting, framing, speed ramps & kinetic edits"
      },
      link: "#work",
    },
    item3: {
      text: "RESULT",
      image: {
        src: "/assets/IMG_2171.jpg",
        alt: "Result - 10M+ views, viral engagement and national publication features"
      },
      link: "#work",
    },
  };

  return (
    <div className="reveal-hero-section">
      {/* Top Eyebrow Badge */}
      <div className="hero-eyebrow-wrap">
        <div className="hero-status-pill">
          <span className="dot" aria-hidden="true" />
          <span>Available now in Bangalore • 2026</span>
        </div>
      </div>

      {/* 3 Interactive Stages: PLAN • EXECUTE • RESULT with Hover Reveal */}
      <HoverImageReveal
        items={heroItems}
        align="center"
        rowGap={28}
        imageWidth={310}
        imageHeight={460}
        rounded={22}
        offsetX={180}
        offsetY={0}
        followStrength={1.2}
      />

      {/* Hero Footnote & Quick Actions */}
      <div className="hero-footer-wrap">
        <p className="hero-subline">
          From concept and strategy to high-impact production and viral results. 423+ Reels, 10M+ views, ready to start immediately.
        </p>

        <div className="hero-action-row">
          <div className="hero-cta-btns">
            <a href="#work" className="btn-primary">
              See Selected Work ↓
            </a>
            <a
              href="https://wa.me/917034333646"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Get in Touch
            </a>
          </div>

          <div className="hero-metric-pills">
            <span><b>10.2M+</b> Total Views</span>
            <span className="sep">•</span>
            <span><b>423+</b> Reels Produced</span>
            <span className="sep">•</span>
            <span><b>5+</b> Yrs Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}
