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
    text: "PLAN",
    src: "/assets/IMG_1899.jpg",
    link: "#work",
  },
  {
    text: "EXECUTE",
    src: "/assets/IMG_1900.jpg",
    link: "#work",
  },
  {
    text: "RESULT",
    src: "/assets/IMG_2171.jpg",
    link: "#work",
  },
];

const DEFAULT_ITEMS = {
  itemCount: 3,
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
};

const DEFAULT_FONT = {
  fontFamily: 'var(--display, "Clash Display", "Montserrat", sans-serif)',
  fontWeight: 900,
  fontSize: "clamp(38px, 6.4vw, 86px)",
  lineHeight: "0.92em",
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
  dimColor = "#36383E",
  align = "center",
  rowGap = 26,
  imageWidth = 300,
  imageHeight = 440,
  rounded = 20,
  offsetX = 180,
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
    Math.min(MAX_ITEMS, data.itemCount || 3)
  );

  const list = [];
  for (let i = 1; i <= count; i++) {
    const it = data[`item${i}`];
    const fallback = DEFAULT_ITEMS_DATA[i - 1];
    list.push({
      text: it?.text ?? fallback?.text ?? `Item ${i}`,
      image: it?.image ?? (fallback ? { src: fallback.src } : undefined),
      previewUrl: it?.previewUrl,
      link: it?.link ?? fallback?.link,
      color: it?.color,
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
        minHeight: "auto",
        overflow: "visible",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: alignToFlex[align] || "center",
        gap: `${rowGap}px`,
        padding: "0 16px",
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
          aspectRatio: "16 / 9",
          maxWidth: "85vw",
          maxHeight: "75vh",
          borderRadius: rounded,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
          boxShadow: "0 28px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.18)",
          backgroundColor: "#111",
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
                background: "#0E0E10",
              }}
            >
              {item.previewUrl ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "#0A0A0B",
                  }}
                >
                  <iframe
                    src={item.previewUrl}
                    title={item.text || "Live Site Preview"}
                    loading="lazy"
                    style={{
                      width: "1280px",
                      height: "720px",
                      border: "none",
                      transform: "scale(0.4375)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                      background: "#0A0A0B",
                    }}
                  />
                </div>
              ) : src ? (
                <img
                  src={src}
                  alt={item.image?.alt || item.text || ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
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
          const defaultColor = item.color || textColor;
          const color = anyActive ? (isHovered ? textColor : dimColor) : defaultColor;
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
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
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
