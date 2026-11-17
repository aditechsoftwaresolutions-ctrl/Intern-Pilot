import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://internpilot.ug";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1210" },
    { media: "(prefers-color-scheme: light)", color: "#F0FBF6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InternPilot — AI Tech Internship & Scholarship Hub for Uganda",
    template: "%s | InternPilot",
  },
  description:
    "AI-guided career hub empowering university students in Uganda (Makerere, Kyambogo, MUST) to discover, track, and apply for verified tech internships and scholarships on time.",
  keywords: [
    "Uganda tech internships",
    "Makerere university internships",
    "Kyambogo tech jobs",
    "Kampala software internships",
    "Uganda tech scholarships",
    "AI career advisor Uganda",
    "InternPilot",
    "Uganda graduate trainee",
    "African tech careers",
    "student internships Uganda",
  ],
  authors: [{ name: "InternPilot Uganda", url: siteUrl }],
  creator: "InternPilot Team",
  publisher: "InternPilot",
  applicationName: "InternPilot",
  category: "Career & Education",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: siteUrl,
    siteName: "InternPilot Uganda",
    title: "InternPilot — AI Tech Internship & Scholarship Hub for Uganda",
    description:
      "Discover verified tech internships and scholarships across Uganda with real-time deadline countdowns and grounded Gemini 2.5 Flash career guidance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InternPilot — AI Tech Internship & Scholarship Hub for Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InternPilot — AI Tech Internship & Scholarship Hub for Uganda",
    description:
      "Discover verified Ugandan tech internships and scholarships with grounded Gemini AI matching.",
    images: ["/og-image.png"],
    creator: "@InternPilotUG",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background text-gray-100 dark:bg-background dark:text-gray-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
