import Link from "next/link";
import { products } from "@/lib/content";
import { PageTitle, Shell, staggerDelay } from "@/components/site";

export const metadata = {
  title: "products",
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
        {products.map((product, i) => {
          const extra = product.tech.length - 3;

          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              style={staggerDelay(i)}
              className="reveal group -mx-5 block border-b border-white/10 px-5 py-8 transition-colors hover:bg-white/[0.025] sm:-mx-8 sm:px-8 sm:py-10"
            >
              <div className="grid gap-2 sm:grid-cols-[180px_1fr_80px]">
                <h2 className="flex items-center gap-2 text-xl text-stone-200 transition-colors group-hover:text-stone-100">
                  {product.name}
                  <span className="text-stone-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-stone-300">
                    →
                  </span>
                </h2>
                <div className="space-y-1">
                  <p className="leading-relaxed text-stone-400 transition-colors group-hover:text-stone-300">
                    {product.line}
                  </p>
                  <p className="font-mono text-xs text-stone-500">
                    {product.tech.slice(0, 3).join(" · ")}
                    {extra > 0 ? (
                      <span className="text-stone-600"> · +{extra}</span>
                    ) : null}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 sm:text-right">
                  {product.status}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </Shell>
  );
}
