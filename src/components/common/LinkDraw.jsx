import { cn } from '../../lib/cn.js';

export const LINK_DRAW =
  "relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px " +
  'after:bg-current after:scale-x-0 after:origin-[100%_50%] after:transition-transform after:duration-[.6s] after:ease-smooth ' +
  'hover:after:scale-x-100 hover:after:origin-[0_50%] focus-visible:after:scale-x-100 focus-visible:after:origin-[0_50%]';

/** Link whose underline draws in from the left on hover. */
export default function LinkDraw({ className, children, ...rest }) {
  return (
    <a className={cn(LINK_DRAW, className)} {...rest}>
      {children}
    </a>
  );
}
