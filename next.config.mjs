// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ビルド時にESLintエラーを無視
  },
  sassOptions: {
    warnOnly: true, // Sass の警告をエラーとして扱わない
  },
};

export default nextConfig;
