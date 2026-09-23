import { useRef } from 'react';
import Wrap from './Wrap.jsx';
import Mono from '../common/Mono.jsx';
import FooterColumn from './FooterColumn.jsx';
import FooterWordmark from './FooterWordmark.jsx';
import { LINK_DRAW } from '../common/LinkDraw.jsx';
import useAnchorLink from '../../hooks/useAnchorLink.js';
import { useMarkFill } from '../../animations/useScrubbed.js';
import { FOOTER_COLUMNS } from '../../data/footer.js';
import { SITE } from '../../data/site.js';

/** Site footer: link columns, wordmark and the legal base line. */
export default function Footer() {
  const footerRef = useRef(null);
  const fillRef = useRef(null);
  const onAnchor = useAnchorLink();
  useMarkFill(fillRef, footerRef);

  return (
    <footer
      ref={footerRef}
      className="relative pt-[clamp(80px,10vw,140px)] border-t border-line bg-bg overflow-hidden"
    >
      <Wrap>
        <div className="grid grid-cols-3 gap-10 max-[760px]:grid-cols-2 max-[760px]:[&>div:last-child]:col-span-full">
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.label} {...column} />
          ))}
        </div>

        <FooterWordmark ref={fillRef} />

        <Mono className="flex flex-wrap justify-between gap-4 py-8 mt-8 border-t border-line text-muted">
          <span>© {new Date().getFullYear()} {SITE.name}. Hand-coded with HTML, CSS &amp; JS.</span>
          <a href="#top" onClick={onAnchor} className={LINK_DRAW}>Back to top ↑</a>
        </Mono>
      </Wrap>
    </footer>
  );
}
