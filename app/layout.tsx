import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "amirlan labs",
  description:
    "amirlan labs, a product lab building agentic ai and agentic infra for autonomous web.",
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
