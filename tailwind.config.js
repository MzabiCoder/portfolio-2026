/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        'bg-2': '#0F151C',
        'bg-3': '#141C26',
        line: 'rgba(248,250,252,.08)',
        'line-2': 'rgba(248,250,252,.16)',
        text: '#F8FAFC',
        muted: '#94A3B8',
        soft: '#CBD5E1',
        primary: '#3B82F6',
        accent: '#22D3EE',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3.5rem, min(12.5vw, 19vh), 14rem)', { lineHeight: '.86' }],
        h2: ['clamp(2.75rem, 7.5vw, 8rem)', { lineHeight: '.92' }],
        mission: ['clamp(1.9rem, 4.6vw, 4.75rem)', { lineHeight: '1.04' }],
        body: ['clamp(1rem, 1.1vw, 1.1875rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
        nav: 'var(--nav-h)',
      },
      maxWidth: {
        wrap: 'var(--max)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.16, 1, .3, 1)',
        'in-out-quart': 'cubic-bezier(.76, 0, .24, 1)',
      },
      backgroundImage: {
        grad: 'linear-gradient(100deg, #3B82F6 0%, #22D3EE 100%)',
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        ambient:
          'radial-gradient(40% 35% at 80% 10%, rgba(59,130,246,.14), transparent 70%), radial-gradient(35% 30% at 10% 90%, rgba(34,211,238,.08), transparent 70%)',
      },
      screens: {
        // Breakpoints mirror the original max-width media queries.
        md: '761px',
        lg: '1025px',
      },
      keyframes: {
        drift: { to: { transform: 'translate3d(-4%, 3%, 0) rotate(3deg)' } },
        grain: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-5%, 3%)' },
          '50%': { transform: 'translate(4%, -6%)' },
          '75%': { transform: 'translate(-3%, 5%)' },
          '100%': { transform: 'translate(2%, -2%)' },
        },
        pulse: {
          '70%': { boxShadow: '0 0 0 10px rgba(34,211,238,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
        },
        cue: {
          '50%': { transform: 'none' },
          '100%': { transform: 'translateY(100%)' },
        },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        drift: 'drift 24s cubic-bezier(.76, 0, .24, 1) infinite alternate',
        grain: 'grain 1s steps(8) infinite',
        pulse: 'pulse 2s infinite',
        cue: 'cue 2.2s cubic-bezier(.76, 0, .24, 1) infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
