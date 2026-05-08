/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        qualities: [70, 74, 75, 76, 78],
    },
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
