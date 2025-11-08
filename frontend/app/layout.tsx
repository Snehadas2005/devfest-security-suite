import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "SentraSec AI - Cybersecurity Platform",
  description: "AI-Powered threat detection and security analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}