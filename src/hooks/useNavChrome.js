import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../context/ScrollProvider.jsx';

/**
 * Nav chrome state: solid once you leave the top, hidden while scrolling
 * down, plus the scaled progress bar (written straight to the DOM so it
 * never triggers a render on every scroll frame).
 */
export default function useNavChrome(menuOpen) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef(null);
  const lastY = useRef(0);
  const { lenisRef } = useScroll();

  useEffect(() => {
    const onScroll = (y) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setSolid(y > 40);
      setHidden(!menuOpen && y > 240 && y > lastY.current);
      lastY.current = y;
    };

    const lenis = lenisRef.current;
    if (lenis) {
      const handler = (e) => onScroll(e.scroll);
      lenis.on('scroll', handler);
      return () => lenis.off('scroll', handler);
    }

    const handler = () => onScroll(scrollY);
    addEventListener('scroll', handler, { passive: true });
    handler();
    return () => removeEventListener('scroll', handler);
  }, [menuOpen, lenisRef]);

  useEffect(() => { if (menuOpen) setHidden(false); }, [menuOpen]);

  return { solid, hidden, barRef };
}
