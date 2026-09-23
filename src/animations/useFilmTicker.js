import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { tick } from '../lib/film/engine.js';
import { loadFrames } from '../lib/film/frames.js';

/** Single rAF loop that paints every visible film canvas. */
export default function useFilmTicker() {
  useEffect(() => {
    loadFrames();
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);
}
