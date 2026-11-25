/* eslint-disable */
"use client";

function StackLogo({ type, isGreenCard }) {
  const strokeColor = isGreenCard
    ? "rgba(10, 10, 11, 0.38)"
    : "rgba(180, 244, 53, 0.42)";
  const fillColor = isGreenCard
    ? "rgba(10, 10, 11, 0.32)"
    : "rgba(180, 244, 53, 0.32)";

  if (type === "react") {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="3.2" fill={fillColor} />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          stroke={strokeColor}
          strokeWidth="1.8"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          transform="rotate(60 24 24)"
          stroke={strokeColor}
          strokeWidth="1.8"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          transform="rotate(120 24 24)"
          stroke={strokeColor}
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === "figma") {
    return (
      <svg
        width="46"
        height="54"
        viewBox="0 0 38 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
          fill={fillColor}
        />
        <path
          d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
          fill={fillColor}
        />
        <path
          d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
          fill={fillColor}
        />
        <path
          d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
          fill={fillColor}
        />
        <path
          d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
          fill={fillColor}
        />
      </svg>
    );
  }

  if (type === "redux") {
    return (
      <svg
        width="52"
        height="52"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M31.5 31.2C33.4 31.1 35 29.5 35 27.5C35 25.6 33.4 24 31.5 24C31.3 24 31.1 24 30.9 24.1C29.4 18.8 25.1 15 19.8 15C15.8 15 12.3 17.2 10.5 20.5"
          stroke={strokeColor}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M17.5 17.8C15.6 17.9 14 19.5 14 21.5C14 23.4 15.6 25 17.5 25C17.7 25 17.9 25 18.1 24.9C19.6 30.2 23.9 34 29.2 34C33.2 34 36.7 31.8 38.5 28.5"
          stroke={strokeColor}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill={fillColor} />
        <circle cx="10" cy="21" r="2.6" fill={fillColor} />
        <circle cx="38" cy="28" r="2.6" fill={fillColor} />
      </svg>
    );
  }

  if (type === "node") {
    return (
      <svg
        width="52"
        height="52"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M24 5L40.5 14.5V33.5L24 43L7.5 33.5V14.5L24 5Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M25.5 15L18 25H24L22.5 33L30 23H24L25.5 15Z"
          fill={fillColor}
        />
      </svg>
    );
  }

  if (type === "webgl") {
    return (
      <svg
        width="52"
        height="52"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M24 6L40 15V33L24 42L8 33V15L24 6Z"
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M8 15L24 24L40 15M24 24V42"
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // git / devops
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="15" cy="12" r="3.5" stroke={strokeColor} strokeWidth="2" />
      <circle cx="15" cy="36" r="3.5" stroke={strokeColor} strokeWidth="2" />
      <circle cx="33" cy="20" r="3.5" stroke={strokeColor} strokeWidth="2" />
      <path
        d="M15 15.5V32.5M15 28C15 23 33 25 33 23.5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const DECK_CARDS = [
  {
    category: "Frontend",
    logo: "react",
    variant: "black",
    tilt: "-3.5deg",
    offsetY: "8px",
    summary:
      "React.js, Next.js (App Router, SSR/SSG), TypeScript, JavaScript (ES6+), HTML5, CSS3 & Tailwind CSS.",
    meta: "07 tools",
    tools: [
      "React.js",
      "Next.js (App Router, SSR/SSG)",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    category: "Styling / UI",
    logo: "figma",
    variant: "transparent",
    tilt: "0deg",
    offsetY: "-10px",
    pill: "Figma → Code",
    summary:
      "Bootstrap, Material UI, GSAP, Framer Motion, Figma & Adobe XD.",
    meta: "06 tools",
    tools: [
      "Figma",
      "GSAP",
      "Framer Motion",
      "Material UI",
      "Bootstrap",
      "Adobe XD",
    ],
  },
  {
    category: "State, APIs & Auth",
    logo: "redux",
    variant: "green",
    tilt: "3deg",
    offsetY: "12px",
    summary:
      "Redux Toolkit, Context API, REST APIs, Google OAuth 2.0, Email OTP & Session Cookies.",
    meta: "06 tools",
    tools: [
      "Redux Toolkit",
      "Context API",
      "REST APIs",
      "Google OAuth 2.0",
      "Email OTP Verification",
      "Secure HTTP Session Cookies",
    ],
  },
  {
    category: "Backend / Databases",
    logo: "node",
    variant: "transparent",
    tilt: "-3deg",
    offsetY: "6px",
    summary:
      "Node.js, Express.js, Supabase (PostgreSQL), MongoDB, Next.js API Routes & Nodemailer.",
    meta: "06 tools",
    tools: [
      "Node.js",
      "Express.js",
      "Supabase (PostgreSQL)",
      "MongoDB",
      "Next.js API Routes",
      "Nodemailer",
    ],
  },
  {
    category: "3D / Creative Coding",
    logo: "webgl",
    variant: "black",
    tilt: "1.5deg",
    offsetY: "-6px",
    summary:
      "WebGL2, GLSL Fragment and Vertex Shaders, SDF Raymarching & OKLab Color Space.",
    meta: "04 tools",
    tools: [
      "WebGL2",
      "GLSL Fragment & Vertex Shaders",
      "SDF Raymarching",
      "OKLab Color Space",
    ],
  },
  {
    category: "Tools",
    logo: "git",
    variant: "transparent",
    tilt: "3.5deg",
    offsetY: "10px",
    summary:
      "Git/GitHub, GitHub Actions (CI/CD), Vercel, Vite, Webpack 5, ESLint, Cursor & Claude Code.",
    meta: "08 tools",
    tools: [
      "Git/GitHub",
      "GitHub Actions (CI/CD)",
      "Vercel",
      "Vite",
      "Webpack 5",
      "ESLint",
      "Cursor",
      "Claude Code",
    ],
  },
];

export default function SkillsDeck() {
  return (
    <section id="skills" className="skills-deck-section">
      <div className="skills-deck-inner">
        <div className="skills-deck-header">
          <span className="ug-index">[ 02 / TECHNICAL ARSENAL ]</span>
          <h2 className="skills-deck-title">
            Skills &amp;
            <br />
            Engineering Stack<span style={{ color: "#B4F435" }}>.</span>
          </h2>
        </div>

        <div className="skills-deck-grid">
          {DECK_CARDS.map((card) => {
            const isGreen = card.variant === "green";
            return (
              <div
                key={card.category}
                className="skills-deck-card-wrap"
                tabIndex={0}
                style={{
                  "--card-tilt": card.tilt,
                  "--card-offset-y": card.offsetY,
                }}
              >
                <div className="skills-deck-flipper">
                  {/* Front Face */}
                  <div className={`skills-deck-face skills-deck-front is-${card.variant}`}>
                    <div className="skills-card-top">
                      <h3 className="skills-card-title">{card.category}</h3>
                      <div className="skills-card-logo">
                        <StackLogo type={card.logo} isGreenCard={isGreen} />
                      </div>
                    </div>

                    <div className="skills-card-bottom">
                      <p className="skills-card-summary">{card.summary}</p>
                      <div className="skills-card-footer">
                        <span className="skills-card-meta">{card.meta}</span>
                        {card.pill && (
                          <span className="skills-card-float-pill">
                            {card.pill}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Back Face (Tools List on Hover Flip) */}
                  <div className={`skills-deck-face skills-deck-back is-${card.variant}`}>
                    <div className="skills-back-header">
                      <span className="skills-back-label">{card.category}</span>
                      <span className="skills-back-count">{card.meta}</span>
                    </div>

                    <div className="skills-back-tools">
                      {card.tools.map((tool) => {
                        const isHighlight = /(React|Next|Figma)/i.test(tool);
                        return (
                          <span
                            key={tool}
                            className={`skills-back-tool-pill ${isHighlight ? "is-highlight" : ""}`}
                          >
                            {tool}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
