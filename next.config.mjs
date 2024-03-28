/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // styled-componentsの設定
  compiler: {
    // styled-componentsを有効にする
    styledComponents: true,
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
};


export default nextConfig;