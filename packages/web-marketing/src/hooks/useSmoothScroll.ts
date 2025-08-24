import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

export function useSmoothScroll() {
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      // Check if we're on the client side
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

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
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      ...options,
    });
  }, []);

  const scrollToPosition = useCallback(
    (position: number, options: ScrollOptions = {}) => {
      // Check if we're on the client side
      if (typeof window === 'undefined') {
        return;
      }

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
