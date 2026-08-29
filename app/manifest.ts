import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.givenName,
    description: profile.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#100f0e",
    theme_color: "#100f0e",
  };
}
