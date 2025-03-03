// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['images.pexels.com'],
//   },

// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com', '127.0.0.1'], // Allow localhost
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**", // Allow images under the /media path
      },
    ],
  },
};

export default nextConfig;

