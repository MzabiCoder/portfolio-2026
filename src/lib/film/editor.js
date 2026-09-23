import { C, MONO, BLUE_A } from './constants.js';
import { CODE, TOTAL_CHARS } from './code.js';
import { rr, glow, grad } from './primitives.js';
import { clamp } from '../math.js';

export function editor(ctx, r, typed, time, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.fillStyle = '#0A0F16'; ctx.fillRect(r.x, r.y, r.w, r.h);
  glow(ctx, r.x + r.w * .7, r.y + r.h * .3, r.w * .6, BLUE_A, .12);
  // chrome
  ctx.fillStyle = '#080C11'; ctx.fillRect(r.x, r.y, r.w, 34); ctx.fillRect(r.x, r.y, 52, r.h);
  ['#334155', '#334155', '#334155'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(r.x + 18 + i * 14, r.y + 17, 4, 0, 7); ctx.fill(); });
  ctx.fillStyle = C.bg3; rr(ctx, r.x + 70, r.y + 6, 120, 28, 3); ctx.fill();
  ctx.fillStyle = '#CBD5E1'; ctx.font = `12px ${MONO}`; ctx.fillText('index.html', r.x + 86, r.y + 25);
  ctx.fillStyle = '#475569'; ctx.fillText('style.css', r.x + 214, r.y + 25);

  ctx.font = `15px ${MONO}`;
  const cw = ctx.measureText('M').width, lh = 23.5, x0 = r.x + 76, y0 = r.y + 66;
  let left = Math.floor(typed * TOTAL_CHARS), caret = null;
  CODE.forEach((toks, li) => {
    const y = y0 + li * lh;
    ctx.fillStyle = '#334155'; ctx.fillText(String(li + 1).padStart(2, ' '), r.x + 14, y);
    let col = 0;
    for (const [t, c] of toks) {
      if (left <= 0) break;
      const part = t.slice(0, left);
      ctx.fillStyle = c; ctx.fillText(part, x0 + col * cw, y);
      col += part.length; left -= part.length;
    }
    if (left <= 0 && !caret) caret = [x0 + col * cw, y];
    left -= 0; // newline is free
  });
  if (!caret) caret = [x0, y0 + CODE.length * lh];
  if (Math.sin(time * 6) > -.2) { ctx.fillStyle = C.cyan; ctx.fillRect(caret[0] + 1, caret[1] - 14, 2, 18); }
  ctx.restore();
}
