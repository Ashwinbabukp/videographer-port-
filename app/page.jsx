import Hero from './components/Hero';
import UserCursor from './components/UserCursor';
import ScrollRevealController from './components/ScrollRevealController';
import AISearchSection from './components/AISearchSection';
import SkillsDeck from './components/SkillsDeck';
import PixelTrail from './components/PixelTrail';
import ProfessionalJourney from './components/ProfessionalJourney';
import AcademicsSection from './components/AcademicsSection';
import { Globe, MessagesSquare, GraduationCap, Sparkles, ArrowUpRight } from 'lucide-react';

// Helper to highlight key technologies with the clean normal highlighter
function highlightKeywords(text) {
  if (!text) return text;
  const parts = text.split(/(Figma|Next\.js(?: \d+)?|React(?:\.js|\s*\d+)?)/g);
  return parts.map((part, i) => {
    if (/^(Figma|Next\.js(?: \d+)?|React(?:\.js|\s*\d+)?)$/i.test(part)) {
      return (
        <span key={i} className="ug-highlighter">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function Home() {
  const projects = [
    {
      index: '01',
      title: 'Taskit',
      subtitle: 'Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Supabase',
      badge: 'Full Stack & 3D WebGL',
      url: 'https://taskit01.vercel.app',
      highlights: [
        'Built full-stack frontend with Next.js 16 App Router, React 19, TypeScript, and custom CSS design tokens.',
        'Engineered Supabase (PostgreSQL) backend with Next.js API Routes and automated Nodemailer email notifications.',
        'Implemented Google OAuth 2.0 and email OTP verification with secure HTTP session cookies.',
        'Rendered interactive 3D visuals using WebGL2, GLSL vertex & fragment shaders, SDF raymarching, and OKLab color space.',
      ],
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Supabase', 'WebGL2', 'GLSL'],
    },
    {
      index: '02',
      title: 'SANS — Quotes Social Platform',
      subtitle: 'React.js, Next.js, TypeScript, Tailwind CSS, Google OAuth',
      badge: 'Social Media Web App',
      url: 'https://sans01.vercel.app',
      highlights: [
        'Designed & deployed a Reels-style quote-sharing feed with interactive mood filter pills and instant Vercel edge delivery.',
        'Engineered client-side quote editor featuring dynamic font switching, live backgrounds, sticker overlays, and emoji picker.',
        'Constructed modular quote interaction cards (like, comment, save, share, follow), user dashboards, and OAuth authentication.',
      ],
      tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'OAuth 2.0'],
    },
    {
      index: '03',
      title: 'Apply Europa',
      subtitle: 'React.js, Next.js, TypeScript, Tailwind CSS, Figma Specs',
      badge: 'European Education Portal',
      url: 'https://applyeuropa.com',
      figmaUrl: 'https://www.figma.com/design/uve2zKh9reAoFHNVlHaKaP/Apply-Europa?node-id=0-1&t=U4FkYsc3ODfjFvmy-1',
      highlights: [
        'Converted pixel-perfect Figma design systems into a high-converting, fully responsive study-abroad discovery platform.',
        'Architected comprehensive university directories and multi-step student workflow forms integrated with REST APIs.',
        'Implemented SEO-friendly dynamic routing with optimized metadata, cutting bounce rates and enhancing organic reach.',
      ],
      tags: ['Figma to Code', 'Next.js', 'React.js', 'REST APIs', 'SEO Dynamic Routing'],
    },
    {
      index: '04',
      title: 'Leadz Study Abroad',
      subtitle: 'React.js, Tailwind CSS, JavaScript, GSAP Timeline Animations',
      badge: 'Consultancy Web Platform',
      url: 'https://leadzstudyabroad.com',
      highlights: [
        'Transformed custom multi-page Figma mockups into a responsive, high-performance consultancy website.',
        'Integrated custom GSAP scroll-triggered timeline animations and smooth micro-interactions across key landing sections.',
        'Developed accessible, validated lead capture and enquiry forms with cross-device and mobile touch optimization.',
      ],
      tags: ['React.js', 'GSAP Animation', 'Tailwind CSS', 'Accessible Forms', 'Responsive UI'],
    },
  ];

  const skillClusters = [
    {
      category: 'Frontend Core',
      icon: '⚡',
      skills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS v4', 'SSR / SSG'],
    },
    {
      category: 'Styling & Animation',
      icon: '🎨',
      skills: ['GSAP Timeline', 'Framer Motion', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Figma Design Systems', 'Adobe XD'],
    },
    {
      category: 'State & API Architecture',
      icon: '🔄',
      skills: ['Redux Toolkit', 'Context API', 'RESTful APIs', 'Client-Side State', 'Data Fetching & Cache'],
    },
    {
      category: 'Backend & Database',
      icon: '🗄️',
      skills: ['Node.js', 'Express.js', 'Supabase (PostgreSQL)', 'MongoDB', 'Next.js API Routes', 'Nodemailer'],
    },
    {
      category: '3D & Creative Coding',
      icon: '🌐',
      skills: ['WebGL2', 'GLSL Fragment Shaders', 'Vertex Shaders', 'SDF Raymarching', 'OKLab Color Space'],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git & GitHub', 'GitHub Actions (CI/CD)', 'Vercel Deployment', 'Vite', 'Webpack 5', 'ESLint', 'Cursor / AI Tooling'],
    },
  ];

  const experiences = [
    {
      role: 'UI Developer',
      company: 'FaatLab Technologies, Kochi',
      period: 'Jun 2024 – Jan 2026',
      badge: 'Full-time',
      bullets: [
        'Built 8+ commercial web applications (15+ responsive pages) from Figma & Adobe XD using React, Next.js, TypeScript, and Tailwind CSS.',
        'Integrated front-end client views with backend REST APIs, managed application state with Redux Toolkit / Context API, and developed GSAP timeline animations.',
        'Cut page load times by up to 30% through modular code-splitting, asset lazy loading, and hybrid SSR/SSG rendering.',
        'Automated production deployments on Vercel with GitHub Actions CI/CD; actively reviewed PRs and led front-end release cycles.',
      ],
      tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Redux Toolkit', 'Vercel'],
    },
    {
      role: 'MERN Stack / UI Developer (Intern)',
      company: 'Luminar Technolab, Kochi',
      period: 'Mar 2023 – Sep 2023',
      badge: 'Internship',
      bullets: [
        'Built pixel-accurate, responsive UI screens using HTML5, CSS3, Bootstrap, JavaScript, and React.js.',
        'Developed full-stack modules connecting React user interfaces with Node.js, Express.js, and MongoDB backends.',
        'Consumed RESTful APIs, handled HTTP error boundaries, and collaborated in team Git version control workflows.',
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Git'],
    },
  ];

  return (
    <main>
      {/* Whole-page Scroll Reveal & Progress Bar */}
      <ScrollRevealController />

      {/* 5-second Opening Custom Cursor ("Hey") */}
      <UserCursor name="Hey" durationMs={5000} />

      {/* Hero Section */}
      <Hero />

      {/* AI Portfolio Search Section */}
      <AISearchSection />

      {/* [ 01 / FEATURED PROJECTS ] */}
      <section id="work" className="values-projects-section">
        <div className="values-projects-inner">
          <h2 className="values-projects-heading">
            Production Web
            <br />
            Applications<span style={{ color: '#B4F435' }}>.</span>
          </h2>

          <div className="values-projects-grid">
            {projects.map((proj, idx) => {
              const cardThemes = [
                {
                  bg: '#D96BFF',
                  ink: '#FFFFFF',
                  subInk: 'rgba(255, 255, 255, 0.92)',
                  Icon: Globe,
                },
                {
                  bg: '#FF5436',
                  ink: '#FFFFFF',
                  subInk: 'rgba(255, 255, 255, 0.92)',
                  Icon: MessagesSquare,
                },
                {
                  bg: '#B4F435',
                  ink: '#0A0A0B',
                  subInk: 'rgba(10, 10, 11, 0.85)',
                  Icon: GraduationCap,
                },
                {
                  bg: '#4666FF',
                  ink: '#FFFFFF',
                  subInk: 'rgba(255, 255, 255, 0.92)',
                  Icon: Sparkles,
                },
              ];
              const theme = cardThemes[idx % cardThemes.length];
              const Icon = theme.Icon;

              return (
                <div
                  key={proj.title}
                  className="values-project-card"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.ink,
                  }}
                >
                  <div className="values-card-header">
                    <div>
                      <span className="values-card-index">[{idx + 1}]</span>
                      <h3 className="values-card-title">{proj.title}</h3>
                    </div>
                    <Icon
                      className="values-card-icon"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="values-card-bottom">
                    <p
                      className="values-card-desc"
                      style={{ color: theme.subInk }}
                    >
                      {proj.highlights[0]}
                    </p>
                    <div className="values-card-links">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="values-card-link"
                        style={{
                          color: theme.ink,
                          borderColor:
                            theme.ink === '#0A0A0B'
                              ? 'rgba(10, 10, 11, 0.28)'
                              : 'rgba(255, 255, 255, 0.35)',
                        }}
                      >
                        <span>Launch Live App</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                      {proj.figmaUrl && (
                        <a
                          href={proj.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="values-card-link"
                          style={{
                            color: theme.ink,
                            borderColor:
                              theme.ink === '#0A0A0B'
                                ? 'rgba(10, 10, 11, 0.28)'
                                : 'rgba(255, 255, 255, 0.35)',
                          }}
                        >
                          <span>Figma Specs</span>
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* [ 02 / TECHNICAL ARSENAL ] */}
      <SkillsDeck />

      {/* [ 03 / PROFESSIONAL JOURNEY ] */}
      <section id="experience" className="ug-section ug-journey-section-wrap">
        <div className="ug-section-header ug-journey-main-header">
          <span className="ug-index">[ 03 / PROFESSIONAL JOURNEY ]</span>
          <h2 className="ug-title ug-journey-big-title">Career Milestones</h2>
          <p className="ug-subtitle ug-journey-big-subtitle">
            2+ years engineering commercial web applications, scaling frontend performance, and shipping pixel-accurate code.
          </p>
        </div>

        <ProfessionalJourney />
      </section>

      {/* [ 04 / EDUCATION ] */}
      <AcademicsSection />

      {/* [ 05 / GET IN TOUCH ] */}
      <section id="contact" className="ug-section">
        <div className="ug-section-header" style={{ marginBottom: '24px' }}>
          <span className="ug-index">[ 05 / COLLABORATE ]</span>
        </div>

        {/* Overall Section Pixel Trail Experience */}
        <div className="ug-pixel-trail-container">
          <a
            href="mailto:hello.ashwinkp@gmail.com"
            className="ug-pixel-trail-stage"
            title="Click to email hello.ashwinkp@gmail.com"
          >
            <PixelTrail
              text="hello.ashwinkp@gmail.com"
              background="#0A0A0B"
              textColor="#FFFFFF"
              invert={false}
              columns={36}
              pixel={{ color: "#B4F435", gap: 1, radius: 1 }}
              trail={{ hold: 0.25, fade: 0.45, reach: 1 }}
              font={{
                fontFamily: "var(--display), Inter, sans-serif",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </a>

          <div className="ug-contact-meta">
            <div className="ug-contact-btns">
              <a
                className="ug-contact-primary"
                href="https://wa.me/917034333646"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get in Touch on WhatsApp ↗
              </a>
              <a
                className="ug-contact-secondary"
                href="tel:+917034333646"
              >
                Call +91 70346 33646
              </a>
            </div>

            <div className="ug-status-banner">
              <span className="live-pulse" />
              <span>Based in Bengaluru, India • Immediate Joiner • Malayalam, English, Tamil &amp; Hindi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - Aligned Left & Right across Full Screen */}
      <footer className="footer-section">
        <div className="footer-links-row">
          <div className="footer-links-left">
            <a
              href="https://www.linkedin.com/in/ashwin-kp-parakkadavu"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Ashwinbabukp"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://taskit01.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Portfolio
            </a>
          </div>
          <span className="copyright">© 2026 Ashwin K P</span>
        </div>
      </footer>
    </main>
  );
}
