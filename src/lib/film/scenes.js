import { C, W, H, MON, SCR, SITE, DESK_Y, BLUE_A, CYAN_A, MONO, SERIF } from './constants.js';
import { rr, grad, glow, desk, layout, drawItem, drawSite, drawDevice } from './primitives.js';
import { editor } from './editor.js';
import { clamp, lerp, inOut, outExpo, seg } from '../math.js';

/* ---- Scene 1: The Idea ---- */
export function scene1(ctx, p, time) {
  const e = inOut(p);
  const s = lerp(.64, 2.3, e);
  const cx = lerp(560, 680, e), cy = lerp(520, 420, e);
  ctx.save();
  ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-cx, -cy);

  glow(ctx, 800, 420, 900, BLUE_A, .22 + .04 * Math.sin(time * .8));
  desk(ctx);

  // monitor
  ctx.fillStyle = '#05080B'; ctx.fillRect(MON.x + MON.w / 2 - 40, MON.y + MON.h, 80, DESK_Y - MON.y - MON.h - 6);
  rr(ctx, MON.x + MON.w / 2 - 150, DESK_Y - 12, 300, 12, 4); ctx.fill();
  rr(ctx, MON.x, MON.y, MON.w, MON.h, 14); ctx.fill();
  ctx.strokeStyle = 'rgba(34,211,238,.4)'; ctx.lineWidth = 1.5; ctx.stroke();
  // keyboard
  ctx.fillStyle = '#0A0E13'; rr(ctx, 560, DESK_Y + 30, 480, 34, 6); ctx.fill();
  ctx.strokeStyle = 'rgba(59,130,246,.3)'; ctx.lineWidth = 1; ctx.stroke();

  editor(ctx, SCR, clamp(.3 + p * .75), time);
  ctx.restore();
}

/* ---- Scene 2: The Craft ---- */
const PIECES = (() => {
  const L = layout(SITE.x, SITE.y, SITE.w, SITE.h, 'desktop');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return { u: L.u, items: L.items.map((it, i) => ({ it, z: 2.2 + rnd() * 3.5, dx: (rnd() - .5) * 900, dy: (rnd() - .5) * 600, rot: (rnd() - .5) * .9, d: .06 + i * .032 })) };
})();

export function scene2(ctx, p, time) {
  // pass through the screen
  const through = seg(p, 0, .28);
  if (through < 1) {
    ctx.save();
    const s = 2.3 * (1 + inOut(through) * 2.2);
    ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-680, -420);
    editor(ctx, SCR, 1, time, 1 - through);
    ctx.restore();
  }
  glow(ctx, W * .5, H * .45, 900, BLUE_A, .16 * seg(p, .1, .4));
  glow(ctx, W * .8, H * .2, 600, CYAN_A, .08 * seg(p, .2, .5));

  // blueprint grid draws itself
  const gp = seg(p, .12, .55), ga = 1 - seg(p, .82, 1) * .7;
  if (gp > 0) {
    ctx.save(); ctx.strokeStyle = `rgba(59,130,246,${.28 * ga})`; ctx.lineWidth = 1;
    const cols = 12, colW = (SITE.w - 120) / cols;
    for (let i = 0; i <= cols; i++) {
      const x = SITE.x + 60 + i * colW, len = SITE.h * outExpo(clamp(gp * 1.6 - i * .05));
      ctx.beginPath(); ctx.moveTo(x, SITE.y); ctx.lineTo(x, SITE.y + len); ctx.stroke();
    }
    for (let j = 0; j <= 8; j++) {
      const y = SITE.y + j * (SITE.h / 8), len = SITE.w * outExpo(clamp(gp * 1.6 - j * .06));
      ctx.beginPath(); ctx.moveTo(SITE.x, y); ctx.lineTo(SITE.x + len, y); ctx.stroke();
    }
    ctx.restore();
  }

  // type specimen + easing curve (floating, then leaves)
  const fx = seg(p, .25, .45) * (1 - seg(p, .72, .88));
  if (fx > 0) {
    ctx.save(); ctx.globalAlpha = fx;
    ctx.fillStyle = grad(ctx, 1040, 300, 380);
    ctx.font = `italic 300px ${SERIF}`; ctx.fillText('Aa', 1030 + (1 - fx) * 60, 460);
    ctx.font = `12px ${MONO}`; ctx.fillStyle = '#94A3B8'; ctx.fillText('INSTRUMENT SERIF — ITALIC', 1050, 500);
    const bx = 1090, by = 580, bw = 300, bh = 160, cp = seg(p, .3, .6);
    ctx.strokeStyle = 'rgba(248,250,252,.2)'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
    ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 60 * cp; i++) {
      const t = i / 60, e = 1 - Math.pow(1 - t, 4);
      const x = bx + t * bw, y = by + bh - e * bh;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    const bt = (time * .5) % 1, be = 1 - Math.pow(1 - bt, 4);
    ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(bx + bt * bw, by + bh - be * bh, 7, 0, 7); ctx.fill();
    ctx.font = `12px ${MONO}`; ctx.fillStyle = '#94A3B8'; ctx.fillText('cubic-bezier(.16, 1, .3, 1)', bx, by + bh + 28);
    // colour tokens
    [C.bg, C.blue, C.cyan, C.text].forEach((c, i) => {
      ctx.fillStyle = c; rr(ctx, 230 + i * 58, 220, 46, 46, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(248,250,252,.2)'; ctx.lineWidth = 1; ctx.stroke();
    });
    ctx.restore();
  }

  // interface pieces fly in and lock into the layout
  const cx = W / 2, cy = H / 2;
  PIECES.items.forEach(pc => {
    const q = inOut(seg(p, .18 + pc.d, .62 + pc.d));
    if (q <= 0) return;
    const z = lerp(pc.z, 1, q);
    const tx = pc.it.x + pc.dx * (1 - q), ty = pc.it.y + pc.dy * (1 - q);
    ctx.save();
    const ox = pc.it.x + pc.it.w / 2, oy = pc.it.y + pc.it.h / 2;
    const sx = cx + (tx + pc.it.w / 2 - cx) / z, sy = cy + (ty + pc.it.h / 2 - cy) / z;
    ctx.translate(sx, sy); ctx.rotate(pc.rot * (1 - q)); ctx.scale(1 / z, 1 / z); ctx.translate(-ox, -oy);
    if (q < 1) { ctx.shadowColor = 'rgba(34,211,238,.5)'; ctx.shadowBlur = 30 * (1 - q); }
    drawItem(ctx, pc.it, PIECES.u, clamp(q * 2.5));
    ctx.restore();
  });

  // browser chrome locks the layout into a finished site
  const lock = seg(p, .82, 1);
  if (lock > 0) {
    ctx.save(); ctx.globalAlpha = lock;
    ctx.strokeStyle = 'rgba(34,211,238,.45)'; ctx.lineWidth = 1.5;
    rr(ctx, SITE.x, SITE.y, SITE.w, SITE.h, 6); ctx.stroke();
    ctx.restore();
  }
}

/* ---- Scene 3: Shipped ---- */
const DEV = {
  desktop: { x: 620, y: 545, w: 360, h: 206 },
  tablet: { x: 400, y: 600, w: 130, h: 175 },
  phone: { x: 1090, y: 648, w: 66, h: 128 }
};
export function scene3(ctx, p, time) {
  const q = inOut(seg(p, 0, .6));
  glow(ctx, W / 2, 620, 900, BLUE_A, lerp(.16, .22, q));
  desk(ctx, q);
  const D = DEV.desktop;
  const x = lerp(SITE.x, D.x, q), y = lerp(SITE.y, D.y, q), w = lerp(SITE.w, D.w, q), h = lerp(SITE.h, D.h, q);
  if (q < .02) {
    drawSite(ctx, x, y, w, h, 'desktop', time, 0);
    ctx.strokeStyle = 'rgba(34,211,238,.45)'; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 6); ctx.stroke();
  } else {
    drawDevice(ctx, 'desktop', x, y, w, h, time * q, 1);
  }
  const tIn = inOut(seg(p, .35, .8)), pIn = inOut(seg(p, .45, .9));
  if (tIn > 0) drawDevice(ctx, 'tablet', DEV.tablet.x - (1 - tIn) * 500, DEV.tablet.y, DEV.tablet.w, DEV.tablet.h, time, tIn);
  if (pIn > 0) drawDevice(ctx, 'phone', DEV.phone.x + (1 - pIn) * 500, DEV.phone.y, DEV.phone.w, DEV.phone.h, time, pIn);
}

