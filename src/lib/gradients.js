/**
 * Paint one continuous gradient across split glyphs instead of one gradient
 * per glyph, by handing every span the parent box width and its own offset.
 */
export function fixGradients(scope = document) {
  const boxes = scope.querySelectorAll('.grad.is-split, .grad .is-split, .is-split .grad, .grad-words em');
  boxes.forEach((box) => {
    const bx = box.getBoundingClientRect();
    box.querySelectorAll('.char, .word').forEach((el) => {
      if (el.classList.contains('word') && el.querySelector('.char')) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--gw', `${bx.width}px`);
      el.style.setProperty('--gx', `${-(r.left - bx.left)}px`);
    });
  });
}
