/** @type {import('next').NextConfig} */
const path = require('path')
require("dotenv").config();

const basePath = process.env.BASEPATH ?? "";
console.log('BASEPATH', basePath);
console.log('SERVER_PORT', process.env.SERVER_PORT);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  env: {
    serverPort: process.env.SERVER_PORT || 80,
    serverHost: process.env.SERVER_HOST || 'localhost'

  },
  // for static page, if you run ssr remove below config
  images: {
    unoptimized: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // ---------------------------------------------------
}

module.exports = nextConfig
