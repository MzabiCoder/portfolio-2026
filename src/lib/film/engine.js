import { C, W, H } from './constants.js';
import { scene1, scene2, scene3 } from './scenes.js';
import { getFrames, nearestLoaded } from './frames.js';
import { clamp, lerp } from '../math.js';

/**
 * A "view" is one sticky canvas that renders a slice [a, b] of the film.
 * Views are created by React components and registered here so a single
 * rAF loop can paint every visible canvas.
 */
const views = [];

export function createView(canvas, a, b) {
  const view = { canvas, ctx: canvas.getContext('2d'), a, b, t: a, visible: true, cw: 1, ch: 1 };
  resizeView(view);
  views.push(view);
  return view;
}

export function destroyView(view) {
  const i = views.indexOf(view);
  if (i > -1) views.splice(i, 1);
}

export function resizeView(v) {
  const dpr = Math.min(devicePixelRatio || 1, innerWidth < 761 ? 1.5 : 1.75);
  const r = v.canvas.getBoundingClientRect();
  v.cw = Math.max(1, Math.round(r.width * dpr));
  v.ch = Math.max(1, Math.round(r.height * dpr));
  v.canvas.width = v.cw;
  v.canvas.height = v.ch;
}

export function resizeAll() {
  views.forEach(resizeView);
}

/** Map a 0..1 scroll progress onto this view's slice of the film. */
export function setProgress(v, prog) {
  v.t = lerp(v.a, v.b, clamp(prog));
}

/** Render one view at global film time t (0..1). */
export function render(v, time) {
  const { ctx, cw, ch } = v;
  const t = clamp(v.t);
  const frames = getFrames();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, cw, ch);

  if (frames) {
    const n = frames.count, idx = Math.round(t * (n - 1));
    const img = nearestLoaded(idx);
    if (img) {
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
      ctx.drawImage(img, (cw - iw) / 2, (ch - ih) / 2, iw, ih);
    }
    return;
  }

  const portrait = cw / ch < 1, end = t >= .67;
  const s = portrait ? cw / (W * (end ? .62 : .78)) : Math.max(cw / W, ch / H);
  ctx.setTransform(s, 0, 0, s, (cw - W * s) / 2, (ch - H * s) / 2 + (portrait ? ch * (end ? .2 : .04) : 0));
  if (t < .34) scene1(ctx, t / .34, time);
  else if (t < .67) scene2(ctx, (t - .34) / .33, time);
  else scene3(ctx, (t - .67) / .33, time);
}

/** Paint every visible view. */
export function tick(time) {
  views.forEach((v) => { if (v.visible) render(v, time); });
}

export const getViews = () => views;
