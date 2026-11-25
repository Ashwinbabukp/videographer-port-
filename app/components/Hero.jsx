'use client';

import HoverImageReveal from './HoverImageReveal';
import MovingGradientButton from './MovingGradientButton';

export default function Hero() {
  const heroItems = {
    itemCount: 4,
    item1: {
      text: "PRODUCT DESIGN",
      color: "#7E828C",
      image: {
        src: "/assets/product-design-screenshot.png",
        alt: "Figma Product Design",
      },
      link: "#work",
    },
    item2: {
      text: "GRAPHICS",
      previewUrl: "https://taskit01.vercel.app/",
      image: {
        src: "/assets/IMG_1900.jpg",
        alt: "Taskit Live Preview",
      },
      link: "https://taskit01.vercel.app/",
    },
    item3: {
      text: "PHOTOGRAPHY",
      image: {
        src: "/assets/photo.png",
        alt: "Photography",
      },
      link: "#experience",
    },
    item4: {
      text: "PEXELS",
      image: {
        src: "/assets/pexel.png",
        alt: "Pexels Photographer — Ashwin K P",
      },
      link: "https://www.pexels.com/@ashwin/",
    },
  };

  return (
    <section className="reveal-hero-section" id="hero">
      {/* Top Navbar */}
      <nav className="hero-navbar">
        <div className="nav-local">LOCAL/ BANGALORE · 12° 58&apos; 18&quot; N</div>
        <div className="nav-center-cross" aria-hidden="true">✕</div>
        <MovingGradientButton
          label="DOWNLOAD CV"
          link="https://drive.google.com/file/d/146IcaZN033Mtf-VgIcsi_fbR5LfFIdHM/view?usp=sharing"
          newTab={true}
          padding="9px 22px"
          rounded={100}
          colors={{
            fill: "#070709",
            hoverFill: "#B4F435",
            textColor: "#FFFFFF",
            hoverTextColor: "#0A0A0B",
          }}
          border={{
            borderWidth: 1.5,
            borderStyle: "solid",
            borderColor: "rgba(255, 255, 255, 0.22)",
          }}
          stroke={{
            headColor: "#B4F435",
            color: "#4d7c0f",
            direction: "cw",
            movement: "continuous",
            count: 1,
            trail: 92,
            speed: 32,
          }}
          font={{
            fontFamily:
              'var(--display, "Clash Display", "Cabinet Grotesk", "Montserrat", sans-serif)',
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            lineHeight: "1.2em",
            textTransform: "uppercase",
          }}
          style={{ minWidth: "auto", minHeight: "auto" }}
        />
      </nav>

      {/* Center Hero Content Matching Reference */}
      <div className="hero-center-content">
        {/* Floating White Dot above Typography */}
        <div className="hero-floating-dot" aria-hidden="true" />

        {/* 4 Stacked Interactive Typography Items */}
        <HoverImageReveal
          items={heroItems}
          align="center"
          rowGap={10}
          textColor="#FFFFFF"
          dimColor="#555861"
          font={{
            fontFamily: 'var(--display, "Clash Display", "Cabinet Grotesk", "Montserrat", sans-serif)',
            fontWeight: 900,
            fontSize: "clamp(38px, 6.6vw, 92px)",
            lineHeight: "0.90em",
            letterSpacing: "-0.04em",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          imageWidth={560}
          imageHeight={315}
          rounded={16}
          offsetX={260}
          offsetY={0}
          followStrength={1.2}
        />
      </div>
    </section>
  );
}
