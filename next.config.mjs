/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
