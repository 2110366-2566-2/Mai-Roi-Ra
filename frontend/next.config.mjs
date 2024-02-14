/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com','images.unsplash.com','example.com']

    },
    experimental: {
        serverActions: true
    }
}

export default nextConfig;
