/**
 * Walk up the DOM tree to detect if any ancestor provides a bounded height constraint.
 * An element is "bounded" when its computed `height` or `max-height` is explicitly set
 * (not `auto` / `none`). This distinguishes a flex parent with `h-screen` from one that
 * simply grows to wrap its content.
 */
export default function hasBoundedHeight(el: HTMLElement | null): boolean {
  let current = el;

  while (current && current !== document.body) {
    const style = getComputedStyle(current);
    const height = style.height;

    // A resolved pixel/% height that isn't 'auto' means the ancestor constrains its children
    if (height !== 'auto' && height !== '' && parseFloat(height) > 0) {
      return true;
    }

    // max-height also constrains children even when height is auto
    const maxH = style.maxHeight;
    if (maxH && maxH !== 'none' && parseFloat(maxH) > 0) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}
