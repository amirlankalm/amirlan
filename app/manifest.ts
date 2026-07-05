import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "amirlan kalmukhan",
    short_name: "amirlan",
    description: "founding engineer at speko (yc s26), building voice-ai infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef8f0",
    theme_color: "#eef8f0",
  };
}
