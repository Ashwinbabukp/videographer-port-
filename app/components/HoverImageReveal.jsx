/* eslint-disable */
// Hover Image Reveal — Originkit adapted for Ashwin K P Portfolio

"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const MAX_ITEMS = 6;

const DEFAULT_ITEMS_DATA = [
  {
    text: "STOP THE SCROLL",
    src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    link: "#work",
  },
  {
    text: "APPLY EUROPA",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    link: "https://youtu.be/oHK9C0FpCyA",
  },
  {
    text: "APPLEMAX REELS",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.instagram.com/applemax_vengara/",
  },
  {
    text: "PEXELS GLOBAL",
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.pexels.com/@ashwin/",
  },
  {
    text: "DIRECT & EDIT",
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    link: "https://wa.me/917034333646",
  },
];

const DEFAULT_ITEMS = {
  itemCount: 5,
  item1: {
    text: DEFAULT_ITEMS_DATA[0].text,
    image: { src: DEFAULT_ITEMS_DATA[0].src },
    link: DEFAULT_ITEMS_DATA[0].link,
  },
  item2: {
    text: DEFAULT_ITEMS_DATA[1].text,
    image: { src: DEFAULT_ITEMS_DATA[1].src },
    link: DEFAULT_ITEMS_DATA[1].link,
  },
  item3: {
    text: DEFAULT_ITEMS_DATA[2].text,
    image: { src: DEFAULT_ITEMS_DATA[2].src },
    link: DEFAULT_ITEMS_DATA[2].link,
  },
  item4: {
    text: DEFAULT_ITEMS_DATA[3].text,
    image: { src: DEFAULT_ITEMS_DATA[3].src },
    link: DEFAULT_ITEMS_DATA[3].link,
  },
  item5: {
    text: DEFAULT_ITEMS_DATA[4].text,
    image: { src: DEFAULT_ITEMS_DATA[4].src },
    link: DEFAULT_ITEMS_DATA[4].link,
  },
};

const DEFAULT_FONT = {
  fontFamily: 'var(--display, "Bricolage Grotesque", sans-serif)',
  fontWeight: 800,
  fontSize: "clamp(38px, 6.2vw, 68px)",
  lineHeight: "0.95em",
  letterSpacing: "-0.04em",
  textAlign: "center",
  textTransform: "uppercase",
};

const DEFAULT_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

const alignToFlex = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const alignToText = {
  left: "left",
  center: "center",
  right: "right",
};

export function BaseHoverImageReveal({
  items = DEFAULT_ITEMS,
  font = DEFAULT_FONT,
  textColor = "#F2F0EA",
  dimColor = "#3A3D45",
  align = "center",
  rowGap = 20,
  imageWidth = 280,
  imageHeight = 370,
  rounded = 18,
  offsetX = 160,
  offsetY = 0,
  followStrength = 1.2,
  transition = DEFAULT_TRANSITION,
  backgroundColor = "transparent",
  style,
}) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const stiffness = 60 + followStrength * 5;
  const springCfg = { stiffness, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const data = items || DEFAULT_ITEMS;
  const count = Math.max(
    1,
    Math.min(MAX_ITEMS, data.itemCount || 5)
  );

  const list = [];
  for (let i = 1; i <= count; i++) {
    const it = data[`item${i}`];
    const fallback = DEFAULT_ITEMS_DATA[i - 1];
    list.push({
      text: it?.text ?? fallback?.text ?? `Item ${i}`,
      image: it?.image ?? (fallback ? { src: fallback.src } : undefined),
      link: it?.link ?? fallback?.link,
    });
  }
  const anyActive = hovered != null;

  const onMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + offsetX);
    rawY.set(e.clientY - rect.top + offsetY);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "560px",
        overflow: "hidden",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: alignToFlex[align] || "center",
        gap: `${rowGap}px`,
        padding: "60px 16px",
        boxSizing: "border-box",
        cursor: "default",
        ...font,
        ...style,
      }}
    >
      {/* Floating Image Preview on Hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: imageWidth,
          height: imageHeight,
          borderRadius: rounded,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 10,
          boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15)",
        }}
        animate={{ opacity: anyActive ? 1 : 0, scale: anyActive ? 1 : 0.92 }}
        transition={transition}
      >
        {list.map((item, i) => {
          const src = item.image?.src;
          const yPos =
            hovered == null
              ? "100%"
              : i < hovered
                ? "-100%"
                : i > hovered
                  ? "100%"
                  : "0%";
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: yPos }}
              transition={transition}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: "#111",
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={item.image?.alt || item.text || ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#333,#111)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Item List with Marquee Roll Effect on Hover */}
      <div
        onMouseLeave={() => setHovered(null)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: alignToFlex[align] || "center",
          gap: `${rowGap}px`,
          width: "100%",
        }}
      >
        {list.map((item, i) => {
          const isHovered = hovered === i;
          const color = anyActive ? (isHovered ? textColor : dimColor) : textColor;
          const copyStyle = {
            display: "block",
            color,
            transition: "color 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            whiteSpace: "nowrap",
            textAlign: alignToText[align] || "center",
          };

          const inner = (
            <motion.div
              style={{ position: "relative" }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={transition}
            >
              <span style={copyStyle}>{item.text}</span>
              <span
                aria-hidden
                style={{
                  ...copyStyle,
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                }}
              >
                {item.text}
              </span>
            </motion.div>
          );

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              style={{
                overflow: "hidden",
                cursor: item.link ? "pointer" : "default",
                userSelect: "none",
              }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HoverImageReveal(props) {
  return <BaseHoverImageReveal {...props} />;
}
