import { useEffect, useState } from 'react';

const format = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/** Local time, refreshed every 30 seconds. */
export default function useClock() {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}
