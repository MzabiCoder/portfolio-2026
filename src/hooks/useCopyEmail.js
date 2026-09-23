import { useCallback } from 'react';
import { useToast } from '../context/ToastProvider.jsx';

/** Copy an address to the clipboard, falling back to a mailto: link. */
export default function useCopyEmail(email) {
  const say = useToast();

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      say('Email copied ✓');
    } catch {
      location.href = `mailto:${email}`;
    }
  }, [email, say]);
}
