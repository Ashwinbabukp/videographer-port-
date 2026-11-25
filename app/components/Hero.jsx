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
        src: "/assets/IMG_1899.jpg",
        alt: "Product Design",
      },
      link: "#work",
    },
    item2: {
      text: "GRAPHICS",
      image: {
        src: "/assets/IMG_1900.jpg",
        alt: "Graphics",
      },
      link: "#skills",
    },
    item3: {
      text: "PHOTOGRAPHY",
      image: {
        src: "/assets/IMG_2171.jpg",
        alt: "Photography",
      },
      link: "#experience",
    },
    item4: {
      text: "PEXELS",
      image: {
        src: "/assets/IMG_8947.jpg",
        alt: "Pexels",
      },
      link: "https://www.pexels.com/@ashwin/",
    },
  };

  return (
    <section className="reveal-hero-section" id="hero">
      {/* Top Navbar */}
      <nav className="hero-navbar">
        <div className="nav-local">LOCAL/ 46° 28&apos; 58.6272&quot; N</div>
        <div className="nav-center-cross" aria-hidden="true">✕</div>
        <MovingGradientButton
          label="DOWNLOAD CV"
          link="/ashwin-resume.pdf"
          download="Ashwin_KP_CV.pdf"
          newTab={false}
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
          imageWidth={400}
          imageHeight={520}
          rounded={20}
          offsetX={230}
          offsetY={0}
          followStrength={1.2}
        />
      </div>
    </section>
  );
}
