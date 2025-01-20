import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 

};
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    optimizeCss: false, 
  },
}
export default nextConfig;
