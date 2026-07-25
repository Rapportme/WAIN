/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Site Generation — export-compatible for a fully static, SEO-first deploy.
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // next/image optimisation is disabled under `output: export`; assets are
    // already delivered as SVG / pre-sized raster, and unoptimized keeps the
    // static export self-contained.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    // Silence the Dart-Sass legacy-API deprecation noise from Next's pipeline.
    quietDeps: true,
  },
};

export default nextConfig;
