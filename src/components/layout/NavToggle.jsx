import { cn } from '../../lib/cn.js';

const BAR = 'absolute left-2.5 right-2.5 h-[1.5px] bg-text transition-[transform,top] duration-500 ease-smooth';

/** Hamburger that morphs into a close icon. */
export default function NavToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="menu"
      className="ml-auto relative w-11 h-11 hidden max-[1024px]:block"
    >
      <span className="sr-only">Menu</span>
      <span className={cn(BAR, open ? 'top-[22px] rotate-45' : 'top-[18px]')} />
      <span className={cn(BAR, open ? 'top-[22px] -rotate-45' : 'top-[26px]')} />
    </button>
  );
}
