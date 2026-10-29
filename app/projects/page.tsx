import { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "projects · amirlan kalmukhan",
  description: "projects by amirlan kalmukhan",
};

export default function ProjectsPage() {
  return (
    <SiteFrame>
      <section data-panel="projects">
        <div>
          <div className="project">
            <a
              href="https://github.com/amirlankalm/euphemia"
              target="_blank"
              rel="noopener noreferrer"
            >
              euphemia
            </a>
            <p className="desc">
              an rl environment for the decision a voice agent actually makes: whether to speak, when, and what.
            </p>
          </div>
          <div className="project">
            <a
              href="https://github.com/amirlankalm/ai-research-foundations"
              target="_blank"
              rel="noopener noreferrer"
            >
              ai research foundations
            </a>
            <p className="desc">
              a visual, intuition-first path from basic python to ai research: pytorch, nanogpt, dpo, grpo.
            </p>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
