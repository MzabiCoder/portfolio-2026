import { C } from './constants.js';

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
export const CODE = SRC.map(line => {
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
export const TOTAL_CHARS = SRC.reduce((n, l) => n + l.length, 0);
