import { forwardRef } from 'react';

/** Hairline reading-progress bar pinned to the top of the viewport. */
const ScrollProgress = forwardRef(function ScrollProgress(_, ref) {
  return (
    <div aria-hidden="true" className="fixed top-0 inset-x-0 h-0.5 z-[110] pointer-events-none">
      <span ref={ref} className="block h-full bg-grad origin-[0_50%] scale-x-0" />
    </div>
  );
});

export default ScrollProgress;
