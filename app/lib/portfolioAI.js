// Free Open-Source AI Agent & Portfolio Knowledge Engine
// Powered by Pollinations Open-Source Classic API (GPT-OSS 20B Reasoning LLM)

export const PORTFOLIO_PROJECTS = [
  {
    id: "taskit",
    name: "Taskit",
    badge: "Full Stack & 3D WebGL",
    url: "https://taskit01.vercel.app",
    stack:
      "Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Supabase, WebGL2, GLSL",
  },
  {
    id: "sans",
    name: "SANS — Quotes Social Platform",
    badge: "Social Media Web App",
    url: "https://sans01.vercel.app",
    stack: "React.js, Next.js, TypeScript, Tailwind CSS, Google OAuth, Vercel",
  },
  {
    id: "applyeuropa",
    name: "Apply Europa",
    badge: "European Education Portal",
    url: "https://applyeuropa.com",
    figmaUrl:
      "https://www.figma.com/design/uve2zKh9reAoFHNVlHaKaP/Apply-Europa?node-id=0-1&t=U4FkYsc3ODfjFvmy-1",
    stack: "React.js, Next.js, TypeScript, Tailwind CSS, Figma Specs, REST APIs",
  },
  {
    id: "leadz",
    name: "Leadz Study Abroad",
    badge: "Consultancy Web Platform",
    url: "https://leadzstudyabroad.com",
    stack: "React.js, Tailwind CSS, JavaScript, GSAP Timeline Animations",
  },
];

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
    title: "Professional Journey & Commercial Milestones",
    url: "#experience",
    site: "Experience",
    snippet:
      "UI Developer at FaatLab Technologies (Jun 2024 – Jan 2026): Built 8+ commercial web applications, cut page load times by up to 30%, translated 15+ complex Figma design systems into scalable Next.js & React production code.",
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
    title: "Technical Arsenal & Core Stack",
    url: "#skills",
    site: "Skills",
    snippet:
      "Core stack includes React 19, Next.js 16 App Router, TypeScript, Tailwind CSS v4, WebGL2, GLSL Fragment Shaders, GSAP Timeline, Redux Toolkit, Node.js, Express, and Supabase (PostgreSQL).",
  },
  {
    id: "academics",
    title: "Bachelor of Computer Applications (BCA)",
    url: "#education",
    site: "Academics",
    snippet:
      "Graduated with First Class distinction and academic merit of 7.8 CGPA from Nehru Arts & Science College, Coimbatore (Class of 2022), with in-depth study of algorithms, RDBMS, and web architectures.",
  },
  {
    id: "contact",
    title: "Availability & Contact Details",
    url: "#contact",
    site: "Contact",
    snippet:
      "Based in Bengaluru, India. Immediate joiner. Contact via WhatsApp/Phone (+91 70346 33646) or Email (hello.ashwinkp@gmail.com). Fluent in Malayalam, English, Tamil & Hindi.",
  },
];

const SYSTEM_PROMPT = `You are the live AI Assistant on Ashwin K P's personal portfolio website.

Behavior rules:
1. Respond naturally like a real, helpful AI agent. If the user says "hey", "hi", "hello", or asks a casual/general question, reply naturally and concisely—do NOT dump Ashwin's resume unprompted.
2. When the user asks about Ashwin K P, his work, projects, links, skills, experience, education, or contact info, answer accurately using ONLY the verified portfolio facts below.
3. If the user asks for project links or URLs, ALWAYS include the exact https:// URLs.
4. Keep answers clear, direct, and concise (usually 1–4 sentences unless more detail is requested).

Verified Portfolio Data for Ashwin K P:
- Name & Role: Ashwin K P — UI Developer & Frontend Engineer (2+ years experience)
- Location & Availability: Bengaluru, India • Immediate Joiner • Languages: Malayalam, English, Tamil, Hindi
- Contact: Email: hello.ashwinkp@gmail.com | Phone / WhatsApp: +91 70346 33646
- Experience:
  * UI Developer at FaatLab Technologies (Jun 2024 – Jan 2026): Built 8+ commercial web applications (15+ responsive pages) from Figma & Adobe XD using React, Next.js, TypeScript, Tailwind CSS; cut page load times by up to 30% via code-splitting, lazy loading, and hybrid SSR/SSG; integrated REST APIs, Redux Toolkit, GSAP timelines, and automated Vercel + GitHub Actions CI/CD.
  * MERN Stack / UI Developer Intern at Luminar Technolab, Kochi (Mar 2023 – Sep 2023): React.js, Node.js, Express.js, MongoDB, HTML5, CSS3, Bootstrap.
- Featured Projects & Exact Live URLs:
  1. Taskit (Full Stack & 3D WebGL — Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Supabase PostgreSQL, Google OAuth 2.0, WebGL2 & GLSL shaders): https://taskit01.vercel.app
  2. SANS — Quotes Social Platform (Reels-style quote feed, client-side editor, React.js, Next.js, TypeScript, OAuth 2.0, Vercel): https://sans01.vercel.app
  3. Apply Europa (European Education Portal — Next.js, React.js, TypeScript, Tailwind CSS, Figma to Code, SEO dynamic routing): https://applyeuropa.com | Figma Specs: https://www.figma.com/design/uve2zKh9reAoFHNVlHaKaP/Apply-Europa?node-id=0-1&t=U4FkYsc3ODfjFvmy-1
  4. Leadz Study Abroad (Consultancy Web Platform — React.js, Tailwind CSS, GSAP timeline animations): https://leadzstudyabroad.com
- Skills: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS v4, GSAP, Framer Motion, WebGL2, GLSL, Redux Toolkit, Context API, Node.js, Express.js, Supabase (PostgreSQL), MongoDB, Figma Design Systems.
- Education: Bachelor of Computer Applications (BCA), Nehru Arts & Science College, Coimbatore, Class of 2022, First Class with 7.8 CGPA.`;

function detectRelevantSources(q) {
  const matched = [];
  if (q.includes("taskit")) matched.push("taskit");
  if (q.includes("sans") || q.includes("quote")) matched.push("sans");
  if (q.includes("europa") || q.includes("figma")) matched.push("applyeuropa");
  if (q.includes("leadz")) matched.push("leadz");
  if (
    q.includes("project") ||
    q.includes("link") ||
    q.includes("url") ||
    q.includes("live") ||
    q.includes("demo") ||
    q.includes("website") ||
    q.includes("app") ||
    q.includes("built")
  ) {
    matched.push("projects", "taskit", "sans", "applyeuropa", "leadz");
  }
  if (
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("faatlab") ||
    q.includes("luminar") ||
    q.includes("work") ||
    q.includes("career")
  ) {
    matched.push("experience");
  }
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("react") ||
    q.includes("next") ||
    q.includes("typescript") ||
    q.includes("css") ||
    q.includes("webgl")
  ) {
    matched.push("skills");
  }
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("cgpa") ||
    q.includes("nehru") ||
    q.includes("bca") ||
    q.includes("academic")
  ) {
    matched.push("academics");
  }
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("bengaluru") ||
    q.includes("available") ||
    q.includes("location")
  ) {
    matched.push("contact");
  }

  const uniqueIds = Array.from(new Set(matched));
  return uniqueIds
    .map((id) => PORTFOLIO_SOURCES.find((s) => s.id === id))
    .filter(Boolean);
}

export async function askPortfolioAI(
  query,
  { signal, onSource, tool, model, files } = {}
) {
  const q = query.toLowerCase().trim();
  const relevantSources = detectRelevantSources(q);

  // Only stream portfolio sources to trace when query actually relates to portfolio entities
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

  // Call the real free, keyless open-source LLM agent (GPT-OSS 20B via Pollinations OpenAI-compatible API)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

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
            content: SYSTEM_PROMPT + toolHint + filesHint,
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
    // Fall through to offline semantic fallback only if network/API is unreachable
  }

  return generateOfflineFallback(q, relevantSources, model);
}

function generateOfflineFallback(q, relevantSources, model) {
  // Natural greeting handling even in offline fallback
  if (
    /^(hi|hey|hello|hola|yo|sup|good morning|good afternoon|good evening)[\s!?.]*$/i.test(
      q
    )
  ) {
    return {
      parts: [
        {
          text: "Hey! How can I help you today? You can ask me about Ashwin's projects, live links, tech stack, experience, or anything else.",
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
      isLiveAI: false,
    };
  }

  if (q.includes("taskit")) {
    return {
      parts: [
        {
          text: "Taskit is Ashwin's flagship Full Stack & 3D WebGL project built with Next.js 16 App Router, React 19, TypeScript, Supabase, and GLSL shaders. ",
          cite: ["taskit"],
        },
        {
          text: "Launch Taskit Live",
          link: "https://taskit01.vercel.app",
          cite: ["taskit"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
    };
  }

  if (q.includes("sans") || q.includes("quote")) {
    return {
      parts: [
        {
          text: "SANS is a Reels-style quote-sharing social platform with a client-side editor and Google OAuth. ",
          cite: ["sans"],
        },
        {
          text: "Launch SANS Live",
          link: "https://sans01.vercel.app",
          cite: ["sans"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
    };
  }

  if (q.includes("europa") || q.includes("figma")) {
    return {
      parts: [
        {
          text: "Apply Europa is a European study-abroad portal converted pixel-perfect from Figma into Next.js and TypeScript. ",
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
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
    };
  }

  if (q.includes("leadz")) {
    return {
      parts: [
        {
          text: "Leadz Study Abroad is a consultancy web platform built with React.js, Tailwind CSS, and GSAP timeline animations. ",
          cite: ["leadz"],
        },
        {
          text: "Launch Leadz Study Abroad",
          link: "https://leadzstudyabroad.com",
          cite: ["leadz"],
        },
      ],
      sources: PORTFOLIO_SOURCES,
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
    };
  }

  if (
    q.includes("project") ||
    q.includes("link") ||
    q.includes("url") ||
    q.includes("live") ||
    q.includes("demo") ||
    q.includes("website") ||
    q.includes("app")
  ) {
    return {
      parts: [
        { text: "Here are Ashwin's live production project links: " },
        {
          text: "Taskit (https://taskit01.vercel.app)",
          link: "https://taskit01.vercel.app",
          cite: ["taskit"],
        },
        { text: ", " },
        {
          text: "SANS (https://sans01.vercel.app)",
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
      modelLabel: model || "GPT-OSS 20B (OpenSource)",
    };
  }

  return {
    parts: [
      {
        text: "The live open-source AI endpoint is temporarily unreachable from this browser session. You can still ask about Ashwin's ",
      },
      { text: "projects & live links", cite: ["projects"] },
      { text: ", " },
      { text: "experience", cite: ["experience"] },
      { text: ", " },
      { text: "tech stack", cite: ["skills"] },
      { text: ", or " },
      { text: "contact details", cite: ["contact"] },
      { text: "." },
    ],
    sources: PORTFOLIO_SOURCES,
    modelLabel: model || "GPT-OSS 20B (OpenSource)",
    isLiveAI: false,
  };
}
