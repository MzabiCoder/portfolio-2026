/** Keyboard-only shortcut to the main content. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[200] px-4 py-[10px] bg-text text-bg -translate-y-[200%] transition-transform duration-300 ease-smooth focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}

