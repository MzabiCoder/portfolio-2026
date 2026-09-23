import { cn } from '../../lib/cn.js';
import NavLogo from './NavLogo.jsx';
import NavLinks from './NavLinks.jsx';
import NavStatus from './NavStatus.jsx';
import NavToggle from './NavToggle.jsx';

/** Fixed header: goes solid on scroll and hides while scrolling down. */
export default function Navbar({ solid, hidden, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[100] h-nav flex items-center gap-8 px-gutter',
        'transition-[transform,background-color,backdrop-filter] duration-[.6s] ease-smooth',
        solid && 'bg-[rgba(11,15,20,.6)] backdrop-blur-[14px] backdrop-saturate-[1.4] border-b border-line',
        hidden && '-translate-y-full',
      )}
    >
      <NavLogo onNavigate={onNavigate} />
      <NavLinks onNavigate={onNavigate} />
      <NavStatus />
      <NavToggle open={menuOpen} onToggle={onToggleMenu} />
    </header>
  );
}
