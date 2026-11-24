'use client';

import HoverImageReveal from './HoverImageReveal';

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
      text: "CONTACT",
      image: {
        src: "/assets/IMG_8947.jpg",
        alt: "Contact",
      },
      link: "#contact",
    },
  };

  return (
    <section className="reveal-hero-section" id="hero">
      {/* Top Navbar */}
      <nav className="hero-navbar">
        <div className="nav-local">LOCAL/ 46° 28&apos; 58.6272&quot; N</div>
        <div className="nav-center-cross" aria-hidden="true">✕</div>
        <a
          href="/ashwin-resume.pdf"
          download="Ashwin_KP_CV.pdf"
          className="nav-download-cv-btn"
        >
          DOWNLOAD CV
        </a>
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
          imageWidth={300}
          imageHeight={420}
          rounded={18}
          offsetX={180}
          offsetY={0}
          followStrength={1.2}
        />
      </div>
    </section>
  );
}
