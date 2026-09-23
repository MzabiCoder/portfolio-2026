import { useEffect } from 'react';

/** Run a callback whenever Escape is pressed. */
export default function useEscapeKey(onEscape) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onEscape(); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onEscape]);
}
