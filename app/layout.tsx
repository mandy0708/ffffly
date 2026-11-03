import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/site/lang-provider";
import { getLang } from "@/lib/i18n-server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Language comes from the cookie set by the nav's EN / 中 switch.
  const lang = await getLang();

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
