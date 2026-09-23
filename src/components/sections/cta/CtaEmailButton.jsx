import Mono from '../../common/Mono.jsx';
import useCopyEmail from '../../../hooks/useCopyEmail.js';
import { SITE } from '../../../data/site.js';

/** Click-to-copy email with a gradient underline that grows on hover. */
export default function CtaEmailButton() {
  const copy = useCopyEmail(SITE.email);

  return (
    <button
      type="button"
      onClick={copy}
      className="group grid text-left font-display font-semibold text-[clamp(1.25rem,2.2vw,1.75rem)] tracking-[-.02em]"
    >
      <span className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-grad after:origin-[0_50%] after:scale-x-[.25] after:transition-transform after:duration-[.6s] after:ease-smooth group-hover:after:scale-x-100">
        {SITE.email}
      </span>
      <Mono className="text-muted text-[.65rem] mt-2">Click to copy</Mono>
    </button>
  );
}
