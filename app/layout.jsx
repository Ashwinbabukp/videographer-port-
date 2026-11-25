import './globals.css';

export const metadata = {
  title: 'Ashwin K P – UI Developer & Frontend Engineer',
  description:
    'Frontend developer with 2+ years building responsive React, Next.js, and TypeScript apps from Figma designs, including 8+ commercial web apps. Immediate joiner based in Bengaluru.',
  keywords: [
    'Ashwin K P',
    'UI Developer',
    'Frontend Developer',
    'React.js Developer',
    'Next.js Developer',
    'TypeScript',
    'Tailwind CSS',
    'Bengaluru',
  ],
  authors: [{ name: 'Ashwin K P' }],
  creator: 'Ashwin K P',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Ashwin K P – UI Developer & Frontend Engineer',
    description:
      'Frontend developer with 2+ years building responsive React, Next.js, and TypeScript apps from Figma designs. Immediate joiner.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwin K P – UI Developer & Frontend Engineer',
    description:
      'Frontend developer with 2+ years building responsive React, Next.js, and TypeScript apps from Figma designs.',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="wrap">
          {children}
        </div>
      </body>
    </html>
  );
}
