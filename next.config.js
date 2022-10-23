/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // for static page, if you run ssr remove below config
  images: {
    unoptimized: true
  }
  // ---------------------------------------------------
}

module.exports = nextConfig
