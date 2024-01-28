import { Store } from '@/types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const CURRENT_STORE_KEY = '/current-store';

// 현재 선택된 store를 전역 상태로 관리
const useCurrentStore = () => {
  // 새로운 store를 인자로 받아 swr의 mutate를 이용해 CURRENT_STORE_KEY 공간에 현재 선택된 store 저장
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);

  // 해당 함수 실행 시 currentStore를 null로 초기화
  const clearCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return {
    setCurrentStore,
    clearCurrentStore,
  };
};

export default useCurrentStore;
