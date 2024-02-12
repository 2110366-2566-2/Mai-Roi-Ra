/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com','images.unsplash.com']

    },
    experimental: {
        serverActions: true
    }
}

export default nextConfig;
