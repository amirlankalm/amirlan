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
    title: `${product.name} | amirlan labs`,
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

      <Section title="core info">
        <div className="grid gap-5 text-stone-400 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600">
            stage
          </p>
          <p>{product.stage}</p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600">
            status
          </p>
          <p>{product.status}</p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600">
            tech
          </p>
          <p>{product.tech.join(" / ")}</p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600">
            repo
          </p>
          <p>
            {product.github ? (
              <TextLink href={product.github}>github</TextLink>
            ) : (
              <span className="text-stone-600">private</span>
            )}
          </p>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600">
            website
          </p>
          <p>
            {product.website ? (
              <TextLink href={product.website}>website</TextLink>
            ) : (
              <span className="text-stone-600">not public yet</span>
            )}
          </p>
        </div>
      </Section>

      <Section title="notes">
        <ul className="space-y-3 text-xl leading-relaxed text-stone-300">
          {product.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </Section>
    </Shell>
  );
}
