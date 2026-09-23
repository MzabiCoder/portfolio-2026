import { cn } from '../../lib/cn.js';
import useMagnetic from '../../hooks/useMagnetic.js';

const BASE =
  'relative inline-flex items-center gap-3 h-14 px-7 rounded-full font-medium text-base whitespace-nowrap ' +
  'overflow-hidden isolate transition-[color,border-color] duration-500 ease-smooth ' +
  "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:translate-y-[101%] " +
  'before:transition-transform before:duration-[.6s] before:ease-smooth hover:before:translate-y-0 ' +
  '[&_i]:not-italic [&_i]:transition-transform [&_i]:duration-500 [&_i]:ease-smooth hover:[&_i]:translate-x-1';

const VARIANTS = {
  primary: 'bg-grad text-[#04111f] before:bg-text',
  ghost: 'border border-line-2 before:bg-text hover:text-bg',
};

/** Pill button/link with a wipe-up hover fill and optional magnetic pull. */
export default function Button({
  as: Tag = 'a', variant = 'primary', large = false, magnetic = true, className, children, ...rest
}) {
  const ref = useMagnetic(magnetic);

  return (
    <Tag
      ref={ref}
      className={cn(BASE, VARIANTS[variant], large && 'h-[68px] px-9 text-[1.1rem]', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
