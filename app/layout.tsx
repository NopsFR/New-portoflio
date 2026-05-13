import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar | Cyber Security Enthusiast & Developer",
  description: "Exploring the intersection of security and software development. Building secure applications and learning how to protect digital systems.",
  keywords: ["portfolio", "developer", "designer", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Oscar" }],
  openGraph: {
    title: "Oscar | Cyber Security Enthusiast & Developer",
    description: "Exploring the intersection of security and software development. Building secure applications and learning how to protect digital systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar | Cyber Security Enthusiast & Developer",
    description: "Exploring the intersection of security and software development. Building secure applications and learning how to protect digital systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e5e5e5] font-sans">
        {children}
      </body>
    </html>
  );
}