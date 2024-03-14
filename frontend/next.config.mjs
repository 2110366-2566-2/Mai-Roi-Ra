/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['drive.google.com','images.unsplash.com','example.com','picsum.photos']
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],

    },
    experimental: {
        serverActions: true
    }
}

export default nextConfig;
