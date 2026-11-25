// Complete Indexed Knowledge Base of Ashwin K P's Portfolio Website & Resume

export const PORTFOLIO_KNOWLEDGE = {
  profile: {
    name: "Ashwin K P",
    role: "UI Developer & Frontend Engineer",
    experienceYears: "2+ years",
    location: "Bengaluru, India",
    availability: "Immediate Joiner",
    languages: ["Malayalam", "English", "Tamil", "Hindi"],
    phone: "+91 7034333646",
    whatsapp: "https://wa.me/917034333646",
    email: "hello.ashwinkp@gmail.com",
    linkedin: "https://www.linkedin.com/in/ashwin-kp-parakkadavu",
    github: "https://github.com/Ashwinbabukp",
    pexels: "https://www.pexels.com/@ashwin/",
    cvUrl:
      "https://drive.google.com/file/d/146IcaZN033Mtf-VgIcsi_fbR5LfFIdHM/view?usp=sharing",
    summary:
      "Frontend developer with 2+ years building responsive React, Next.js, and TypeScript apps from Figma designs, including 8+ commercial web apps and a live quotes social platform.",
  },

  experience: [
    {
      role: "UI Developer",
      company: "FaatLab Technologies, Kochi",
      period: "Jun 2024 – Jan 2026",
      type: "Full-time",
      bullets: [
        "Built 8+ commercial web apps (15+ responsive pages) from Figma/Adobe XD using React, Next.js, TypeScript, and Tailwind CSS.",
        "Integrated front-end screens with REST APIs, managed application state with Redux Toolkit and Context API, and built GSAP timeline animations.",
        "Collaborated with backend developers and the marketing team to deliver web app features and pages.",
        "Cut page load time by up to 30% using code-splitting, lazy loading, and hybrid SSR/SSG rendering.",
        "Automated deployments on Vercel with GitHub Actions CI/CD; worked in feature branches with code reviews and PRs.",
      ],
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
      role: "MERN Stack / UI Developer (Intern)",
      company: "Luminar Technolab, Kochi",
      period: "Mar 2023 – Sep 2023",
      type: "Internship",
      bullets: [
        "Built responsive UI screens with HTML5, CSS3, Bootstrap, JavaScript, and React.js.",
        "Built full-stack modules with Node.js, Express.js, and MongoDB.",
        "Consumed RESTful APIs and managed code with Git version control.",
      ],
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "Git"],
    },
  ],

  projects: [
    {
      id: "taskit",
      name: "Taskit",
      badge: "Full Stack & 3D WebGL",
      url: "https://taskit01.vercel.app",
      stack: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Supabase (PostgreSQL)",
        "WebGL2",
        "GLSL",
      ],
      highlights: [
        "Built full-stack frontend with Next.js 16 App Router, React 19, TypeScript, and custom CSS design tokens.",
        "Engineered Supabase (PostgreSQL) backend with Next.js API Routes and automated Nodemailer email notifications.",
        "Implemented Google OAuth 2.0 and email OTP verification with secure HTTP session cookies.",
        "Rendered interactive 3D visuals using WebGL2, GLSL vertex & fragment shaders, SDF raymarching, and OKLab color space.",
      ],
    },
    {
      id: "sans",
      name: "SANS — Quotes Social Platform",
      badge: "Social Media Web App",
      url: "https://sans01.vercel.app",
      stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "OAuth 2.0"],
      highlights: [
        "Designed & deployed a Reels-style quote-sharing feed with interactive mood filter pills and instant Vercel edge delivery.",
        "Engineered client-side quote editor featuring dynamic font switching, live backgrounds, sticker overlays, and emoji picker.",
        "Constructed modular quote interaction cards (like, comment, save, share, follow), user dashboards, and OAuth authentication.",
      ],
    },
    {
      id: "applyeuropa",
      name: "Apply Europa",
      badge: "European Education Portal",
      url: "https://applyeuropa.com",
      figmaUrl:
        "https://www.figma.com/design/uve2zKh9reAoFHNVlHaKaP/Apply-Europa?node-id=0-1&t=U4FkYsc3ODfjFvmy-1",
      stack: ["Figma to Code", "Next.js", "React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      highlights: [
        "Converted pixel-perfect Figma design systems into a high-converting, fully responsive study-abroad discovery platform.",
        "Architected comprehensive university directories and multi-step student workflow forms integrated with REST APIs.",
        "Implemented SEO-friendly dynamic routing with optimized metadata, cutting bounce rates and enhancing organic reach.",
      ],
    },
    {
      id: "leadz",
      name: "Leadz Study Abroad",
      badge: "Consultancy Web Platform",
      url: "https://leadzstudyabroad.com",
      stack: ["React.js", "GSAP Animation", "Tailwind CSS", "JavaScript"],
      highlights: [
        "Transformed custom multi-page Figma mockups into a responsive, high-performance consultancy website.",
        "Integrated custom GSAP scroll-triggered timeline animations and smooth micro-interactions across key landing sections.",
        "Developed accessible, validated lead capture and enquiry forms with cross-device and mobile touch optimization.",
      ],
    },
  ],

  skills: {
    Frontend: [
      "React.js",
      "Next.js (App Router, SSR/SSG)",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    "Styling / UI": [
      "Figma",
      "GSAP",
      "Framer Motion",
      "Material UI",
      "Bootstrap",
      "Adobe XD",
    ],
    "State, APIs & Auth": [
      "Redux Toolkit",
      "Context API",
      "REST APIs",
      "Google OAuth 2.0",
      "Email OTP Verification",
      "Secure HTTP Session Cookies",
    ],
    "Backend / Databases": [
      "Node.js",
      "Express.js",
      "Supabase (PostgreSQL)",
      "MongoDB",
      "Next.js API Routes",
      "Nodemailer",
    ],
    "3D / Creative Coding": [
      "WebGL2",
      "GLSL Fragment & Vertex Shaders",
      "SDF Raymarching",
      "OKLab Color Space",
    ],
    Tools: [
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

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science",
    college: "Nehru Arts & Science College, Coimbatore",
    year: "2022",
    cgpa: "7.8 CGPA",
  },

  websiteArchitecture: {
    framework: "Next.js 16 (App Router) & React 19 with Static Export",
    styling: "Custom CSS Design Tokens + Tailwind CSS + Kokonut UI",
    animations: "Framer Motion, GSAP-style scroll reveals, HoverImageReveal (16:9 live iframe & Figma previews), 3D Flip Skill Cards, PixelTrail email canvas, UserCursor",
    ai: "Built-in Portfolio Intelligence powered by free Open-Source GPT-OSS 20B + Local Codebase RAG Engine",
  },
};

export function buildKnowledgePrompt() {
  const { profile, experience, projects, skills, education, websiteArchitecture } =
    PORTFOLIO_KNOWLEDGE;

  const expText = experience
    .map(
      (e) =>
        `* ${e.role} at ${e.company} (${e.period}, ${e.type}): ${e.bullets.join(" ")}`
    )
    .join("\n");

  const projText = projects
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} (${p.badge}) — Live: ${p.url}${p.figmaUrl ? ` | Figma: ${p.figmaUrl}` : ""} | Stack: ${p.stack.join(", ")}. ${p.highlights[0]}`
    )
    .join("\n");

  const skillsText = Object.entries(skills)
    .map(([cat, list]) => `- ${cat}: ${list.join(", ")}`)
    .join("\n");

  return `You are the live AI Assistant on ${profile.name}'s portfolio website.

Behavior rules:
1. Respond naturally like a real, helpful AI agent. If the user says "hey", "hi", "hello", or asks a casual/general question, reply naturally and concisely—do NOT dump the resume unprompted.
2. When asked about ${profile.name}'s work experience, projects, links, skills, education, resume/CV, photography, or this website's codebase, answer thoroughly and accurately using the verified project data below.
3. Always include exact https:// URLs when sharing projects, Pexels, or CV links.

Profile:
- ${profile.name} — ${profile.role} (${profile.experienceYears})
- Location: ${profile.location} • ${profile.availability} • Languages: ${profile.languages.join(", ")}
- Contact: Email ${profile.email} | Phone/WhatsApp ${profile.phone} | LinkedIn: ${profile.linkedin} | GitHub: ${profile.github} | Pexels: ${profile.pexels}
- CV / Resume: ${profile.cvUrl}

Work Experience:
${expText}

Featured Projects:
${projText}

Technical Skills:
${skillsText}

Education:
- ${education.degree} (${education.field}), ${education.college} (${education.year}, ${education.cgpa})

This Portfolio Website Codebase:
- Framework: ${websiteArchitecture.framework}
- Styling: ${websiteArchitecture.styling}
- Interactive Components: ${websiteArchitecture.animations}`;
}
