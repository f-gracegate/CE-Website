import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
