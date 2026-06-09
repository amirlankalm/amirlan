import { PageTitle, Shell, delayStyle } from "@/components/site";

export default function BlogPage() {
  return (
    <Shell>
      <PageTitle label="writing" title="blog">
        <p>just some notes of mine.</p>
      </PageTitle>

      <section className="reveal border-t border-white/10 pt-10" style={delayStyle(240)}>
        <p className="text-xl leading-relaxed text-stone-400">
          nothing here yet.
        </p>
      </section>
    </Shell>
  );
}
