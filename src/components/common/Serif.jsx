import { cn } from '../../lib/cn.js';

export const SERIF = 'font-serif italic font-normal tracking-[-.01em]';

/** Italic display serif accent, optionally painted with the brand gradient. */
export default function Serif({ gradient = false, className, children, ...rest }) {
  return (
    <span className={cn(SERIF, gradient && 'grad', className)} {...rest}>
      {children}
    </span>
  );
}
