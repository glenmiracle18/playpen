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
        hostname: "glentestbucket23.s3.eu-north-1.amazonaws.com"
      }
    ], // Allow all domains
  },
};

export default nextConfig;
