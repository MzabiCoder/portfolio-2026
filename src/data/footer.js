import { SITE } from './site.js';

export const FOOTER_COLUMNS = [
  {
    label: 'Navigation',
    links: [
      { href: '#work', label: 'Work' },
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  {
    label: 'Social',
    links: [
      { href: SITE.github, label: 'GitHub', external: true },
      // TODO: replace with the real LinkedIn profile
      { href: SITE.linkedin, label: 'LinkedIn' },
    ],
  },
  {
    label: 'Contact',
    links: [{ href: `mailto:${SITE.email}`, label: SITE.email }],
    showClock: true,
  },
];
