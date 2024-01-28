import DetailContent from '@/components/DetailContent';
import DetailHeader from '@/components/DetailHeader';
import { Store } from '@/types/store';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '@/styles/detail.module.scss';
import useCurrentStore from '@/hooks/useCurrentStore';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true; // 매장 상세페이지에서는 항상 전체 크기로 보이게 될 것

  const router = useRouter();
  // 랜딩페이지로 돌아갈 때 현재 매장이 선택되어 있어야 하기 때문
  const { setCurrentStore } = useCurrentStore();

  // map으로 돌아가는 함수
  const goToMap = () => {
    setCurrentStore(store);
    // 현재 매장을 중심좌표로 하고 zoom을 15록 한 뒤 랜딩페이지로 이동
    router.push(
      `/?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}`,
    );
  };

  return (
    <div
      className={`${styles.detailSection} ${styles.selected} ${styles.expanded}`}
    >
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={goToMap}
      />
      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
};

export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = [{ params: { name: 'test' } }];
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};
