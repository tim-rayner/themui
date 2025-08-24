import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

export function useSmoothScroll() {
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
          ...options,
        });
      }
    },
    []
  );

  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      ...options,
    });
  }, []);

  const scrollToPosition = useCallback(
    (position: number, options: ScrollOptions = {}) => {
      window.scrollTo({
        top: position,
        behavior: 'smooth',
        ...options,
      });
    },
    []
  );

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition,
  };
}
