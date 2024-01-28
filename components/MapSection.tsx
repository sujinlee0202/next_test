import { NaverMap } from '@/types/map';
import Map from './Map';
import useMaps, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMaps';
import Markers from './Markers';
import useCurrentStore from '@/hooks/useCurrentStore';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Coordinates } from '@/types/store';

const MapSection = () => {
  const { initializeMap } = useMaps();
  const { clearCurrentStore } = useCurrentStore();
  const router = useRouter();

  // router.asPath : query값 (/?zoom~ 부분)
  // new URLSearchParams로 해당 부분을 객체로 생성
  const query = useMemo(
    () => new URLSearchParams(router.asPath.slice(1)),
    [router.asPath],
  );

  const initialZoom = useMemo(() => {
    return query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM;
  }, [query]);

  const initialCenter = useMemo<Coordinates>(() => {
    return query.get('lat') && query.get('lng')
      ? [Number(query.get('lat')), Number(query.get('lng'))]
      : INITIAL_CENTER;
  }, [query]);

  // onLoadMap = SWR을 이용해 맵을 전역 상태로 관리하도록 한다.
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);

    // 지도가 로드됬을 때 지도를 클릭하면 clearCurrentStore가 실행
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapSection;
