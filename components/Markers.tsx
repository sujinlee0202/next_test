import { MAP_KEY } from '@/hooks/useMaps';
import { STORE_KEY } from '@/hooks/useStores';
import { ImageIcon, NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import useSWR from 'swr';
import Marker from './Marker';
import useCurrentStore, { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  // 둘중 하나라도 없을 경우 null을 return
  if (!map || !stores) return null;

  // 모두 있을 경우 매장 데이터를 돌면서 Marker 컴포넌트 렌더링
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map} // 마커를 그릴 대상 map
            coordinates={store.coordinates} // 마커를 그릴 위치 (위경도)
            key={store.nid}
            icon={generateStoreMarkerIcon(store.season, false)} // 몇번째 이미지를 사용할 것인지 : store.season
            // marker을 누르면 setCurrentStore 실행 => 방금 누른 매장을 currentStore로 지정 가능
            onClick={() => setCurrentStore(store)}
          ></Marker>
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        ></Marker>
      )}
    </>
  );
};

export default Markers;

// 마커는 각각의 매장마다 generateStoreMarkerIcon 함수를 통해 적절한 아이콘을 얻는다.
// 이 함수는 스프라이트 이미지에서 적절한 index의 이미지를 하나 뽑아
// 그 이미지를 마커의 아이콘으로 사용한다.

// 현재 스프라이트 이미지는 54*64 이미지가 13개 붙어있는 스프라이트 이미지이다.
const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;

// 하지만 위의 아이콘들은 너무 커서 2/3 스케일로 네이버 지도에 표시한다.
const SCALE = 2 / 3;

// 따라서 SCALE이 적용된 사이즈를 generateStoreMarkerIcon에 넣는다.
const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean,
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png', // 스프라이트 이미지 경로
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT), // 하나의 아이콘에 대한 사이즈
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), // 스프라이트 이미지에서 몇번째 아이콘을 사용할 것인지 (이미지 가로 * index = 해당 이미지 위치)
    scaledSize: new naver.maps.Size( // 원본 이미지를 scale할 때 사용
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT,
    ),
  };
}
