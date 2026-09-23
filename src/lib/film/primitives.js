import { C, W, H, DESK_Y, BLUE_A } from './constants.js';

export function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
export function grad(ctx, x, y, w) {
  const g = ctx.createLinearGradient(x, y, x + w, y);
  g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan);
  return g;
}
export function glow(ctx, x, y, r, color, a) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color.replace('A', a)); g.addColorStop(1, color.replace('A', 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
export function desk(ctx, a = 1) {
  const g = ctx.createLinearGradient(0, DESK_Y, 0, H + 200);
  g.addColorStop(0, `rgba(20,28,38,${.9 * a})`); g.addColorStop(1, 'rgba(11,15,20,0)');
  ctx.fillStyle = g; ctx.fillRect(-2000, DESK_Y, W + 4000, 900);
  ctx.fillStyle = `rgba(34,211,238,${.18 * a})`; ctx.fillRect(-2000, DESK_Y, W + 4000, 1);
}

/* ---- a miniature website, reused by scenes 2 & 3 ---- */
export function layout(x, y, w, h, mode) {
  const u = mode === 'desktop' ? w / 100 : mode === 'tablet' ? w / 56 : w / 30;
  const pad = u * 5, cw = w - pad * 2;
  const cols = mode === 'desktop' ? 3 : mode === 'tablet' ? 2 : 1;
  const gap = u * 2;
  const items = [];
  items.push({ k: 'logo', x: x + pad, y: y + u * 2.4, w: u * 7, h: u * 1.8 });
  if (mode === 'phone') items.push({ k: 'burger', x: x + w - pad - u * 3, y: y + u * 2.4, w: u * 3, h: u * 1.8 });
  else for (let i = 0; i < 3; i++) items.push({ k: 'link', x: x + w - pad - (i + 1) * u * 7 + u * 2, y: y + u * 2.9, w: u * 5, h: u * .8 });
  let cy = y + u * 9;
  items.push({ k: 'eyebrow', x: x + pad, y: cy, w: cw * .22, h: u * .8 }); cy += u * 2.4;
  items.push({ k: 'h1', x: x + pad, y: cy, w: cw * (mode === 'phone' ? .92 : .62), h: u * 4.6 }); cy += u * 5.8;
  items.push({ k: 'h1b', x: x + pad, y: cy, w: cw * (mode === 'phone' ? .7 : .44), h: u * 4.6 }); cy += u * 6.8;
  items.push({ k: 'p', x: x + pad, y: cy, w: cw * (mode === 'phone' ? .9 : .4), h: u * 1 }); cy += u * 1.9;
  items.push({ k: 'p', x: x + pad, y: cy, w: cw * (mode === 'phone' ? .75 : .33), h: u * 1 }); cy += u * 3.2;
  items.push({ k: 'btn', x: x + pad, y: cy, w: u * (mode === 'phone' ? 12 : 13), h: u * 3.4 });
  items.push({ k: 'btn2', x: x + pad + u * (mode === 'phone' ? 13.5 : 14.5), y: cy, w: u * 11, h: u * 3.4 }); cy += u * 7;
  const cardW = (cw - gap * (cols - 1)) / cols, cardH = u * (mode === 'phone' ? 14 : 16);
  for (let i = 0; i < 6; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    items.push({ k: 'card', x: x + pad + c * (cardW + gap), y: cy + r * (cardH + gap), w: cardW, h: cardH, i });
  }
  return { items, u, contentH: cy + Math.ceil(6 / cols) * (cardH + gap) - y };
}

export function drawItem(ctx, it, u, a = 1) {
  ctx.globalAlpha = a;
  switch (it.k) {
    case 'logo': ctx.fillStyle = C.text; rr(ctx, it.x, it.y, it.w * .3, it.h, 2); ctx.fill();
      ctx.fillStyle = 'rgba(248,250,252,.5)'; rr(ctx, it.x + it.w * .38, it.y + it.h * .3, it.w * .62, it.h * .4, 2); ctx.fill(); break;
    case 'link': ctx.fillStyle = 'rgba(248,250,252,.35)'; rr(ctx, it.x, it.y, it.w, it.h, it.h / 2); ctx.fill(); break;
    case 'burger': ctx.fillStyle = C.text; for (let i = 0; i < 2; i++) ctx.fillRect(it.x, it.y + it.h * (.25 + i * .45), it.w, Math.max(1, u * .22)); break;
    case 'eyebrow': ctx.fillStyle = C.cyan; rr(ctx, it.x, it.y, it.w, it.h, it.h / 2); ctx.fill(); break;
    case 'h1': ctx.fillStyle = C.text; rr(ctx, it.x, it.y, it.w, it.h, u * .5); ctx.fill(); break;
    case 'h1b': ctx.fillStyle = grad(ctx, it.x, it.y, it.w); rr(ctx, it.x, it.y, it.w, it.h, u * .5); ctx.fill(); break;
    case 'p': ctx.fillStyle = 'rgba(148,163,184,.45)'; rr(ctx, it.x, it.y, it.w, it.h, it.h / 2); ctx.fill(); break;
    case 'btn': ctx.fillStyle = grad(ctx, it.x, it.y, it.w); rr(ctx, it.x, it.y, it.w, it.h, it.h / 2); ctx.fill(); break;
    case 'btn2': ctx.strokeStyle = 'rgba(248,250,252,.35)'; ctx.lineWidth = Math.max(1, u * .12); rr(ctx, it.x, it.y, it.w, it.h, it.h / 2); ctx.stroke(); break;
    case 'card': {
      ctx.fillStyle = C.bg3; rr(ctx, it.x, it.y, it.w, it.h, u * .6); ctx.fill();
      const g = ctx.createLinearGradient(it.x, it.y, it.x + it.w, it.y + it.h * .6);
      const hue = it.i % 3;
      g.addColorStop(0, hue === 0 ? 'rgba(59,130,246,.55)' : hue === 1 ? 'rgba(34,211,238,.4)' : 'rgba(99,102,241,.45)');
      g.addColorStop(1, 'rgba(15,21,28,.2)');
      ctx.fillStyle = g; rr(ctx, it.x, it.y, it.w, it.h * .6, u * .6); ctx.fill();
      ctx.fillStyle = 'rgba(248,250,252,.7)'; rr(ctx, it.x + u, it.y + it.h * .68, it.w * .55, u * .9, u * .45); ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,.4)'; rr(ctx, it.x + u, it.y + it.h * .68 + u * 1.7, it.w * .38, u * .7, u * .35); ctx.fill();
      break;
    }
  }
  ctx.globalAlpha = 1;
}

export function drawSite(ctx, x, y, w, h, mode, time, scrollAmt = 1) {
  ctx.save();
  rr(ctx, x, y, w, h, mode === 'desktop' ? 4 : 10); ctx.clip();
  ctx.fillStyle = C.bg; ctx.fillRect(x, y, w, h);
  glow(ctx, x + w * .85, y + h * .1, w * .5, BLUE_A, .22);
  const L = layout(x, y, w, h, mode);
  const max = Math.max(0, L.contentH - h + L.u * 4);
  const off = max * (0.5 - 0.5 * Math.cos(time * .35)) * scrollAmt;
  ctx.translate(0, -off);
  L.items.forEach(it => drawItem(ctx, it, L.u));
  ctx.restore();
}

export function drawDevice(ctx, kind, x, y, w, h, time, a = 1) {
  ctx.save(); ctx.globalAlpha = a;
  const b = kind === 'desktop' ? 12 : kind === 'tablet' ? 12 : 7;
  // body
  ctx.fillStyle = '#05080B'; rr(ctx, x - b, y - b, w + b * 2, h + b * 2, kind === 'desktop' ? 10 : kind === 'tablet' ? 18 : 20); ctx.fill();
  ctx.strokeStyle = 'rgba(34,211,238,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
  if (kind === 'desktop') {
    ctx.fillStyle = '#070A0E';
    ctx.fillRect(x + w / 2 - 34, y + h + b, 68, DESK_Y - (y + h + b) - 8);
    rr(ctx, x + w / 2 - 110, DESK_Y - 10, 220, 10, 3); ctx.fill();
  }
  ctx.restore();
  ctx.save(); ctx.globalAlpha = a;
  drawSite(ctx, x, y, w, h, kind, time + (kind === 'tablet' ? 2 : kind === 'phone' ? 4 : 0));
  ctx.restore();
  // under-glow
  ctx.save(); ctx.globalAlpha = a * .8;
  glow(ctx, x + w / 2, DESK_Y + 4, w * .7, BLUE_A, .18);
  ctx.restore();
}
