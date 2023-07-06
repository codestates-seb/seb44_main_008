import { useCallback } from 'react';

export function useBodyScrollLock() {
  let scrollPosition = 0;
  const lockScroll = useCallback(() => {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
  }, []);

  return { lockScroll, openScroll };
}
