import { experiences } from "@/lib/content";
import { PageTitle, Shell, staggerDelay } from "@/components/site";

export const metadata = {
  title: "work",
  description: "cto & co-founder, voice-ai engineer, ai engineer, researcher, and robotics lead.",
};

export default function WorkPage() {
  return (
    <Shell>
      <PageTitle label="background" title="work">
        <p>
          founding agent4 labs, real-time voice ai at a yc-backed startup, ai
          engineering at a vc firm, materials research at a top central asian
          university, and competitive robotics.
        </p>
      </PageTitle>

      <section className="border-t border-white/10">
        {experiences.map((exp, i) => (
          <div
            key={i}
            style={staggerDelay(i)}
            className="reveal group border-b border-white/10 py-8 transition-colors sm:py-10"
          >
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-stone-400">
                  {exp.org}
                  {exp.orgDetail ? (
                    <span className="ml-3 normal-case tracking-normal text-stone-500">
                      {exp.orgDetail}
                    </span>
                  ) : null}
                </p>
                <h2 className="text-2xl text-stone-100 sm:text-3xl">{exp.role}</h2>
              </div>
              <p className="font-mono text-xs text-stone-400 sm:shrink-0">
                {exp.period}
              </p>
            </div>
            <ul className="space-y-3">
              {exp.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 leading-relaxed text-stone-400 transition-colors group-hover:text-stone-300"
                >
                  <span className="mt-[0.4em] h-px w-4 shrink-0 origin-left bg-stone-600 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-[1.6] group-hover:bg-stone-400" />
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
