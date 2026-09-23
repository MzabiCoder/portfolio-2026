/** Animated film-grain overlay sitting above the page. */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="fixed -inset-full z-[90] pointer-events-none opacity-[.055] bg-grain animate-grain"
    />
  );
}
