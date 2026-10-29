"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlyphDragonInit } from "@/components/glyph-dragon-canvas";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentTab = pathname?.startsWith("/projects")
    ? "projects"
    : pathname?.startsWith("/essays")
    ? "essays"
    : "about";

  return (
    <>
      <GlyphDragonInit />
      <div
        className="dragon-veil fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(251, 250, 246, 0) calc(50% - 520px), rgba(251, 250, 246, 0.92) calc(50% - 340px), rgba(251, 250, 246, 0.92) calc(50% + 340px), rgba(251, 250, 246, 0) calc(50% + 520px))",
        }}
      />
      <main
        className="wrap relative mx-auto max-w-[640px] px-5 pt-16 pb-24"
        style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "64px 20px 96px" }}
      >
        <header style={{ marginBottom: 24, paddingTop: 16 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
            amirlan kalmukhan
          </h1>
        </header>

        <nav
          aria-label="Sections"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 22,
            marginBottom: 32,
            fontFamily: "var(--serif)",
            fontSize: "1.12rem",
          }}
        >
          <Link
            href="/about"
            className={`nav-tab ${currentTab === "about" ? "active" : ""}`}
          >
            about
          </Link>
          <Link
            href="/projects"
            className={`nav-tab ${currentTab === "projects" ? "active" : ""}`}
          >
            projects
          </Link>
          <Link
            href="/essays"
            className={`nav-tab ${currentTab === "essays" ? "active" : ""}`}
          >
            essays
          </Link>
        </nav>

        {children}

        <footer className="footer">
          <div className="socials">
            <a
              href="https://x.com/amirlankalm"
              target="_blank"
              rel="noopener noreferrer"
            >
              x
            </a>
            <a
              href="https://www.linkedin.com/in/amirlank"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a
              href="https://github.com/amirlankalm"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="https://cal.com/amirlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              cal
            </a>
            <a
              href="https://www.instagram.com/amirlannk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>
          </div>
          <p className="footer-email">
            email:{" "}
            <a href="mailto:amirlannk@gmail.com">
              amirlannk[at]gmail[dot]com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
