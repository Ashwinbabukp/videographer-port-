/* eslint-disable */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Helper to highlight key technologies with the clean normal highlighter
function highlightKeywords(text) {
  if (!text) return text;
  const parts = text.split(/(Figma|Next\.js|React(?:\.js)?)/g);
  return parts.map((part, i) => {
    if (/^(Figma|Next\.js|React(?:\.js)?)$/.test(part)) {
      return (
        <span key={i} className="ug-highlighter">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function ProfessionalJourney() {
  const containerRef = useRef(null);

  // Scroll parallax for subtle background shift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  const stages = [
    {
      id: "faatlab",
      align: "left",
      tag: "[ 03.1 / UI DEVELOPER • FAATLAB TECHNOLOGIES ]",
      quote:
        "“Built 8+ commercial web applications, cut page load times by 30%, and translated 15+ complex Figma design systems into scalable Next.js & React production code.”",
      company: "FaatLab Technologies, Kochi",
      period: "Jun 2024 – Jan 2026 • Full-time",
      narrative:
        "Architected state with Redux Toolkit and Context API, integrated REST APIs with client views, and engineered scroll-triggered GSAP timeline animations. Automated production deployments on Vercel with GitHub Actions CI/CD and hybrid SSR/SSG rendering.",
      stack: [
        "React.js",
        "Next.js",
        "Figma",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "Redux Toolkit",
        "Vercel",
      ],
    },
    {
      id: "luminar",
      align: "right",
      tag: "[ 03.2 / MERN STACK DEVELOPER • LUMINAR TECHNOLAB ]",
      quote:
        "“Developed full-stack modules connecting React user interfaces with Node.js, Express, and MongoDB backends with robust API integration.”",
      company: "Luminar Technolab, Kochi",
      period: "Mar 2023 – Sep 2023 • Internship",
      narrative:
        "Built pixel-accurate, responsive user interfaces using HTML5, CSS3, JavaScript, and React.js. Consumed RESTful endpoints, handled HTTP error boundaries, and collaborated in team Git version control workflows.",
      stack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "Git",
      ],
    },
  ];

  return (
    <div ref={containerRef} className="ug-journey-fullscreen">
      {stages.map((stage) => {
        const isLeft = stage.align === "left";

        return (
          <section
            key={stage.id}
            className={`ug-journey-stage ${isLeft ? "ug-stage-left" : "ug-stage-right"}`}
          >
            {/* Top Monospace Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`ug-journey-top-tag ${isLeft ? "text-left" : "text-right"}`}
            >
              <span>{stage.tag}</span>
            </motion.div>

            {/* Giant Typographic Quote */}
            <motion.blockquote
              initial={{
                opacity: 0,
                y: 50,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`ug-journey-big-quote ${isLeft ? "ug-quote-left" : "ug-quote-right"
                }`}
            >
              {highlightKeywords(stage.quote)}
            </motion.blockquote>

            {/* Bottom Monospace Narrative & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`ug-journey-bottom-meta ${isLeft ? "ug-meta-right" : "ug-meta-left"
                }`}
            >
              <div className="ug-journey-company-heading">
                {stage.company} • {stage.period}
              </div>
              <p className="ug-journey-narrative">
                {highlightKeywords(stage.narrative)}
              </p>
              <div
                className={`ug-journey-stack-row ${isLeft ? "justify-end" : "justify-start"
                  }`}
              >
                {stage.stack.map((t, idx) => {
                  const isHigh = /(React|Next|Figma)/i.test(t);
                  return (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`ug-journey-stack-chip ${isHigh ? "is-highlighted" : ""
                        }`}
                    >
                      {t}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
