import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "amirlan.extensy.dev",
          },
        ],
        destination: "https://amirlan.dev/:path*",
        permanent: true,
      },
      // /experience was renamed to /work.
      { source: "/experience", destination: "/work", permanent: true },
      // The products section was retired; send old links home.
      { source: "/products", destination: "/", permanent: false },
      { source: "/products/:slug", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
