import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "amirlan kalmukhan",
    short_name: "amirlan",
    description: "15 y/o founder from astana, kazakhstan. cto @ agent4 labs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0d",
    theme_color: "#0f0f0d",
  };
}
