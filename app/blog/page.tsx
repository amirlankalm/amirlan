import { PageTitle, Shell, delayStyle } from "@/components/site";

export default function BlogPage() {
  return (
    <Shell>
      <PageTitle label="Writing" title="Blog">
        <p>empty for now.</p>
      </PageTitle>

      <section className="reveal border-t border-[color:var(--color-line)] pt-10" style={delayStyle(240)}>
        <p className="text-xl leading-relaxed text-[color:var(--color-muted)]">
          nothing here yet.
        </p>
      </section>
    </Shell>
  );
}
