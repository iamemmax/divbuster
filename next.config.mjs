/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'dq1z5gvyi71s7.cloudfront.net',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.brandfetch.io',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'be-test.divebusters.app',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'be-test.divebusters.app',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'flagcdn.com',
          pathname: '/**',
        },
      ],
    },
    experimental: {
      missingSuspenseWithCSRBailout: true,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
