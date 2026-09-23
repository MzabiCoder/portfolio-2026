import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export const MONO = 'font-mono text-xs leading-[1.5] tracking-[.12em] uppercase';

/** Small monospaced label used for eyebrows, meta and captions. */
const Mono = forwardRef(function Mono({ as: Tag = 'span', className, children, ...rest }, ref) {
  return (
    <Tag ref={ref} className={cn(MONO, className)} {...rest}>
      {children}
    </Tag>
  );
});

export default Mono;
