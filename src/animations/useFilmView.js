import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap.js';
import { createView, destroyView, resizeView, setProgress, render } from '../lib/film/engine.js';

/**
 * Bind one sticky canvas to its section: the section's scroll progress maps
 * onto the view's slice of the film, and the canvas only paints while visible.
 */
export default function useFilmView({ canvasRef, sectionRef, range, staticProgress }) {
  const [a, b] = range;

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const view = createView(canvas, a, b);

    const io = new IntersectionObserver(([e]) => { view.visible = e.isIntersecting; }, { rootMargin: '10% 0px' });
    io.observe(section);

    const onResize = () => { resizeView(view); render(view, performance.now() / 1000); };
    addEventListener('resize', onResize);

    let st;
    if (staticProgress == null) {
      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setProgress(view, self.progress),
        onRefresh: (self) => setProgress(view, self.progress),
      });
    } else {
      setProgress(view, staticProgress);
      render(view, performance.now() / 1000);
    }

    return () => {
      st && st.kill();
      io.disconnect();
      removeEventListener('resize', onResize);
      destroyView(view);
    };
  }, [canvasRef, sectionRef, a, b, staticProgress]);
}
