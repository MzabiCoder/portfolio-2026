import DemoFrame from './DemoFrame.jsx';

/** Craft demo: an easing curve draws itself and a ball rides it. */
export default function EaseDemo() {
  return (
    <DemoFrame caption="cubic-bezier(.16, 1, .3, 1)">
      <svg viewBox="0 0 200 120" className="w-[72%] overflow-visible">
        <path
          d="M10 110 C 60 110, 70 10, 190 10"
          className="fill-none stroke-accent stroke-2 [stroke-dasharray:300] [stroke-dashoffset:300] transition-[stroke-dashoffset] duration-[1.2s] ease-smooth group-hover:[stroke-dashoffset:0] group-[.is-active]:[stroke-dashoffset:0]"
        />
        <path d="M10 10V110H190" className="fill-none stroke-line-2 stroke-1" />
      </svg>
      <span className="absolute left-[14%] top-[18%] w-3.5 h-3.5 rounded-full bg-grad shadow-[0_0_24px_rgba(34,211,238,.6)] transition-transform duration-[1.2s] ease-smooth group-hover:translate-x-[min(220px,18vw)] group-[.is-active]:translate-x-[min(220px,18vw)]" />
    </DemoFrame>
  );
}
