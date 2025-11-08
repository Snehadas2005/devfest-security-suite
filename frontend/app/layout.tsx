import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevFest Security Suite',
  description: 'Your app description here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
