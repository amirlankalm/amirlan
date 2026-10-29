import { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "projects · amirlan kalmukhan",
  description: "projects by amirlan kalmukhan",
};

export default function ProjectsPage() {
  return (
    <SiteFrame>
      <section data-panel="projects">
        <div>
          {projects.map((project) => (
            <div className="project" key={project.name}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
              <p className="desc">{project.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
