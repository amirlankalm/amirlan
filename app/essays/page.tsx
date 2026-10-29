import { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "essays · amirlan kalmukhan",
  description: "essays by amirlan kalmukhan, published as pdfs.",
};

export default function EssaysPage() {
  return (
    <SiteFrame>
      <section data-panel="essays">
        <p style={{ marginBottom: 20 }}>
          i write about science and math in anime/manga.
        </p>
        <div className="project-list">
          <div className="essay-item">
            <a
              href="/essays/idle-death-gamble.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              probability behind jujutsu kaisen: kinji hakari&apos;s idle death gamble
            </a>
          </div>
          <div className="essay-item">
            <a
              href="/essays/sukunas-cuts.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              topology behind jujutsu kaisen: ryomen sukuna&apos;s cuts
            </a>
          </div>
          <div className="essay-item">
            <a
              href="/essays/blue-red-purple.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              vector fields behind jujutsu kaisen: gojo satoru&apos;s blue, red and purple
            </a>
          </div>
          <div className="essay-item">
            <a
              href="/essays/infinite-void.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              information theory behind jujutsu kaisen: gojo satoru&apos;s unlimited void
            </a>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
