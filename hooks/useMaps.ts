import { useCallback } from 'react';
import { Coordinates } from '../types/store';
import { NaverMap } from '@/types/map';
import useSWR, { mutate } from 'swr';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMaps = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    // initial center와 initial zoom으로 맵의 좌표와 줌 레벨을 변경
    // map.morph : 부드러운 UX로 화면이 전환
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  const getMapOptions = useCallback(() => {
    // 중심을 구하는 getCenter과 zoom을 구하는 getZoom을 통해 현재 지도의 중심 좌표와 줌 레벨을 return
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};

export default useMaps;
