import { experiences } from "@/lib/content";
import { PageTitle, Shell } from "@/components/site";

export const metadata = {
  title: "experience | amirlan kalmukhan",
  description: "ai engineer, researcher, and robotics lead.",
};

export default function ExperiencePage() {
  return (
    <Shell>
      <PageTitle label="background" title="experience">
        <p>
          ai engineering at a vc firm, materials research at a top central asian
          university, and competitive robotics — before turning 16.
        </p>
      </PageTitle>

      <section className="border-t border-white/10">
        {experiences.map((exp, i) => (
          <div key={i} className="border-b border-white/10 py-10 sm:py-12">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-stone-500">
                  {exp.org}
                  {exp.orgDetail ? (
                    <span className="ml-3 normal-case tracking-normal text-stone-600">
                      {exp.orgDetail}
                    </span>
                  ) : null}
                </p>
                <h2 className="text-2xl text-stone-100 sm:text-3xl">{exp.role}</h2>
              </div>
              <p className="font-mono text-xs text-stone-600 sm:shrink-0">{exp.period}</p>
            </div>
            <ul className="space-y-3">
              {exp.points.map((point) => (
                <li key={point} className="flex gap-3 text-stone-400 leading-relaxed">
                  <span className="mt-[0.4em] h-px w-4 shrink-0 bg-stone-700" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Shell>
  );
}
