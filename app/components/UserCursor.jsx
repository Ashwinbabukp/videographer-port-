/* eslint-disable */
// User Cursor — Originkit adapted for Ashwin K P Portfolio

"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

const COMPONENT_DEFAULTS = {
  color: "#FFFFFF",
  textColor: "#0A0A0B",
  size: 31,
  pressScale: 0.92,
  offsetX: 0,
  offsetY: 0,
  showLabel: true,
  name: "Hey",
  labelTiltStrength: 25,
  labelOffsetUseDefault: true,
  labelOffsetX: 25,
  labelOffsetY: 12,
  durationMs: 5000,
};

export default function UserCursor(props = {}) {
  const merged = { ...COMPONENT_DEFAULTS, ...props };
  const {
    name,
    arrow,
    label,
    color,
    textColor,
    size,
    labelTiltStrength,
    showLabel,
    offsetX,
    offsetY,
    labelOffsetX,
    labelOffsetY,
    labelOffsetUseDefault,
    pressScale,
    durationMs,
  } = merged;

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [labelExpired, setLabelExpired] = useState(false);
  const [inProjectSection, setInProjectSection] = useState(false);
  const [overInput, setOverInput] = useState(false);

  // Touch detection
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsTouchDevice(!!mql.matches);
    sync();
    if (mql.addEventListener) {
      mql.addEventListener("change", sync);
      return () => mql.removeEventListener("change", sync);
    }
    return undefined;
  }, []);

  // Show the "Hey" label only for 5 seconds when the website opens, then keep only the cursor arrow
  useEffect(() => {
    if (isTouchDevice) return;
    const expireTimer = setTimeout(() => {
      setLabelExpired(true);
    }, durationMs);

    return () => {
      clearTimeout(expireTimer);
    };
  }, [durationMs, isTouchDevice]);

  // Hide native OS cursor globally via html.has-custom-cursor (except inside inputs/textareas)
  useEffect(() => {
    if (typeof document === "undefined" || isTouchDevice) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouchDevice]);

  const arrowSpring = useMemo(
    () => ({ stiffness: 380, damping: 32, mass: 0.6 }),
    []
  );
  const labelSpringCfg = useMemo(
    () => ({ stiffness: 220, damping: 26, mass: 0.7 }),
    []
  );

  const resolvedOffset = useMemo(
    () => ({ x: offsetX, y: offsetY }),
    [offsetX, offsetY]
  );

  const resolvedLabelOffset = useMemo(() => {
    if (labelOffsetUseDefault) {
      return { x: size * 0.9, y: size * 0.2 + 6 };
    }
    return { x: labelOffsetX, y: labelOffsetY };
  }, [labelOffsetUseDefault, labelOffsetX, labelOffsetY, size]);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const arrowX = useSpring(mouseX, arrowSpring);
  const arrowY = useSpring(mouseY, arrowSpring);
  const labelX = useSpring(mouseX, labelSpringCfg);
  const labelY = useSpring(mouseY, labelSpringCfg);

  const scaleMV = useMotionValue(1);
  useEffect(() => {
    const controls = animate(scaleMV, pressed ? pressScale : 1, {
      type: "spring",
      stiffness: 500,
      damping: 28,
      mass: 0.5,
    });
    return () => controls.stop();
  }, [pressed, pressScale, scaleMV]);

  const labelTiltTarget = useMotionValue(0);
  const labelRotation = useSpring(labelTiltTarget, {
    stiffness: 200,
    damping: 24,
    mass: 0.6,
  });

  const lastSampleRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice) return;
    if (typeof window === "undefined") return;

    // Place initially near center-right so user sees "Hey" right when site opens
    const startX = Math.round(window.innerWidth * 0.54);
    const startY = Math.round(window.innerHeight * 0.48);
    mouseX.set(startX + resolvedOffset.x);
    mouseY.set(startY + resolvedOffset.y);
    arrowX.set(startX + resolvedOffset.x);
    arrowY.set(startY + resolvedOffset.y);
    labelX.set(startX + resolvedOffset.x);
    labelY.set(startY + resolvedOffset.y);
    setHovering(true);

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const last = lastSampleRef.current;
      let vx = 0;
      let vy = 0;
      if (last) {
        const dt = Math.max(1, now - last.t);
        vx = ((x - last.x) / dt) * 1000;
        vy = ((y - last.y) / dt) * 1000;
      }
      lastSampleRef.current = { x, y, t: now };

      mouseX.set(x + resolvedOffset.x);
      mouseY.set(y + resolvedOffset.y);

      const speed = Math.hypot(vx, vy);
      const norm = Math.min(1, speed / 1500);
      const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
      labelTiltTarget.set(sign * norm * labelTiltStrength);
      setHovering(true);

      const overProjects =
        typeof e.target?.closest === "function" && !!e.target.closest("#work");
      setInProjectSection(overProjects);

      const isInput =
        typeof e.target?.closest === "function" &&
        !!e.target.closest("textarea, input, select, [contenteditable='true']");
      setOverInput(isInput);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setHovering(false);
      setInProjectSection(false);
      setOverInput(false);
      lastSampleRef.current = null;
      labelTiltTarget.set(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      setPressed(false);
    };
  }, [
    isTouchDevice,
    labelTiltStrength,
    resolvedOffset.x,
    resolvedOffset.y,
    mouseX,
    mouseY,
    arrowX,
    arrowY,
    labelX,
    labelY,
    labelTiltTarget,
  ]);

  const labelTranslateX = useTransform(
    labelX,
    (v) => v + resolvedLabelOffset.x
  );
  const labelTranslateY = useTransform(
    labelY,
    (v) => v + resolvedLabelOffset.y
  );

  const arrowContent = useMemo(() => {
    if (typeof arrow === "function") {
      try {
        return arrow(color);
      } catch {
        return null;
      }
    }
    if (arrow !== undefined && arrow !== null) return arrow;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible" }}
      >
        <path
          d="M5 3 L23 14 L14 16 L11 24 Z"
          fill={color}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      </svg>
    );
  }, [arrow, color, size]);

  const activeText = inProjectSection ? "View" : name;

  const labelContent = useMemo(() => {
    if (label !== undefined && label !== null) return label;
    return (
      <div
        style={{
          color: textColor,
          fontSize: Math.max(7, size * 0.43),
          lineHeight: 1.1,
          fontWeight: 700,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          whiteSpace: "nowrap",
          letterSpacing: 0.1,
        }}
      >
        {activeText}
      </div>
    );
  }, [label, activeText, textColor, size]);

  if (isTouchDevice) return null;

  const cursorVisible = hovering && !overInput;
  const labelVisible = hovering && !overInput && (!labelExpired || inProjectSection);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {showLabel && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x: labelTranslateX,
            y: labelTranslateY,
            rotate: labelRotation,
            scale: scaleMV,
            background: color,
            borderRadius: 999,
            padding: `${size * 0.18}px ${size * 0.38}px`,
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)",
            opacity: labelVisible ? 1 : 0,
            transformOrigin: "0% 50%",
            transition: "opacity 200ms ease",
            willChange: "transform, opacity",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {labelContent}
        </motion.div>
      )}

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: arrowX,
          y: arrowY,
          scale: scaleMV,
          width: size,
          height: size,
          opacity: cursorVisible ? 1 : 0,
          transformOrigin: "0% 0%",
          transition: "opacity 200ms ease",
          willChange: "transform, opacity",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: size, height: size }}>{arrowContent}</div>
      </motion.div>
    </div>
  );
}
