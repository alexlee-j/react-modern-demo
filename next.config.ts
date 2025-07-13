import type { NextConfig } from "next";
import withMDX from '@next/mdx';

// Create MDX plugin
const withMDXPlugin = withMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    // Add more MDX options here if needed
  },
});

// Create Next.js config with experimental features
const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true, // Enable Rust compiler for MDX
  },
};

// Apply MDX plugin to the Next.js config
export default withMDXPlugin(nextConfig);
