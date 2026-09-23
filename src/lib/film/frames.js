/**
 * Pre-rendered film frames (optional progressive enhancement).
 * When a frame manifest exists the canvas plays images instead of the
 * procedural scenes — exactly as the original site did.
 */
let frames = null;

export const getFrames = () => frames;

export function nearestLoaded(i) {
  const a = frames.imgs;
  for (let d = 0; d < a.length; d++) {
    if (a[i - d] && a[i - d].complete && a[i - d].naturalWidth) return a[i - d];
    if (a[i + d] && a[i + d].complete && a[i + d].naturalWidth) return a[i + d];
  }
  return null;
}

export async function loadFrames() {
  try {
    const res = await fetch('/assets/frames/manifest.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const m = await res.json();
    const set = innerWidth < 761 && m.mobile ? 'mobile' : 'desktop';
    const count = m[set]; if (!count) return;
    const ext = m.ext || 'webp';
    const imgs = new Array(count);
    const order = [];
    for (let step of [16, 4, 1]) for (let i = 0; i < count; i += step) if (!order.includes(i)) order.push(i);
    frames = { imgs, count };
    let k = 0;
    const next = () => {
      if (k >= order.length) return;
      const i = order[k++], img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = next;
      img.src = `/assets/frames/${set}/f_${String(i + 1).padStart(4, '0')}.${ext}`;
      imgs[i] = img;
    };
    for (let c = 0; c < 6; c++) next(); // 6 parallel lanes
  } catch (_) { /* no frames yet: procedural film */ }
}

