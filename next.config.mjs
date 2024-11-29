/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Correct protocol for CloudFront
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https', // Use HTTPS for CloudFront
                hostname: 'dq1z5gvyi71s7.cloudfront.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
