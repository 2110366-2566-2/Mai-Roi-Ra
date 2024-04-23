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
    },
    env: {
      FRONTEND_URL : process.env.FRONTEND_URL,
      BACKEND_URL : process.env.BACKEND_URL,
    }
}

export default nextConfig;
