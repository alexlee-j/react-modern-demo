import type { NextConfig } from "next";
import withMDX from '@next/mdx';

const nextConfig: NextConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    // Add more MDX options here if needed
  },
  experimental: {
    mdxRs: true, // Enable Rust compiler for MDX
  },
});

export default nextConfig;
