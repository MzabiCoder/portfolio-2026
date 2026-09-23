import { useCallback } from 'react';
import { useScroll } from '../context/ScrollProvider.jsx';

/** Intercept in-page anchors so Lenis performs the scroll. */
export default function useAnchorLink(onNavigate) {
  const { scrollToHash } = useScroll();

  return useCallback((event) => {
    const href = event.currentTarget.getAttribute('href') || '';
    if (!href.startsWith('#') || href.length < 2) return;
    event.preventDefault();
    onNavigate?.();
    scrollToHash(href);
  }, [onNavigate, scrollToHash]);
}
