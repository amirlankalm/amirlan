import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const base = "https://amirlan.dev";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "amirlan kalmukhan",
    template: "%s | amirlan kalmukhan",
  },
  description:
    "amirlan kalmukhan — 15 y/o founder from astana, kazakhstan. cto @ agent4 labs, building agentic ai systems and autonomous web infrastructure.",
  authors: [{ name: "amirlan kalmukhan", url: base }],
  keywords: [
    "amirlan kalmukhan",
    "agent4 labs",
    "extensy",
    "agentic ai",
    "ai engineer",
    "kazakhstan",
    "astana",
  ],
  openGraph: {
    title: "amirlan kalmukhan",
    description:
      "15 y/o founder from astana, kazakhstan. cto @ agent4 labs, building agentic ai infra.",
    url: base,
    siteName: "amirlan kalmukhan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "amirlan kalmukhan",
    description:
      "15 y/o founder from astana, kazakhstan. cto @ agent4 labs, building agentic ai infra.",
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
  jobTitle: "CTO & Co-Founder",
  worksFor: { "@type": "Organization", name: "Agent4 Labs" },
  knowsAbout: ["agentic ai", "chrome extensions", "web automation", "llm infrastructure"],
  nationality: "Kazakhstani",
  address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
