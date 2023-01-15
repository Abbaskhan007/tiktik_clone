/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["1.bp.blogspot.com", "cdn.pixabay.com", "res.cloudinary.com"],
  },
};
