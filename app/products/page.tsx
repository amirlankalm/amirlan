import Link from "next/link";
import { products } from "@/lib/content";
import { PageTitle, Shell } from "@/components/site";

export const metadata = {
  title: "products | amirlan kalmukhan",
  description: "systems built around agentic ai, execution, and autonomous web.",
};

export default function ProductsPage() {
  return (
    <Shell>
      <PageTitle label="index" title="products">
        <p>
          small systems built around agentic ai, browser execution, and
          autonomous web infrastructure.
        </p>
      </PageTitle>

      <section className="border-t border-white/10">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group block border-b border-white/10 py-8 transition hover:bg-white/[0.02] -mx-5 px-5 sm:-mx-8 sm:px-8"
          >
            <div className="grid gap-2 sm:grid-cols-[180px_1fr_80px]">
              <h2 className="text-xl text-stone-200 group-hover:text-stone-100 transition-colors">
                {product.name}
              </h2>
              <div className="space-y-1">
                <p className="leading-relaxed text-stone-400">{product.line}</p>
                <p className="font-mono text-xs text-stone-600">
                  {product.tech.slice(0, 3).join(" · ")}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-600 sm:text-right">
                {product.status}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
