import { forwardRef } from 'react';
import Mono from './Mono.jsx';
import { cn } from '../../lib/cn.js';

/** Thin rule used to separate two halves of an eyebrow label. */
export const Dash = () => <span className="w-8 h-px bg-line-2" />;

/** Muted mono label that introduces a section. */
const Eyebrow = forwardRef(function Eyebrow({ as = 'p', className, children, ...rest }, ref) {
  return (
    <Mono as={as} ref={ref} className={cn('flex items-center gap-[14px] text-muted', className)} {...rest}>
      {children}
    </Mono>
  );
});

export default Eyebrow;
