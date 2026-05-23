import type { MetadataRoute } from "next";
import { products } from "@/lib/content";

const base = "https://amirlan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_routes = ["/", "/abt-me", "/experience", "/products", "/socials", "/blog"].map(
    (route) => ({ url: `${base}${route}`, lastModified: new Date() })
  );

  const product_routes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...static_routes, ...product_routes];
}
