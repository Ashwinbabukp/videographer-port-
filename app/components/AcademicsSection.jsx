/* eslint-disable */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AcademicsSection() {
  const containerRef = useRef(null);

  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["36px", "-36px"]);

  return (
    <section id="education" ref={containerRef} className="ug-section ug-academics-section">
      <div className="ug-academics-container">
        {/* Left Column: Lime Eyebrow & Giant Headline */}
        <motion.div style={{ y: leftY }} className="ug-academics-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="ug-academics-tag"
          >
            [ 04 / ACADEMICS ]
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="ug-academics-eyebrow"
          >
            Academics @ Nehru College
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="ug-academics-headline"
          >
            “Bachelor of Computer Applications”
          </motion.h2>
        </motion.div>

        {/* Right Column: Monospace Technical Narrative */}
        <motion.div style={{ y: rightY }} className="ug-academics-right">
          <motion.p
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="ug-academics-para"
          >
            Nehru Arts &amp; Science College, Coimbatore • Class of 2022
            <br /><br />
            Completed Bachelor of Computer Applications (BCA) with an in-depth curriculum spanning Core Computer Science, Software Engineering methodologies, Object-Oriented Programming, and Web Architectures.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="ug-academics-para"
          >
            Graduated with First Class distinction and an academic merit of <span className="ug-highlighter">7.8 CGPA</span>. Engineered foundational client-server web apps, relational database models (SQL/RDBMS), and data structure algorithms that directly established the rigor for high-performance frontend and full-stack web engineering.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
