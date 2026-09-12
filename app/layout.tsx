import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ahnaf-tariq-portfolio.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ahnaf Tariq — Fullstack Engineer | Next.js & Threejs Developer",
    template: "%s | Ahnaf Tariq",
  },
  description:
    "Ahnaf Tariq is a Fullstack Engineer based in Karachi, Pakistan, specializing in Next.js, Nest.js and interactive 3D web experiences with GSAP and Three.js. Available for freelance and full-time roles.",
  keywords: [
    "Ahnaf Tariq",
    "Fullstack Engineer",
    "Frontend Developer Pakistan",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Nest.js Developer",
    "Full-Stack Developer Karachi",
    "GSAP Animation Developer",
    "Three.js Developer",
    "React Native Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Ahnaf Tariq", url: SITE_URL }],
  creator: "Ahnaf Tariq",
  publisher: "Ahnaf Tariq",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ahnaf Tariq — Portfolio",
    title: "Ahnaf Tariq — Fullstack Engineer | Next.js & Threejs Developer",
    description:
      "Fullstack Engineer building fast, interactive, high-performance web applications with React.js, Next.js, and GSAP-powered 3D experiences.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Ahnaf Tariq — Fullstack Engineer Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahnaf Tariq — Fullstack Engineer | Next.js & Threejs Developer",
    description:
      "Fullstack Engineer building fast, interactive, high-performance web applications with React.js, Next.js, and GSAP-powered 3D experiences.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
