/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['inflearn-nextjs.vercel.app', 'search.pstatic.net'],
  },
  i18n: {
    locales: ['ko'], // 언어 후보들 설정
    defaultLocale: 'ko', // 대표 언어
  },
};

module.exports = nextConfig;
