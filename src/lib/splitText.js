/**
 * Split an element into word/char spans while keeping nested markup intact.
 * The visible text is aria-hidden so screen readers keep reading the label.
 */
export function splitText(el, mode) {
  if (!el || el.classList.contains('is-split')) {
    return [...el.querySelectorAll(mode === 'chars' ? '.char' : '.word')];
  }

  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          w.className = mode === 'chars' ? 'word word--c' : 'word';
          w.setAttribute('aria-hidden', 'true');
          if (mode === 'chars') {
            [...part].forEach((ch) => {
              const c = document.createElement('span');
              c.className = 'char';
              c.textContent = ch;
              w.appendChild(c);
            });
          } else {
            w.textContent = part;
          }
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        walk(n);
      }
    });
  };

  walk(el);
  el.classList.add('is-split');
  return [...el.querySelectorAll(mode === 'chars' ? '.char' : '.word')];
}

/** Wrap each word in an overflow-hidden mask so it can slide up into view. */
export function maskWords(words) {
  words.forEach((w) => {
    const m = document.createElement('span');
    m.className = 'wmask';
    w.replaceWith(m);
    m.appendChild(w);
  });
  return words;
}
