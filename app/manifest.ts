import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#f5f0e6",
    icons: [
      {
        src: "/social-share.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/social-share.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
