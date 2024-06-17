/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.suggestsolutions.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'www.suggestsolutions.com',
              port: ''
            }
        ]
    }
};

export default nextConfig;
