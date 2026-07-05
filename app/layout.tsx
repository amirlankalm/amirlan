import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import "./globals.css";

// Self-hosted General Sans (variable) — the geometric grotesk register, in the
// spirit of the Neue Montreal used across the reference sites.
const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  variable: "--font-general",
  weight: "200 700",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const base = "https://amirlan.dev";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "amirlan kalmukhan",
    template: "%s | amirlan kalmukhan",
  },
  description:
    "amirlan kalmukhan — founding engineer at speko (yc s26), building voice-ai infrastructure.",
  authors: [{ name: "amirlan kalmukhan", url: base }],
  keywords: [
    "amirlan kalmukhan",
    "speko",
    "yc s26",
    "voice ai",
    "founding engineer",
    "kazakhstan",
    "astana",
  ],
  openGraph: {
    title: "amirlan kalmukhan",
    description:
      "founding engineer at speko (yc s26), building voice-ai infrastructure.",
    url: base,
    siteName: "amirlan kalmukhan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "amirlan kalmukhan",
    description:
      "founding engineer at speko (yc s26), building voice-ai infrastructure.",
    creator: "@amirlankalm",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amirlan Kalmukhan",
  url: base,
  sameAs: [
    "https://x.com/amirlankalm",
    "https://github.com/amirlankalm",
    "https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/",
  ],
  jobTitle: "Founding Engineer",
  worksFor: { "@type": "Organization", name: "Speko" },
  knowsAbout: ["voice ai", "retrieval", "provider routing", "llm infrastructure"],
  nationality: "Kazakhstani",
  address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${generalSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
