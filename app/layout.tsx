import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "amirlan kalmukhan",
  description:
    "amirlan kalmukhan — building agentic ai systems and autonomous web infrastructure from astana, kazakhstan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
