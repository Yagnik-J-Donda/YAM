import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YAM — Your All Managers',
  description: 'The parent portfolio for an A-to-Z family of focused manager products, including YEM and YTP.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
