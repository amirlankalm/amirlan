import { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Amirlan Kalmukhan",
  description: "i'm 15, a researcher from kazakhstan, interested in post-training.",
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <section data-panel="about">
        <p>
          i&apos;m 15, a researcher from kazakhstan, interested in post-training.
        </p>

        <p className="label">past lives</p>
        <ul className="timeline">
          <li>
            founding engineer at{" "}
            <a
              href="https://speko.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="inline-icon"
                src="/icons/speko.svg"
                alt=""
                aria-hidden="true"
              />
              speko
            </a>{" "}
            (yc s26)
            <span className="sub">↳ built infrastructure for voice agents</span>
          </li>
          <li>
            swe intern at{" "}
            <a
              href="https://whitehillcapital.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="inline-icon"
                src="/icons/whitehillcapital.svg"
                alt=""
                aria-hidden="true"
              />
              white hill capital
            </a>
          </li>
        </ul>

        <p>
          on the side i write{" "}
          <Link href="/essays">essays</Link>, mostly about science and math in anime/manga.
        </p>
      </section>
    </SiteFrame>
  );
}
