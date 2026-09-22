/* ==========================================================================
   Nabil Fannane — Portfolio
   GSAP + ScrollTrigger + Lenis. No frameworks.
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const inOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const outExpo = t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const seg = (t, a, b) => clamp((t - a) / (b - a));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ------------------------------------------------------------------------
     FILM — one continuous film split across three sticky canvases.
     Uses a real image sequence when assets/frames/manifest.json exists:
       { "desktop": 360, "mobile": 180, "ext": "webp" }
     Otherwise draws a procedural stand-in (code → craft → devices).
     ------------------------------------------------------------------------ */
  const Film = (() => {
    const W = 1600, H = 900;
    const C = {
      bg: '#0B0F14', bg2: '#0F151C', bg3: '#141C26', text: '#F8FAFC', muted: '#64748B',
      blue: '#3B82F6', cyan: '#22D3EE', line: 'rgba(248,250,252,.08)'
    };
    const MONO = '"JetBrains Mono", ui-monospace, monospace';
    const DISPLAY = '"Inter Tight", system-ui, sans-serif';
    const SERIF = '"Instrument Serif", Georgia, serif';

    const views = [];
    let frames = null; // { imgs: [], count }

    /* ---- code for scene 1 ---- */
    const SRC = [
      '<!-- index.html -->',
      '<header class="nav">',
      '  <a class="logo" href="/">NF</a>',
      '</header>',
      '<section class="hero">',
      '  <h1>Ideas, engineered.</h1>',
      '  <p>Fast. Accessible. Responsive.</p>',
      '</section>',
      '',
      '/* style.css */',
      '.hero {',
      '  display: grid;',
      '  min-height: 100svh;',
      '  place-items: center;',
      '}',
      '.hero h1 {',
      '  font-size: clamp(3rem, 12vw, 14rem);',
      '  letter-spacing: -0.05em;',
      '}',
      '@media (max-width: 760px) { … }'
    ];
    const TOKEN = /(<!--.*?-->|\/\*.*?\*\/)|("[^"]*")|(<\/?[\w-]+|\/?>)|([\w-]+(?==))|([\w-]+(?=:\s))|(^[.@][^{]*)|(\d[\w.%]*)/g;
    const tokenColors = ['#475569', '#A5F3FC', C.blue, C.cyan, '#93C5FD', C.cyan, '#FBBF24'];
    const CODE = SRC.map(line => {
      const out = []; let last = 0, m;
      TOKEN.lastIndex = 0;
      while ((m = TOKEN.exec(line))) {
        if (m.index > last) out.push([line.slice(last, m.index), '#CBD5E1']);
        const gi = m.slice(1).findIndex(Boolean);
        out.push([m[0], tokenColors[gi]]);
        last = m.index + m[0].length;
        if (!m[0].length) TOKEN.lastIndex++;
      }
      if (last < line.length) out.push([line.slice(last), '#CBD5E1']);
      return out;
    });
    const TOTAL_CHARS = SRC.reduce((n, l) => n + l.length, 0);

    /* ---- geometry ---- */
    const MON = { x: 300, y: 130, w: 1000, h: 580 };
    const SCR = { x: MON.x + 14, y: MON.y + 14, w: MON.w - 28, h: MON.h - 28 };
    const SITE = { x: 200, y: 110, w: 1200, h: 680 }; // scene 2 end = scene 3 start
    const DESK_Y = 790;

    function rr(ctx, x, y, w, h, r) {
      r = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function grad(ctx, x, y, w) {
      const g = ctx.createLinearGradient(x, y, x + w, y);
      g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan);
      return g;
    }
    function glow(ctx, x, y, r, color, a) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color.replace('A', a)); g.addColorStop(1, color.replace('A', 0));
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const BLUE_A = 'rgba(59,130,246,A)', CYAN_A = 'rgba(34,211,238,A)';

    function desk(ctx, a = 1) {
      const g = ctx.createLinearGradient(0, DESK_Y, 0, H + 200);
      g.addColorStop(0, `rgba(20,28,38,${.9 * a})`); g.addColorStop(1, 'rgba(11,15,20,0)');
      ctx.fillStyle = g; ctx.fillRect(-2000, DESK_Y, W + 4000, 900);
      ctx.fillStyle = `rgba(34,211,238,${.18 * a})`; ctx.fillRect(-2000, DESK_Y, W + 4000, 1);
    }

    /* ---- a miniature website, reused by scenes 2 & 3 ---- */
    function layout(x, y, w, h, mode) {
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

    function drawItem(ctx, it, u, a = 1) {
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

    function drawSite(ctx, x, y, w, h, mode, time, scrollAmt = 1) {
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

    function drawDevice(ctx, kind, x, y, w, h, time, a = 1) {
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

    /* ---- Scene 1: The Idea ---- */
    function scene1(ctx, p, time) {
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

    function editor(ctx, r, typed, time, alpha = 1) {
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

    /* ---- Scene 2: The Craft ---- */
    const PIECES = (() => {
      const L = layout(SITE.x, SITE.y, SITE.w, SITE.h, 'desktop');
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      return { u: L.u, items: L.items.map((it, i) => ({ it, z: 2.2 + rnd() * 3.5, dx: (rnd() - .5) * 900, dy: (rnd() - .5) * 600, rot: (rnd() - .5) * .9, d: .06 + i * .032 })) };
    })();

    function scene2(ctx, p, time) {
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
    function scene3(ctx, p, time) {
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

    /* ---- render one view at global film time t (0..1) ---- */
    function render(v, time) {
      const { ctx, cw, ch } = v;
      const t = clamp(v.t);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, cw, ch);

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

    function nearestLoaded(i) {
      const a = frames.imgs;
      for (let d = 0; d < a.length; d++) {
        if (a[i - d] && a[i - d].complete && a[i - d].naturalWidth) return a[i - d];
        if (a[i + d] && a[i + d].complete && a[i + d].naturalWidth) return a[i + d];
      }
      return null;
    }

    async function loadFrames() {
      try {
        const res = await fetch('assets/frames/manifest.json', { cache: 'no-cache' });
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
          img.src = `assets/frames/${set}/f_${String(i + 1).padStart(4, '0')}.${ext}`;
          imgs[i] = img;
        };
        for (let c = 0; c < 6; c++) next(); // 6 parallel lanes
      } catch (_) { /* no frames yet: procedural film */ }
    }

    function resize(v) {
      const dpr = Math.min(devicePixelRatio || 1, innerWidth < 761 ? 1.5 : 1.75);
      const r = v.canvas.getBoundingClientRect();
      v.cw = Math.max(1, Math.round(r.width * dpr));
      v.ch = Math.max(1, Math.round(r.height * dpr));
      v.canvas.width = v.cw; v.canvas.height = v.ch;
    }

    function init() {
      $$('[data-film]').forEach(sec => {
        const [a, b] = sec.dataset.film.split(',').map(Number);
        const canvas = $('.film__canvas', sec);
        const v = { sec, canvas, ctx: canvas.getContext('2d'), a, b, t: a, visible: true, cw: 1, ch: 1 };
        resize(v);
        views.push(v);
      });
      const io = new IntersectionObserver(es => es.forEach(e => {
        const v = views.find(v => v.sec === e.target); if (v) v.visible = e.isIntersecting;
      }), { rootMargin: '10% 0px' });
      views.forEach(v => io.observe(v.sec));
      addEventListener('resize', () => views.forEach(resize));
      loadFrames();
      return views;
    }

    function setProgress(v, prog) { v.t = lerp(v.a, v.b, clamp(prog)); }
    function tick(time) { views.forEach(v => { if (v.visible) render(v, time); }); }

    return { init, setProgress, tick, views };
  })();

  /* ------------------------------------------------------------------------
     Text splitting — keeps nested spans, screen readers read the aria-label
     ------------------------------------------------------------------------ */
  function split(el, mode) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = mode === 'chars' ? 'word word--c' : 'word'; w.setAttribute('aria-hidden', 'true');
            if (mode === 'chars') [...part].forEach(ch => {
              const c = document.createElement('span'); c.className = 'char'; c.textContent = ch; w.appendChild(c);
            });
            else w.textContent = part;
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    el.classList.add('is-split');
    return mode === 'chars' ? $$('.char', el) : $$('.word', el);
  }

  // one continuous gradient across split glyphs (instead of one per glyph)
  function fixGradients() {
    $$('.grad.is-split, .grad .is-split, .is-split .grad, .mission__text em').forEach(box => {
      const bx = box.getBoundingClientRect();
      $$('.char, .word', box).forEach(el => {
        if (el.classList.contains('word') && el.querySelector('.char')) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--gw', `${bx.width}px`);
        el.style.setProperty('--gx', `${-(r.left - bx.left)}px`);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Fallback (no GSAP or reduced motion): static but complete page
     ------------------------------------------------------------------------ */
  const views = Film.init();

  if (!hasGsap || reduced) {
    if (!hasGsap) root.classList.remove('js');
    const pre = $('.preloader'); if (pre) pre.remove();
    views.forEach(v => Film.setProgress(v, v.sec.classList.contains('hero') ? .15 : .9));
    const draw = () => Film.tick(performance.now() / 1000);
    draw(); addEventListener('resize', draw);
    if (document.fonts) document.fonts.ready.then(draw);
    $$('[data-count]').forEach(el => (el.textContent = el.dataset.count));
    basics(null);
    return;
  }

  /* ------------------------------------------------------------------------
     Smooth scroll
     ------------------------------------------------------------------------ */
  gsap.registerPlugin(ScrollTrigger);
  const lenis = window.Lenis ? new Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false }) : null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  gsap.ticker.add(t => Film.tick(t));

  /* ------------------------------------------------------------------------
     Split + initial states
     ------------------------------------------------------------------------ */
  const heroChars = $$('.hero [data-split="chars"]').map(el => split(el, 'chars'));
  const ctaChars = $$('.cta [data-split="chars"]').map(el => split(el, 'chars'));
  const missionWords = split($('[data-mission]'), 'words');
  const revealLines = $$('[data-reveal-lines]').map(el => {
    const words = split(el, 'words');
    words.forEach(w => { const m = document.createElement('span'); m.className = 'wmask'; w.replaceWith(m); m.appendChild(w); });
    return { el, words };
  });

  gsap.set(heroChars.flat(), { yPercent: 115 });
  gsap.set('[data-hero-eyebrow], [data-hero-fade]', { autoAlpha: 0, y: 24 });
  gsap.set('.scroll-cue', { autoAlpha: 0 });
  gsap.set(ctaChars.flat(), { yPercent: 115 });
  gsap.set('[data-cta-fade]', { autoAlpha: 0, y: 30 });
  revealLines.forEach(r => gsap.set(r.words, { yPercent: 110 }));

  /* ------------------------------------------------------------------------
     Preloader → hero intro
     ------------------------------------------------------------------------ */
  scrollTo(0, 0);
  const pre = $('.preloader');
  const count = { v: 0 };
  const countEl = $('[data-preload-count]'), barEl = $('[data-preload-bar]');
  const counting = gsap.to(count, {
    v: 100, duration: 1.6, ease: 'power2.inOut',
    onUpdate() {
      countEl.textContent = String(Math.round(count.v)).padStart(3, '0');
      barEl.style.transform = `scaleX(${count.v / 100})`;
    }
  });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.all([fontsReady, counting.then()]).then(() => {
    fixGradients();
    ScrollTrigger.refresh();
    const tl = gsap.timeline({ onComplete: () => { pre.remove(); lenis && lenis.start(); } });
    tl.to('.preloader__inner', { autoAlpha: 0, y: -30, duration: .5, ease: 'power2.in' })
      .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.1')
      .to(heroChars.flat(), { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: .022 }, '-=.55')
      .to('[data-hero-eyebrow]', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=1.1')
      .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .1 }, '-=.9')
      .to('.scroll-cue', { autoAlpha: 1, duration: .8 }, '-=.6');
  });

  /* ------------------------------------------------------------------------
     Film sections
     ------------------------------------------------------------------------ */
  views.forEach(v => {
    ScrollTrigger.create({
      trigger: v.sec, start: 'top top', end: 'bottom bottom',
      onUpdate: st => Film.setProgress(v, st.progress),
      onRefresh: st => Film.setProgress(v, st.progress)
    });
  });

  // hero copy drifts away as the camera pushes in
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .6 } })
    .to('.hero__title', { yPercent: -18, scale: .9, autoAlpha: 0, ease: 'none', duration: .35 }, 0)
    .to('.hero__foot, .hero .eyebrow, .scroll-cue', { y: -60, autoAlpha: 0, ease: 'none', duration: .22 }, 0)
    .to({}, { duration: .65 });

  // film 2 captions
  const caps = $$('[data-cap]');
  const capTl = gsap.timeline({ scrollTrigger: { trigger: '.film--craft', start: 'top top', end: 'bottom bottom', scrub: .6 } });
  caps.forEach((c, i) => {
    const at = .08 + i * .22;
    capTl.fromTo(c, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: .07, ease: 'power2.out' }, at);
    if (i < caps.length - 1) capTl.to(c, { autoAlpha: 0, yPercent: -60, duration: .07, ease: 'power2.in' }, at + .15);
  });
  capTl.to({}, { duration: .05 }, .95);

  // final CTA assembles above the devices
  gsap.timeline({ scrollTrigger: { trigger: '.film--cta', start: 'top top', end: 'bottom bottom', scrub: .6 } })
    .to({}, { duration: .4 })
    .to(ctaChars.flat(), { yPercent: 0, ease: 'expo.out', duration: .3, stagger: .006 }, .4)
    .to('[data-cta-fade]', { autoAlpha: 1, y: 0, duration: .2, stagger: .05, ease: 'power2.out' }, .55)
    .to({}, { duration: .15 });

  /* ------------------------------------------------------------------------
     Reveals
     ------------------------------------------------------------------------ */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .08, overwrite: true })
  });
  revealLines.forEach(r => ScrollTrigger.create({
    trigger: r.el, start: 'top 85%', once: true,
    onEnter: () => gsap.to(r.words, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: .06 })
  }));
  $$('[data-clip]').forEach(el => ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' })
  }));

  // mission: words light up with scroll
  gsap.to(missionWords, {
    opacity: 1, ease: 'none', stagger: .1,
    scrollTrigger: { trigger: '.mission__text', start: 'top 78%', end: 'bottom 45%', scrub: true }
  });

  // counters + scramble
  $$('[data-count]').forEach(el => {
    const o = { v: 0 }, to = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(o, { v: to, duration: to > 10 ? 2 : 1.2, ease: 'expo.out', onUpdate: () => (el.textContent = Math.round(o.v)) })
    });
  });
  const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
  $$('[data-scramble]').forEach(el => {
    const final = el.dataset.scramble;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        let f = 0; const total = 22;
        const id = setInterval(() => {
          el.textContent = [...final].map((c, i) => (f / total > (i + 1) / (final.length + 1) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
          if (++f > total) { clearInterval(id); el.textContent = final; }
        }, 45);
      }
    });
  });

  // portrait parallax
  const pImg = $('[data-parallax]');
  if (pImg) gsap.fromTo(pImg, { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true } });

  // footer wordmark fills in
  gsap.to('[data-mark-fill]', {
    clipPath: 'inset(0 0% 0 0)', ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: true }
  });

  /* ------------------------------------------------------------------------
     Pillars — horizontal on desktop, stacked on mobile
     ------------------------------------------------------------------------ */
  const pillars = $$('.pillar');
  const activate = i => pillars.forEach((p, j) => p.classList.toggle('is-active', i === j));
  const mm = gsap.matchMedia();
  mm.add('(min-width: 761px)', () => {
    const track = $('[data-pillars-track]');
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '[data-pillars]', start: 'top top', end: () => `+=${dist()}`,
        pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1,
        onUpdate: st => activate(Math.round(st.progress * (pillars.length - 1))),
        onEnter: () => activate(0)
      }
    });
  });
  mm.add('(max-width: 760px)', () => {
    pillars.forEach((p, i) => ScrollTrigger.create({ trigger: p, start: 'top 60%', end: 'bottom 40%', onToggle: st => st.isActive && activate(i) }));
  });

  // Speed demo ring
  const ring = $('[data-ring]'), ringNum = $('[data-ring-num]');
  let ringDone = false;
  new MutationObserver(() => {
    if (ringDone || !pillars[1].classList.contains('is-active')) return;
    ringDone = true;
    const o = { v: 0 };
    gsap.to(o, { v: 100, duration: 1.8, ease: 'expo.out', onUpdate: () => { ring.style.strokeDashoffset = 327 * (1 - o.v / 100); ringNum.textContent = Math.round(o.v); } });
  }).observe(pillars[1], { attributes: true, attributeFilter: ['class'] });

  basics(lenis);

  /* ------------------------------------------------------------------------
     Shared UI (works with or without GSAP)
     ------------------------------------------------------------------------ */
  function basics(lenis) {
    const g = window.gsap;

    // Reach demo: layout reflows desktop → tablet → phone
    const reflow = $('[data-reflow]'), rLabel = $('[data-reflow-label]');
    const states = [['', '1440px'], ['is-tablet', '768px'], ['is-phone', '375px']];
    let si = 0;
    if (reflow && !reduced) setInterval(() => {
      si = (si + 1) % states.length;
      reflow.className = 'reflow ' + states[si][0]; rLabel.textContent = states[si][1];
    }, 1800);

    // nav: solid after hero start, hide on scroll down
    const nav = $('[data-nav]'), bar = $('.progress span');
    let lastY = 0;
    const onScroll = y => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      nav.classList.toggle('is-solid', y > 40);
      if (!menuOpen) nav.classList.toggle('is-hidden', y > 240 && y > lastY);
      lastY = y;
    };
    if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
    else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

    // anchor links (film sections scroll to their final frame)
    const goTo = hash => {
      const target = hash === '#top' ? 0 : $(hash);
      if (target === null) return;
      let y = 0;
      if (target) {
        y = target.getBoundingClientRect().top + scrollY;
        if (target.classList.contains('film')) y += target.offsetHeight - innerHeight;
      }
      if (lenis) lenis.scrollTo(y, { duration: 1.8, easing: t => 1 - Math.pow(1 - t, 4) });
      else scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    };
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (h.length < 2) return;
      e.preventDefault(); closeMenu(); goTo(h);
    }));

    // mobile menu
    const toggle = $('[data-menu-toggle]'), menu = $('[data-menu]');
    let menuOpen = false;
    function closeMenu() {
      if (!menuOpen) return;
      menuOpen = false; toggle.setAttribute('aria-expanded', 'false'); menu.hidden = true; lenis && lenis.start();
    }
    toggle.addEventListener('click', () => {
      if (menuOpen) return closeMenu();
      menuOpen = true; toggle.setAttribute('aria-expanded', 'true'); menu.hidden = false; lenis && lenis.stop();
      nav.classList.remove('is-hidden');
      if (g && !reduced) g.fromTo($$('a', menu), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .9, ease: 'expo.out', stagger: .06 });
    });
    addEventListener('keydown', e => e.key === 'Escape' && closeMenu());

    // local time
    const clock = $('[data-clock]');
    const setClock = () => (clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setClock(); setInterval(setClock, 30000);
    const yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();

    // copy email
    const toast = $('[data-toast]');
    let toastT;
    const say = msg => { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 2200); };
    $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); say('Email copied ✓'); }
      catch (_) { location.href = `mailto:${b.dataset.copy}`; }
    }));

    if (!finePointer || reduced) return;

    // custom cursor
    root.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const m = { x: innerWidth / 2, y: innerHeight / 2 }, r = { x: m.x, y: m.y };
    addEventListener('pointermove', e => { m.x = e.clientX; m.y = e.clientY; dot.style.transform = `translate3d(${m.x}px,${m.y}px,0)`; }, { passive: true });
    const loop = () => {
      r.x += (m.x - r.x) * .16; r.y += (m.y - r.y) * .16;
      ring.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
      preview.x += (m.x - preview.x) * .12; preview.y += (m.y - preview.y) * .12;
      if (previewEl) previewEl.style.translate = `${preview.x + 24}px ${preview.y - 110}px`;
      requestAnimationFrame(loop);
    };
    document.addEventListener('pointerover', e => {
      const lab = e.target.closest('[data-cursor]');
      const hov = e.target.closest('a, button, .service');
      cur.classList.toggle('is-label', !!lab);
      label.textContent = lab ? lab.dataset.cursor : '';
      cur.classList.toggle('is-hover', !lab && !!hov);
    });
    document.addEventListener('pointerleave', () => cur.classList.remove('is-hover', 'is-label'));

    // magnetic buttons
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const b = el.getBoundingClientRect();
        const x = (e.clientX - b.left - b.width / 2) * .35, y = (e.clientY - b.top - b.height / 2) * .35;
        g ? g.to(el, { x, y, duration: .6, ease: 'power3.out' }) : (el.style.transform = `translate(${x}px,${y}px)`);
      });
      el.addEventListener('pointerleave', () => {
        g ? g.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .4)' }) : (el.style.transform = '');
      });
    });

    // services hover preview
    const previewEl = $('.service-preview'), previewImg = $('[data-preview-img]');
    const preview = { x: m.x, y: m.y };
    $$('.service').forEach(s => {
      s.addEventListener('pointerenter', () => { previewImg.src = s.dataset.preview; previewEl.classList.add('is-on'); });
      s.addEventListener('pointerleave', () => previewEl.classList.remove('is-on'));
    });
    loop();
  }

  // keep split gradients aligned on resize
  let rz;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(fixGradients, 150); });
})();
