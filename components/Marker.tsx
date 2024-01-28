import { Marker } from '@/types/map';
import React, { useEffect } from 'react';

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;

    // mount됬을 때 map이 있다면 naver.maps의 Marker class를 이용해 새로운 marker instance 생성
    if (map) {
      marker = new naver.maps.Marker({
        map: map, // 대상 지도
        position: new naver.maps.LatLng(...coordinates), // 마커를 표시할 position
        icon,
      });
    }

    // onCLick이 있을 경우 naver.map.Event.addListener을 통해 onClick함수가 실행
    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map, coordinates, icon, onClick]);

  return null;
};

export default Marker;
