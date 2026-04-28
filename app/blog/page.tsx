import { PageTitle, Shell } from "@/components/site";

export default function BlogPage() {
  return (
    <Shell>
      <PageTitle label="writing" title="blog">
        <p>just some notes of mine.</p>
      </PageTitle>

      <section className="border-t border-white/10 pt-10">
        <p className="text-xl leading-relaxed text-stone-500">
          nothing here yet.
        </p>
      </section>
    </Shell>
  );
}
