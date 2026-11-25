/* eslint-disable */
"use client";

export default function CareerLogos() {
  const logos = [
    {
      name: "Figma",
      svg: (
        <svg viewBox="0 0 38 57" fill="none" className="career-logo-svg">
          <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19a9.5 9.5 0 0 1-9.5 9.5Z" fill="currentColor" opacity="0.85" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" fill="currentColor" opacity="0.65" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="currentColor" opacity="0.9" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="currentColor" opacity="0.75" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "React",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="career-logo-svg">
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="career-logo-svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 16V8l8.8 11.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 8v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="career-logo-svg">
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6ZM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12Z" />
        </svg>
      ),
    },
    {
      name: "Antigravity",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="career-logo-svg">
          <path
            d="M12 3.5L4.5 20.5h3.2l1.8-4.2h5l1.8 4.2h3.2L12 3.5Zm-1.4 9.8L12 9.6l1.4 3.7h-2.8Z"
            fill="currentColor"
          />
          <circle cx="12" cy="3.5" r="1.4" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Claude",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="career-logo-svg">
          <path
            d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M7.2 3.8l9.6 16.4M16.8 3.8L7.2 20.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="career-logos-row" aria-label="Core engineering tools">
      {logos.map((logo) => (
        <div key={logo.name} className="career-logo-item" title={logo.name}>
          {logo.svg}
          <span className="career-logo-name">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}
