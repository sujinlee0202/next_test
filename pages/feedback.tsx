import Header from '@/components/Header';
import { NextSeo } from 'next-seo';

export default function FeedbackPage() {
  return (
    <>
      <NextSeo
        title="피드백"
        description="매장 지도 서비스에 대한 피드백 받기"
        canonical="https://next-test-ten-ochre.vercel.app/"
      />
      <Header />
    </>
  );
}
