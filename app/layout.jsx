import './globals.css';

export const metadata = {
  title: 'Ashwin K P – Videographer & Reels Editor',
  description: 'Ashwin K P is a videographer, Reels editor and visual storyteller based in Bangalore. 423+ Reels, 1.9M+ views, ready to direct, shoot and edit high-impact commercial content.',
  keywords: [
    'Ashwin K P',
    'Videographer Bangalore',
    'Reels Editor',
    'Video Editor',
    'Commercial Videography',
    'Social Media Video Creator'
  ],
  authors: [{ name: 'Ashwin K P' }],
  creator: 'Ashwin K P',
  openGraph: {
    title: 'Ashwin K P – Videographer & Reels Editor',
    description: 'Videos that stop the scroll. 423+ Reels, 1.9M+ views and 5+ years behind the camera. Based in Bangalore.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwin K P – Videographer & Reels Editor',
    description: 'Videos that stop the scroll. 423+ Reels, 1.9M+ views and 5+ years behind the camera.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0B0C',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="wrap">
          <header>
            <span className="brand-name">Ashwin K P</span>
            <a
              className="cn"
              href="https://wa.me/917034333646"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
