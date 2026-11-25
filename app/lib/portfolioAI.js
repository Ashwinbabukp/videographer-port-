// Free Open-Source AI Agent & Codebase-Indexed Portfolio RAG Engine
import {
  PORTFOLIO_KNOWLEDGE,
  buildKnowledgePrompt,
} from "./portfolioKnowledge";

export const PORTFOLIO_PROJECTS = PORTFOLIO_KNOWLEDGE.projects;

export const PORTFOLIO_SOURCES = [
  {
    id: "taskit",
    title: "Taskit — Live App (taskit01.vercel.app)",
    url: "https://taskit01.vercel.app",
    site: "Taskit",
    snippet:
      "Full-stack platform with Next.js 16 App Router, React 19, TypeScript, Supabase (PostgreSQL), Google OAuth 2.0, and interactive 3D visuals using WebGL2 & GLSL shaders. Live: https://taskit01.vercel.app",
  },
  {
    id: "sans",
    title: "SANS — Quotes Social Platform (sans01.vercel.app)",
    url: "https://sans01.vercel.app",
    site: "SANS",
    snippet:
      "Reels-style quote-sharing social web app with mood filters, client-side quote editor, OAuth 2.0, and Vercel edge delivery. Live: https://sans01.vercel.app",
  },
  {
    id: "applyeuropa",
    title: "Apply Europa — Live App & Figma Specs (applyeuropa.com)",
    url: "https://applyeuropa.com",
    site: "Apply Europa",
    snippet:
      "European study-abroad discovery platform converted pixel-perfect from Figma with university directories and SEO dynamic routing. Live: https://applyeuropa.com",
  },
  {
    id: "leadz",
    title: "Leadz Study Abroad — Live App (leadzstudyabroad.com)",
    url: "https://leadzstudyabroad.com",
    site: "Leadz",
    snippet:
      "Consultancy web platform with multi-page Figma implementation, GSAP scroll-triggered timeline animations, and accessible lead capture forms. Live: https://leadzstudyabroad.com",
  },
  {
    id: "experience",
    title: "Professional Journey & Career Milestones",
    url: "#experience",
    site: "Experience",
    snippet:
      "UI Developer at FaatLab Technologies (Jun 2024 – Jan 2026): Built 8+ commercial web apps, cut page load times by 30%, translated 15+ Figma design systems into Next.js & React. Intern at Luminar Technolab (2023).",
  },
  {
    id: "projects",
    title: "Production Web Applications & Live Links",
    url: "#work",
    site: "Projects",
    snippet:
      "Live projects: Taskit (https://taskit01.vercel.app), SANS (https://sans01.vercel.app), Apply Europa (https://applyeuropa.com), and Leadz Study Abroad (https://leadzstudyabroad.com).",
  },
  {
    id: "skills",
    title: "Skills & Engineering Stack",
    url: "#skills",
    site: "Skills",
    snippet:
      "React.js, Next.js (App Router, SSR/SSG), TypeScript, Tailwind CSS, Figma, GSAP, Framer Motion, Redux Toolkit, Node.js, Supabase (PostgreSQL), WebGL2, GLSL, Cursor & Claude Code.",
  },
  {
    id: "academics",
    title: "Bachelor of Computer Applications (BCA)",
    url: "#education",
    site: "Academics",
    snippet:
      "Graduated with First Class distinction and 7.8 CGPA from Nehru Arts & Science College, Coimbatore (2022).",
  },
  {
    id: "contact",
    title: "Availability, CV & Contact Details",
    url: "#contact",
    site: "Contact",
    snippet:
      "Based in Bengaluru, India. Immediate joiner. Phone/WhatsApp: +91 7034333646 | Email: hello.ashwinkp@gmail.com | Pexels: https://www.pexels.com/@ashwin/",
  },
];

// Fuzzy keyword matching (handles typos like "experince", "proejct", "skils", etc.)
function matchesAny(q, terms) {
  return terms.some((t) => q.includes(t));
}

function detectTopics(q) {
  return {
    greeting:
      /^(hi|hey|hello|hola|yo|sup|good morning|good afternoon|good evening|how are you)[\s!?.]*$/i.test(
        q
      ),
    taskit: matchesAny(q, ["taskit", "3d", "webgl", "glsl", "supabase", "otp"]),
    sans: matchesAny(q, ["sans", "quote", "social"]),
    europa: matchesAny(q, ["europa", "apply", "figma"]),
    leadz: matchesAny(q, ["leadz", "consultancy"]),
    projects: matchesAny(q, [
      "project",
      "proejct",
      "projct",
      "link",
      "url",
      "live",
      "demo",
      "website",
      "site",
      "portfolio",
      "app",
      "built",
      "made",
    ]),
    experience: matchesAny(q, [
      "experience",
      "experince",
      "experiance",
      "exp",
      "work",
      "job",
      "career",
      "milestone",
      "company",
      "faatlab",
      "luminar",
      "intern",
      "role",
      "history",
    ]),
    skills: matchesAny(q, [
      "skill",
      "skil",
      "stack",
      "tech",
      "react",
      "next",
      "typescript",
      "tailwind",
      "gsap",
      "framer",
      "node",
      "mongo",
      "redux",
      "tool",
      "claude",
      "cursor",
      "code",
    ]),
    education: matchesAny(q, [
      "education",
      "educat",
      "college",
      "degree",
      "cgpa",
      "nehru",
      "bca",
      "academic",
      "study",
      "graduat",
    ]),
    contact: matchesAny(q, [
      "contact",
      "contct",
      "hire",
      "email",
      "mail",
      "phone",
      "whatsapp",
      "call",
      "bengaluru",
      "bangalore",
      "available",
      "join",
      "location",
      "cv",
      "resume",
      "linkedin",
      "github",
      "pexels",
      "photo",
    ]),
    about: matchesAny(q, ["who", "about", "ashwin", "introduce", "summary", "tell me"]),
  };
}

function detectRelevantSources(q) {
  const t = detectTopics(q);
  const matched = [];
  if (t.taskit) matched.push("taskit");
  if (t.sans) matched.push("sans");
  if (t.europa) matched.push("applyeuropa");
  if (t.leadz) matched.push("leadz");
  if (t.projects) matched.push("projects", "taskit", "sans", "applyeuropa", "leadz");
  if (t.experience) matched.push("experience");
  if (t.skills) matched.push("skills");
  if (t.education) matched.push("academics");
  if (t.contact) matched.push("contact");
  if (t.about && matched.length === 0) {
    matched.push("experience", "projects", "skills", "contact");
  }

  return Array.from(new Set(matched))
    .map((id) => PORTFOLIO_SOURCES.find((s) => s.id === id))
    .filter(Boolean);
}

export async function askPortfolioAI(
  query,
  { signal, onSource, tool, model, files } = {}
) {
  const q = query.toLowerCase().trim();
  const relevantSources = detectRelevantSources(q);

  if (onSource && relevantSources.length > 0) {
    for (const src of relevantSources) {
      onSource({
        domain: src.url.startsWith("http")
          ? new URL(src.url).hostname
          : `${src.site.toLowerCase()}.ashwin.dev`,
        title: src.title,
        color:
          src.id === "projects" || src.id === "taskit"
            ? "#B4F435"
            : src.id === "skills"
              ? "#10b981"
              : src.id === "experience"
                ? "#8b5cf6"
                : "#0ea5e9",
      });
    }
  }

  const toolHint = tool?.label
    ? `\nActive user mode: "${tool.label}" (${tool.hint || ""}).`
    : "";
  const filesHint =
    files && files.length > 0
      ? `\nUser attached files: ${files.map((f) => f.name).join(", ")}.`
      : "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const combinedSignal = signal
    ? (() => {
        if (signal.aborted) controller.abort();
        signal.addEventListener("abort", () => controller.abort(), {
          once: true,
        });
        return controller.signal;
      })()
    : controller.signal;

  try {
    const res = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai-fast",
        messages: [
          {
            role: "system",
            content: buildKnowledgePrompt() + toolHint + filesHint,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.5,
      }),
      signal: combinedSignal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (content) {
        return {
          parts:
            relevantSources.length > 0
              ? [{ text: content, cite: relevantSources.map((s) => s.id) }]
              : [{ text: content }],
          sources: PORTFOLIO_SOURCES,
          modelLabel: model || "GPT-OSS 20B (OpenSource)",
          isLiveAI: true,
        };
      }
    }
  } catch (err) {
    clearTimeout(timeout);
    if (signal?.aborted) {
      throw err;
    }
    // Seamlessly fall through to local codebase-indexed RAG engine
  }

  return generateCodebaseRAGAnswer(q, relevantSources, model);
}

function generateCodebaseRAGAnswer(q, relevantSources, model) {
  const t = detectTopics(q);
  const { profile, experience, education } = PORTFOLIO_KNOWLEDGE;
  const label = model || "Portfolio AI (Indexed)";

  // 1. Natural greeting
  if (t.greeting) {
    return {
      parts: [
        {
          text: "Hey! How can I help you today? You can ask me about Ashwin's work experience, live projects, tech stack, academics, CV, or how this website was built.",
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 2. Specific project queries
  if (t.taskit && !t.experience && !t.projects) {
    return {
      parts: [
        {
          text: "Taskit is Ashwin's flagship Full Stack & 3D WebGL project built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Supabase (PostgreSQL), Google OAuth 2.0, Email OTP, and interactive WebGL2/GLSL shaders. ",
          cite: ["taskit"],
        },
        {
          text: "Launch Taskit Live",
          link: "https://taskit01.vercel.app",
          cite: ["taskit"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  if (t.sans && !t.experience && !t.projects) {
    return {
      parts: [
        {
          text: "SANS is a Reels-style aesthetic quotes social platform featuring mood filter pills, a client-side quote editor, reusable interaction cards, and Google OAuth. ",
          cite: ["sans"],
        },
        {
          text: "Launch SANS Live",
          link: "https://sans01.vercel.app",
          cite: ["sans"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  if (t.europa && !t.experience && !t.projects) {
    return {
      parts: [
        {
          text: "Apply Europa is a European study-abroad discovery platform converted pixel-perfect from Figma into Next.js, React.js, TypeScript, and SEO-friendly dynamic routes. ",
          cite: ["applyeuropa"],
        },
        {
          text: "Launch Apply Europa",
          link: "https://applyeuropa.com",
          cite: ["applyeuropa"],
        },
        { text: " · " },
        {
          text: "View Figma Specs",
          link: "https://www.figma.com/design/uve2zKh9reAoFHNVlHaKaP/Apply-Europa?node-id=0-1&t=U4FkYsc3ODfjFvmy-1",
          cite: ["applyeuropa"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  if (t.leadz && !t.experience && !t.projects) {
    return {
      parts: [
        {
          text: "Leadz Study Abroad is a responsive consultancy web platform built with React.js, Tailwind CSS, and GSAP scroll-triggered animations. ",
          cite: ["leadz"],
        },
        {
          text: "Launch Leadz Study Abroad",
          link: "https://leadzstudyabroad.com",
          cite: ["leadz"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 3. Work Experience (Full answer including shipped projects & live links)
  if (t.experience) {
    const faat = experience[0];
    const lum = experience[1];
    const parts = [
      {
        text: `Ashwin K P has ${profile.experienceYears} of commercial frontend engineering experience. Most recently as a ${faat.role} at ${faat.company} (${faat.period}), he built 8+ commercial web apps (15+ responsive pages) from Figma & Adobe XD using React, Next.js, TypeScript, and Tailwind CSS, cut page load times by up to 30% via code-splitting and hybrid SSR/SSG, integrated REST APIs with Redux Toolkit & Context API, built GSAP animations, and automated Vercel + GitHub Actions CI/CD. `,
        cite: ["experience"],
      },
      {
        text: `Previously, he completed a ${lum.role} at ${lum.company} (${lum.period}) building full-stack MERN modules (React.js, Node.js, Express.js, MongoDB). `,
        cite: ["experience"],
      },
      { text: "Featured shipped projects: " },
      { text: "Taskit", link: "https://taskit01.vercel.app", cite: ["taskit"] },
      { text: ", " },
      { text: "SANS", link: "https://sans01.vercel.app", cite: ["sans"] },
      { text: ", " },
      { text: "Apply Europa", link: "https://applyeuropa.com", cite: ["applyeuropa"] },
      { text: ", and " },
      {
        text: "Leadz Study Abroad",
        link: "https://leadzstudyabroad.com",
        cite: ["leadz"],
      },
      { text: "." },
    ];
    return {
      parts,
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 4. Projects & Live Links
  if (t.projects) {
    return {
      parts: [
        {
          text: "Ashwin has engineered 8+ commercial applications, headlined by 4 featured live platforms: ",
        },
        {
          text: "Taskit (Full Stack & 3D WebGL — https://taskit01.vercel.app)",
          link: "https://taskit01.vercel.app",
          cite: ["taskit"],
        },
        { text: ", " },
        {
          text: "SANS Quotes Platform (https://sans01.vercel.app)",
          link: "https://sans01.vercel.app",
          cite: ["sans"],
        },
        { text: ", " },
        {
          text: "Apply Europa (https://applyeuropa.com)",
          link: "https://applyeuropa.com",
          cite: ["applyeuropa"],
        },
        { text: ", and " },
        {
          text: "Leadz Study Abroad (https://leadzstudyabroad.com)",
          link: "https://leadzstudyabroad.com",
          cite: ["leadz"],
        },
        { text: "." },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 5. Skills & Tech Stack (including website architecture)
  if (t.skills) {
    return {
      parts: [
        {
          text: "Ashwin's core engineering stack spans Frontend (React.js, Next.js App Router SSR/SSG, TypeScript, ES6+, HTML5/CSS3, Tailwind CSS), Styling & Animation (Figma, GSAP, Framer Motion, Material UI, Bootstrap, Adobe XD), State & Auth (Redux Toolkit, Context API, REST APIs, Google OAuth 2.0, Email OTP, HTTP Session Cookies), Backend (Node.js, Express.js, Supabase PostgreSQL, MongoDB, Next.js API Routes), 3D WebGL2/GLSL, and DevOps/AI tools (GitHub Actions CI/CD, Vercel, Vite, Webpack 5, Cursor, Claude Code). ",
          cite: ["skills"],
        },
        {
          text: "This portfolio itself runs on Next.js 16 App Router, React 19, Framer Motion, WebGL/Canvas PixelTrail, and Kokonut UI.",
          cite: ["projects"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 6. Education
  if (t.education) {
    return {
      parts: [
        {
          text: `Ashwin holds a ${education.degree} in ${education.field} from ${education.college} (${education.year}), graduating with First Class distinction and ${education.cgpa}.`,
          cite: ["academics"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 7. Contact, Availability, CV, Pexels
  if (t.contact) {
    return {
      parts: [
        {
          text: `Ashwin is based in ${profile.location} and is available as an ${profile.availability} (fluent in ${profile.languages.join(", ")}). Reach him at ${profile.email} or ${profile.phone}. `,
          cite: ["contact"],
        },
        { text: "Download CV", link: profile.cvUrl, cite: ["contact"] },
        { text: " · " },
        { text: "Pexels Photography", link: profile.pexels, cite: ["contact"] },
        { text: " · " },
        { text: "GitHub", link: profile.github, cite: ["contact"] },
        { text: " · " },
        { text: "LinkedIn", link: profile.linkedin, cite: ["contact"] },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: label,
    };
  }

  // 8. General Overview / About / Catch-all (Always helpful, never an error message)
  return {
    parts: [
      {
        text: `${profile.name} is a ${profile.role} in ${profile.location} (${profile.availability}) with ${profile.experienceYears} of experience building React, Next.js, and TypeScript applications—most recently at FaatLab Technologies (8+ commercial apps, 30% faster load times). `,
        cite: ["experience", "skills"],
      },
      { text: "Explore his live work: " },
      { text: "Taskit", link: "https://taskit01.vercel.app", cite: ["taskit"] },
      { text: ", " },
      { text: "SANS", link: "https://sans01.vercel.app", cite: ["sans"] },
      { text: ", " },
      { text: "Apply Europa", link: "https://applyeuropa.com", cite: ["applyeuropa"] },
      { text: ", and " },
      {
        text: "Leadz Study Abroad",
        link: "https://leadzstudyabroad.com",
        cite: ["leadz"],
      },
      { text: "." },
    ],
    sources: PORTFOLIO_SOURCES,
    modelLabel: label,
  };
}
