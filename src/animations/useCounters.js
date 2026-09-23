import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

/**
 * Stat readouts: `data-count` counts up to a number, `data-scramble`
 * decodes a short string glyph by glyph, both once on first view.
 */
export default function useCounters(ready) {
  useEffect(() => {
    if (!ready) return undefined;
    const timers = [];

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const o = { v: 0 };
        const to = +el.dataset.count;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: to,
              duration: to > 10 ? 2 : 1.2,
              ease: 'expo.out',
              onUpdate: () => { el.textContent = Math.round(o.v); },
            }),
        });
      });

      gsap.utils.toArray('[data-scramble]').forEach((el) => {
        const final = el.dataset.scramble;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            let f = 0;
            const total = 22;
            const id = setInterval(() => {
              el.textContent = [...final]
                .map((c, i) =>
                  f / total > (i + 1) / (final.length + 1) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])
                .join('');
              if (++f > total) { clearInterval(id); el.textContent = final; }
            }, 45);
            timers.push(id);
          },
        });
      });
    });

    return () => { timers.forEach(clearInterval); ctx.revert(); };
  }, [ready]);
}
