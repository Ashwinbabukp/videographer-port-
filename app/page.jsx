import Hero from './components/Hero';

export default function Home() {
  const selectedWorks = [
    {
      title: 'Apply Europa: “Think like the Top 1%”',
      description:
        'Brand commercial I directed, shot and edited, with on-site framing, lapel audio, kinetic captions, colour grade and a branded outro.',
      metric: 'Commercial',
      submetric: null,
      linkText: 'Watch on YouTube',
      url: 'https://youtu.be/oHK9C0FpCyA',
    },
    {
      title: 'AppleMax Retail Reels',
      description:
        '423+ Reels and product videos for two electronics stores, built on three-second hooks, beat-synced cuts and same-day edits.',
      metric: '2M to 5.6M',
      submetric: 'monthly views, +10,400 followers in 30 days',
      linkText: 'See @applemax_vengara',
      url: 'https://www.instagram.com/applemax_vengara/',
    },
    {
      title: 'Pexels contributor',
      description:
        '121+ stock photos and video clips, with 7,500+ downloads and an all-time rank in the top 24K worldwide.',
      metric: '1.9M+',
      submetric: 'total views',
      linkText: 'View my Pexels profile',
      url: 'https://www.pexels.com/@ashwin/',
    },
  ];

  const services = [
    {
      title: 'Shooting',
      detail:
        'Mirrorless and DSLR, manual exposure, gimbal moves, B-roll, product and talking-head framing, studio and natural light, lapel audio.',
    },
    {
      title: 'Editing',
      detail:
        'Reels and YouTube edits in CapCut Pro, VN, InShot, Premiere Pro and DaVinci Resolve. Colour grading, speed ramps, captions, sound mixing.',
    },
    {
      title: 'Photography',
      detail:
        'Retail, product, portrait and lifestyle work, retouched in Lightroom and Photoshop.',
    },
  ];

  const experiences = [
    {
      role: 'Lead videographer and Reels editor',
      company: 'AppleMax Retail',
      period: '2023 to present',
      note: null,
    },
    {
      role: 'Videographer and photographer',
      company: 'Pexels and freelance',
      period: '2021 to present',
      note: null,
    },
    {
      role: 'UI developer',
      company: 'FaatLab Technologies',
      period: 'Jun 2024 to Jan 2026',
      note: 'I also build the web: Figma, React.js, HTML and CSS.',
    },
    {
      role: 'BCA',
      company: 'Nehru Arts & Science College',
      period: '2022',
      note: null,
    },
  ];

  return (
    <main>
      {/* Camera Viewfinder REC Frame Hero */}
      <Hero />

      {/* Selected Work */}
      <section id="work">
        <h2>Selected work</h2>
        {selectedWorks.map((work) => (
          <div key={work.title} className="row">
            <div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
            </div>
            <div className="m">
              {work.metric}
              {work.submetric && <small>{work.submetric}</small>}
            </div>
            <a
              className="go"
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {work.linkText} →
            </a>
          </div>
        ))}
      </section>

      {/* Services / What I do */}
      <section>
        <h2>What I do</h2>
        <div className="cols">
          {services.map((item) => (
            <div key={item.title} className="col-item">
              <b>{item.title}</b>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2>Experience</h2>
        <div className="exp-list">
          {experiences.map((exp) => (
            <div key={exp.company + exp.period} className="exp-item">
              <div>
                <strong>
                  {exp.role}, {exp.company}
                </strong>
                {exp.note && <span className="subtext">{exp.note}</span>}
              </div>
              <span className="period">{exp.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2>Contact</h2>
        <p className="contact-heading">
          <a href="mailto:hello.ashwinkp@gmail.com">hello.ashwinkp@gmail.com</a>
        </p>
        <p>
          <a
            className="wa-btn"
            href="https://wa.me/917034333646"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch on WhatsApp
          </a>
        </p>
        <p className="contact-details">
          Or call <a href="tel:+917034333646">+91 70346 33646</a>. Based in
          Bangalore, ready to start immediately. I speak Malayalam, English,
          Tamil and Hindi.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <a
          href="https://www.linkedin.com/in/ashwin-kp-parakkadavu"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://www.pexels.com/@ashwin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pexels
        </a>
        <a
          href="https://youtu.be/oHK9C0FpCyA"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <span className="copyright">© 2026 Ashwin K P</span>
      </footer>
    </main>
  );
}
