import { createContext, useContext, useEffect, useRef } from 'react';

const PointerContext = createContext(null);

/** Latest pointer position, shared by the cursor and the service preview. */
export const usePointer = () => useContext(PointerContext);

export default function PointerProvider({ children }) {
  const pointer = useRef({ x: innerWidth / 2, y: innerHeight / 2 });

  useEffect(() => {
    const onMove = (e) => { pointer.current.x = e.clientX; pointer.current.y = e.clientY; };
    addEventListener('pointermove', onMove, { passive: true });
    return () => removeEventListener('pointermove', onMove);
  }, []);

  return <PointerContext.Provider value={pointer}>{children}</PointerContext.Provider>;
}
