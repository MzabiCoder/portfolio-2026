import { useCallback, useEffect, useRef, useState } from 'react';
import SkipLink from './components/layout/SkipLink.jsx';
import Preloader from './components/layout/Preloader.jsx';
import Grain from './components/layout/Grain.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import Cursor from './components/layout/Cursor.jsx';
import Navbar from './components/layout/Navbar.jsx';
import MobileMenu from './components/layout/MobileMenu.jsx';
import Footer from './components/layout/Footer.jsx';

import HeroSection from './components/sections/hero/HeroSection.jsx';
import StatsSection from './components/sections/stats/StatsSection.jsx';
import MissionSection from './components/sections/mission/MissionSection.jsx';
import PillarsSection from './components/sections/pillars/PillarsSection.jsx';
import CraftFilmSection from './components/sections/craft/CraftFilmSection.jsx';
import StorySection from './components/sections/story/StorySection.jsx';
import ServicesSection from './components/sections/services/ServicesSection.jsx';
import WorkSection from './components/sections/work/WorkSection.jsx';
import CtaSection from './components/sections/cta/CtaSection.jsx';

import useIntroTimeline, { useIntroInitialState } from './animations/useIntroTimeline.js';
import useReveals from './animations/useReveals.js';
import useCounters from './animations/useCounters.js';
import useFilmTicker from './animations/useFilmTicker.js';
import useNavChrome from './hooks/useNavChrome.js';
import useEscapeKey from './hooks/useEscapeKey.js';
import { useScroll } from './context/ScrollProvider.jsx';
import { prefersReducedMotion } from './lib/motion.js';

/** The page: chrome, sections and the animation wiring that binds them. */
export default function Site() {
  const reduced = prefersReducedMotion();
  const finePointer = typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches;

  const [menuOpen, setMenuOpen] = useState(false);
  const [counted, setCounted] = useState(reduced);
  const [introDone, setIntroDone] = useState(reduced);
  const preloaderRef = useRef(null);
  const { start, stop } = useScroll();

  const { solid, hidden, barRef } = useNavChrome(menuOpen);

  useFilmTicker();
  useIntroInitialState(!reduced);
  useIntroTimeline({
    counted: counted && !reduced,
    preloaderRef,
    onComplete: useCallback(() => { setIntroDone(true); start(); }, [start]),
  });
  useReveals(introDone && !reduced);
  useCounters(introDone && !reduced);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEscapeKey(closeMenu);

  useEffect(() => { (menuOpen ? stop : start)(); }, [menuOpen, start, stop]);

  return (
    <>
      <SkipLink />
      {!introDone && <Preloader ref={preloaderRef} onCounted={() => setCounted(true)} />}
      <Grain />
      <ScrollProgress ref={barRef} />
      {finePointer && !reduced && <Cursor />}

      <Navbar
        solid={solid}
        hidden={hidden}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={closeMenu}
      />
      <MobileMenu open={menuOpen} onNavigate={closeMenu} />

      <main id="main">
        <HeroSection />
        <StatsSection />
        <MissionSection />
        <PillarsSection />
        <CraftFilmSection />
        <StorySection />
        <ServicesSection showPreview={finePointer && !reduced} />
        <WorkSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
