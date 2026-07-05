import type { MetadataRoute } from "next";

const base = "https://amirlan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/blog", "/socials"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
