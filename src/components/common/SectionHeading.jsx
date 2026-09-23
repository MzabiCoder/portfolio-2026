import { cn } from '../../lib/cn.js';

/**
 * Section headline. The optional `accent` tail is set in the italic serif
 * and painted with the brand gradient.
 */
export default function SectionHeading({ id, accent, className, children }) {
  return (
    <h2
      id={id}
      data-reveal-lines
      className={cn('font-display font-bold text-h2 tracking-[-.045em] mt-6', className)}
    >
      {children}
      {accent && (
        <span className="font-serif italic font-normal tracking-[-.02em] grad">{accent}</span>
      )}
    </h2>
  );
}
