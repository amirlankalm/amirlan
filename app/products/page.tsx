import Link from "next/link";
import { products } from "@/lib/content";
import { PageTitle, Shell } from "@/components/site";

export default function ProductsPage() {
  return (
    <Shell>
      <PageTitle label="index" title="products">
        <p>small systems built around agentic ai, execution, and autonomous web.</p>
      </PageTitle>

      <section className="border-t border-white/10">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="block border-b border-white/10 py-8"
          >
            <div className="grid gap-3 sm:grid-cols-[160px_1fr_92px]">
              <h2 className="text-xl text-stone-100">{product.name}</h2>
              <p className="leading-relaxed text-stone-400">{product.line}</p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:text-right">
                {product.status}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
