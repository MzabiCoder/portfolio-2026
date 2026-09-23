export const PILLARS = [
  {
    num: '01',
    title: 'Craft',
    copy: 'Interfaces that feel obvious. Clean structure, considered typography and motion that guides rather than decorates.',
    demo: 'ease',
  },
  {
    num: '02',
    title: 'Speed',
    copy: 'Fast is a feature. Lean code, smart loading and performance budgets that survive real-world devices.',
    demo: 'ring',
  },
  {
    num: '03',
    title: 'Reach',
    copy: 'Built for everyone. Semantic, accessible, responsive, so the experience holds up for every user and every screen.',
    demo: 'reflow',
  },
];

/** Viewport widths the reach demo cycles through. */
export const REFLOW_STATES = [
  { cols: 'grid-cols-4', width: 'w-[80%]', label: '1440px' },
  { cols: 'grid-cols-2', width: 'w-[56%]', label: '768px' },
  { cols: 'grid-cols-1', width: 'w-[26%]', label: '375px' },
];
