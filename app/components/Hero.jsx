'use client';

import HoverImageReveal from './HoverImageReveal';

export default function Hero() {
  const heroItems = {
    itemCount: 5,
    item1: {
      text: "STOP THE SCROLL",
      image: {
        src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
        alt: "High energy cinematic video production"
      },
      link: "#work",
    },
    item2: {
      text: "APPLY EUROPA",
      image: {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
        alt: "Brand commercial shot and edited by Ashwin"
      },
      link: "https://youtu.be/oHK9C0FpCyA",
    },
    item3: {
      text: "APPLEMAX REELS",
      image: {
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
        alt: "AppleMax retail viral reels"
      },
      link: "https://www.instagram.com/applemax_vengara/",
    },
    item4: {
      text: "PEXELS 1.9M+",
      image: {
        src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
        alt: "Worldwide stock video clips and photography"
      },
      link: "https://www.pexels.com/@ashwin/",
    },
    item5: {
      text: "DIRECT & EDIT",
      image: {
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
        alt: "Cinematography and DaVinci Resolve editing"
      },
      link: "https://wa.me/917034333646",
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

      {/* Interactive Hover Image Reveal Component */}
      <HoverImageReveal
        items={heroItems}
        align="center"
        rowGap={18}
        imageWidth={300}
        imageHeight={400}
        rounded={20}
        offsetX={180}
        offsetY={0}
        followStrength={1.2}
      />

      {/* Hero Footnote & Quick Actions */}
      <div className="hero-footer-wrap">
        <p className="hero-subline">
          423+ Reels, 1.9M+ Pexels views and 5+ years behind the camera. Ready to start immediately.
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
            <span><b>423+</b> Reels</span>
            <span className="sep">•</span>
            <span><b>1.9M+</b> Views</span>
            <span className="sep">•</span>
            <span><b>5+</b> Yrs Behind Camera</span>
          </div>
        </div>
      </div>
    </div>
  );
}
