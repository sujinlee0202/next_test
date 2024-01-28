import Header from '@/components/Header';
import { NextSeo } from 'next-seo';

export default function Feedback() {
  return (
    <>
      <NextSeo
        title="피드백"
        description="매장 지도 서비스에 대한 피드백 받기"
      />
      <Header />
    </>
  );
}
