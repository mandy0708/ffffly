import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Visual style v2 — Inter throughout (as on elevenlabs.io); the optical-size
// axis gives the large headings the tighter "display" cut.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Mandy ZhangMan — Brand Designer",
  description: "Mandy ZhangMan's portfolio for brand design, IP and visual identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
