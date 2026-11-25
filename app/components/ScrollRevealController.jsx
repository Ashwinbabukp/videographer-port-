/* eslint-disable */
"use client";

import { useEffect, useState } from "react";

export default function ScrollRevealController() {
  const [progress, setProgress] = useState(0);

  // Smooth top scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Whole-page scroll reveal via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = Array.from(
      document.querySelectorAll(
        "main > section:not(#hero), .values-project-card, .skills-deck-card-wrap, .ug-journey-row, .ug-edu-card, .ug-contact-box, footer"
      )
    );

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("sr-visible"));
      return;
    }

    targets.forEach((el, idx) => {
      el.classList.add("sr-reveal");
      // Subtle stagger for cards in the same grid
      if (
        el.classList.contains("values-project-card") ||
        el.classList.contains("skills-deck-card-wrap")
      ) {
        el.style.setProperty("--sr-delay", `${(idx % 4) * 75}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9998,
        pointerEvents: "none",
        background: "rgba(255, 255, 255, 0.04)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#B4F435",
          boxShadow: "0 0 10px rgba(180, 244, 53, 0.65)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
