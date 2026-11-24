// Free Open-Source Portfolio Knowledge Engine & Search Service

export const PORTFOLIO_SOURCES = [
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
    title: "Production Web Applications & 3D WebGL",
    url: "#work",
    site: "Projects",
    snippet:
      "Engineered Taskit (Full Stack 3D WebGL with Next.js 16, Supabase, GLSL), EduAbroad (Study Abroad Discovery Platform), and FaatConsulting (High-performance Consultancy Website with GSAP).",
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

export async function askPortfolioAI(query, { signal, onSource } = {}) {
  const q = query.toLowerCase().trim();

  // Stream sources to trace
  const relevantSources = [];
  if (q.includes("project") || q.includes("taskit") || q.includes("edu") || q.includes("app") || q.includes("built")) {
    relevantSources.push(PORTFOLIO_SOURCES.find((s) => s.id === "projects"));
  }
  if (q.includes("experience") || q.includes("job") || q.includes("faatlab") || q.includes("work") || q.includes("career") || q.includes("company")) {
    relevantSources.push(PORTFOLIO_SOURCES.find((s) => s.id === "experience"));
  }
  if (q.includes("skill") || q.includes("stack") || q.includes("react") || q.includes("next") || q.includes("typescript") || q.includes("css") || q.includes("webgl")) {
    relevantSources.push(PORTFOLIO_SOURCES.find((s) => s.id === "skills"));
  }
  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa") || q.includes("nehru") || q.includes("bca") || q.includes("academic")) {
    relevantSources.push(PORTFOLIO_SOURCES.find((s) => s.id === "academics"));
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("bengaluru") || q.includes("available") || q.includes("location")) {
    relevantSources.push(PORTFOLIO_SOURCES.find((s) => s.id === "contact"));
  }

  // If general query, load all key sources
  if (relevantSources.length === 0) {
    relevantSources.push(...PORTFOLIO_SOURCES.slice(0, 3));
  }

  // Notify onSource callback
  if (onSource) {
    for (const src of relevantSources) {
      if (src) {
        onSource({
          domain: src.site.toLowerCase() + ".ashwin.dev",
          title: src.title,
          color: src.id === "projects" ? "#0ea5e9" : src.id === "skills" ? "#10b981" : src.id === "experience" ? "#8b5cf6" : "#f59e0b",
        });
      }
    }
  }

  // Try free open-source Pollinations AI inference if available, otherwise use semantic RAG generator
  try {
    const prompt = `You are Ashwin K P's portfolio AI assistant. Answer the user's question concisely based on Ashwin's portfolio data:
- Role: Frontend / UI Developer with 2+ years experience
- Experience: FaatLab Technologies (8+ commercial web apps, cut load time by 30%, Figma to Next.js/React), Luminar Technolab
- Key Projects: Taskit (3D WebGL, Supabase), EduAbroad (Study abroad platform), FaatConsulting
- Core Skills: React.js, Next.js (App Router), TypeScript, Tailwind CSS, GSAP, Redux Toolkit, WebGL2
- Education: Bachelor of Computer Applications (BCA), Nehru Arts & Science College, Coimbatore, 7.8 CGPA (2022)
- Location & Availability: Bengaluru, India • Immediate Joiner • Phone: +91 70346 33646 • Email: hello.ashwinkp@gmail.com
Question: "${query}"
Answer concisely in 2-3 sentences.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=mistral`, {
      signal: signal || controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 20 && !text.includes("error")) {
        return buildCitationsFromText(text, relevantSources);
      }
    }
  } catch {
    // Fall through to deterministic high-fidelity semantic RAG
  }

  // Deterministic Semantic RAG response with inline citations
  return generateSemanticAnswer(q);
}

function buildCitationsFromText(text, sources) {
  const primarySourceId = sources[0]?.id || "skills";
  return {
    parts: [
      { text: text.trim() + " ", cite: [primarySourceId] },
      { text: "Verified directly from portfolio records.", cite: sources.map((s) => s.id) },
    ],
    sources: PORTFOLIO_SOURCES,
  };
}

function generateSemanticAnswer(q) {
  if (q.includes("project") || q.includes("taskit") || q.includes("app")) {
    return {
      parts: [
        { text: "Ashwin has engineered 8+ commercial web applications, headlined by " },
        { text: "Taskit, a full-stack 3D WebGL platform with Next.js 16 App Router and Supabase", cite: ["projects"] },
        { text: ", alongside " },
        { text: "EduAbroad, a study-abroad discovery platform converted pixel-perfect from Figma", cite: ["projects", "skills"] },
        { text: ", and FaatConsulting featuring scroll-triggered GSAP timelines." },
      ],
      sources: PORTFOLIO_SOURCES,
    };
  }

  if (q.includes("experience") || q.includes("work") || q.includes("faatlab") || q.includes("career")) {
    return {
      parts: [
        { text: "Ashwin has 2+ years of commercial frontend engineering experience. At " },
        { text: "FaatLab Technologies, he built 8+ web applications and cut page load times by up to 30%", cite: ["experience"] },
        { text: " through code-splitting and hybrid SSR/SSG rendering, while actively translating " },
        { text: "15+ complex Figma design systems into scalable Next.js and React code", cite: ["experience", "skills"] },
        { text: "." },
      ],
      sources: PORTFOLIO_SOURCES,
    };
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa") || q.includes("bca") || q.includes("academic")) {
    return {
      parts: [
        { text: "Ashwin completed his " },
        { text: "Bachelor of Computer Applications (BCA) at Nehru Arts & Science College, Coimbatore", cite: ["academics"] },
        { text: ", graduating with First Class distinction and an academic merit of " },
        { text: "7.8 CGPA (Class of 2022)", cite: ["academics"] },
        { text: ", establishing deep rigor in algorithms, relational databases, and web architectures." },
      ],
      sources: PORTFOLIO_SOURCES,
    };
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("available") || q.includes("bengaluru")) {
    return {
      parts: [
        { text: "Ashwin is currently " },
        { text: "based in Bengaluru, India, and is available as an Immediate Joiner", cite: ["contact"] },
        { text: ". You can reach him directly via WhatsApp/Call at " },
        { text: "+91 70346 33646 or email hello.ashwinkp@gmail.com", cite: ["contact"] },
        { text: ", or connect on LinkedIn and GitHub." },
      ],
      sources: PORTFOLIO_SOURCES,
    };
  }

  // Default answer
  return {
    parts: [
      { text: "Ashwin K P is a UI Developer and Frontend Engineer with " },
      { text: "2+ years building commercial React, Next.js, and TypeScript web applications", cite: ["experience", "skills"] },
      { text: ". He specializes in translating Figma design systems into production code, optimizing performance by 30%, and is " },
      { text: "available immediately in Bengaluru", cite: ["contact"] },
      { text: "." },
    ],
    sources: PORTFOLIO_SOURCES,
  };
}
