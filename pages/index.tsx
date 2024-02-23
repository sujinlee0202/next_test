import Header from '@/components/Header';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import MapSection from '@/components/MapSection';
import { NextPage } from 'next';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import { useEffect, useCallback } from 'react';
import useMaps from '@/hooks/useMaps';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';
import DetailSection from '@/components/DetailSection';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();
  const { resetMapOptions, getMapOptions } = useMaps();

  // router 변경
  const router = useRouter();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  // 공유하기 버튼을 눌렀을 때 실행되는 함수
  // 현재 지도의 mapOptions를 가져오고 query string을 생성한다.
  // router.replace를 사용해 url의 query를 해당 query로 대체한다.
  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);

    copy(location.origin + query);
  }, [router, getMapOptions]);

  return (
    <>
      <NextSeo
        title="지도 서비스 만들기"
        description="지도 서비스 만들기 설명란"
        canonical="https://next-test-ten-ochre.vercel.app/"
      />
      <Header
        onClickLogo={resetMapOptions}
        rightElements={[
          <button
            key="button"
            onClick={replaceAndCopyUrl}
            className={styles.box}
            style={{ marginRight: 8 }}
            aria-label="현재 위치 클립보드에 복사"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link
            href="/feedback"
            key="feedback"
            className={styles.box}
            aria-label="피드백 페이지로 이동"
          >
            <VscFeedback />
          </Link>,
        ]}
      />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
  ).then((res: Response) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
