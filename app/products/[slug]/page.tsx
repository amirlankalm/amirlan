import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/content";
import { PageTitle, Section, Shell, TextLink } from "@/components/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <PageTitle label={product.status} title={product.name}>
        <p>{product.description}</p>
      </PageTitle>

      <Section title="details" delay={240}>
        <div className="grid gap-y-5 text-stone-400 sm:grid-cols-[140px_1fr] sm:gap-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:pt-px">
            stage
          </p>
          <p>{product.stage}</p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:pt-px">
            status
          </p>
          <p>{product.status}</p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:pt-px">
            tech
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {product.tech.map((t) => (
              <span key={t} className="font-mono text-sm text-stone-400">
                {t}
              </span>
            ))}
          </div>

          {product.github ? (
            <>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:pt-px">
                repo
              </p>
              <p>
                <TextLink href={product.github}>github →</TextLink>
              </p>
            </>
          ) : null}

          {product.website ? (
            <>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:pt-px">
                website
              </p>
              <p>
                <TextLink href={product.website}>{product.website.replace("https://", "")} →</TextLink>
              </p>
            </>
          ) : null}
        </div>
      </Section>

      <Section title="what it does" delay={360}>
        <ul className="space-y-4">
          {product.notes.map((note) => (
            <li
              key={note}
              className="group flex gap-4 leading-relaxed text-stone-300"
            >
              <span className="mt-[0.55em] h-px w-4 shrink-0 bg-stone-700 transition-colors group-hover:bg-stone-500" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Shell>
  );
}
