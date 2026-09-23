import Mono from '../../common/Mono.jsx';

/** Shared bezel for the three pillar demos. */
export default function DemoFrame({ caption, children }) {
  return (
    <div
      aria-hidden="true"
      className="relative self-end justify-self-end w-full max-w-[340px] aspect-[4/3] border border-line rounded-sm bg-[rgba(11,15,20,.6)] grid place-items-center max-[1024px]:justify-self-start"
    >
      {children}
      <Mono className="absolute left-4 bottom-3 text-muted text-[.65rem]">{caption}</Mono>
    </div>
  );
}
