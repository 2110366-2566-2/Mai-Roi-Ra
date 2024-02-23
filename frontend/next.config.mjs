/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com','images.unsplash.com','example.com','picsum.photos']

    },
    experimental: {
        serverActions: true
    }
}

export default nextConfig;
