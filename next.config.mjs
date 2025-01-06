/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "https://playpen1234.s3.us-east-1.amazonaws.com"
      }
    ], // Allow all domains
  },
};

export default nextConfig;
