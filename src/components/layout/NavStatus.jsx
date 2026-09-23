import Mono from '../common/Mono.jsx';
import Pulse from '../common/Pulse.jsx';

/** Availability chip shown on large screens. */
export default function NavStatus() {
  return (
    <Mono className="flex items-center gap-2.5 px-3.5 py-2 border border-line-2 rounded-full text-muted max-[1024px]:hidden">
      <Pulse />
      Available
    </Mono>
  );
}
