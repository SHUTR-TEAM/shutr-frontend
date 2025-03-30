const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "127.0.0.1",
      "shutrco.eu-north-1.s3.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "shutrco.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
