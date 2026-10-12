import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The founder's portfolio used to live on this domain; its pages now live on the subdomain.
  async redirects() {
    const moved = ["projects", "resume", "experience", "skills", "certificates", "achievements", "form"];
    return moved.map((page) => ({
      source: `/${page}`,
      destination: `https://dedan.okwaretech.com/${page}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
