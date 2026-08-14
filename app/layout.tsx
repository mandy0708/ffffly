import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeToggle } from "@/components/site/theme-toggle";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
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
  // The theme is rendered on the server from a cookie so the markup already
  // carries the right colors — no flash, and no hydration mismatch from a
  // client script mutating <html> before React takes over. When the cookie is
  // absent the attribute is omitted and CSS `prefers-color-scheme` follows the OS.
  const stored = (await cookies()).get("theme")?.value;
  const theme = stored === "dark" || stored === "light" ? stored : undefined;

  return (
    <html
      lang="zh-CN"
      className={`${montserrat.variable} h-full antialiased`}
      data-theme={theme}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
