import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Mono from '../components/common/Mono.jsx';

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

/** Single transient message pinned to the bottom of the screen. */
export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const say = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={say}>
      {children}
      <Mono
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 bottom-8 -translate-x-1/2 z-[170] px-5 py-3 rounded-full bg-text text-bg pointer-events-none transition-[transform,opacity] duration-[.6s] ease-smooth ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[300%]'
        }`}
      >
        {message}
      </Mono>
    </ToastContext.Provider>
  );
}
