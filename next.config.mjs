/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "images.pexels.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "picsum.photos",
      "s3-alpha-sig.figma.com",
    ],
  },
};

export default nextConfig;
