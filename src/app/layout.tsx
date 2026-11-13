import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Charismatic Evangelicals',
  description:
    'Charismatic Evangelicals: Sunday gatherings, small groups, outreach and a community prayer wall. Find a campus, join a group or give online.',
  openGraph: {
    title: 'Charismatic Evangelicals',
    description: 'Sunday gatherings, small groups, outreach and a community prayer wall.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#8a1e25',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
