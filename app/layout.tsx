import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { profile, siteUrl } from "@/lib/profile";
import "./globals.css";

const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  variable: "--font-general",
  weight: "200 700",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbfaf6",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: profile.name,
  title: "Amirlan Kalmukhan",
  description: profile.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "personal website",
  keywords: [...profile.keywords],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llm.txt", title: "LLM profile alias" },
        { url: "/llms.txt", title: "LLM profile summary" },
        { url: "/ai.txt", title: "AI agent profile data" },
        { url: "/humans.txt", title: "Human-readable site credits" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Amirlan Kalmukhan",
    description: profile.description,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_US",
    countryName: profile.location.country,
    emails: [profile.email],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Amirlan Kalmukhan",
    description: profile.description,
    creator: "@amirlankalm",
  },
  other: {
    "profile:first_name": profile.givenName,
    "profile:last_name": profile.familyName,
    "profile:username": "amirlankalm",
    "ai:summary": profile.description,
    "ai:entities": [
      profile.name,
      profile.company.name,
      profile.location.city,
      profile.location.country,
    ].join(", "),
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  alternateName: [...profile.aliases],
  description: profile.description,
  url: siteUrl,
  email: profile.email,
  sameAs: [...profile.sameAs],
  jobTitle: profile.title,
  knowsAbout: [...profile.knowsAbout],
  nationality: "Kazakhstani",
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressCountry: profile.location.countryCode,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: profile.name,
  url: siteUrl,
  description: profile.description,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
  about: { "@id": `${siteUrl}/#person` },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: `${profile.name} profile`,
  description: profile.description,
  mainEntity: { "@id": `${siteUrl}/#person` },
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
      className={`${geist.variable} ${newsreader.variable} ${generalSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=STIX+Two+Text:ital,wght@0,400..700;1,400..700&display=swap"
        />
        <script src="/glyph-dragon.js" defer></script>
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd, profilePageJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
