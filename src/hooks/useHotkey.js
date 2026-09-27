import { useEffect } from 'react';

/**
 * Fires `handler` when the given key combo is pressed.
 *
 * @param {string}   key        e.g. 'k'
 * @param {Function} handler    callback(event)
 * @param {object}   [options]
 * @param {boolean}  [options.ctrlOrMeta=true]  require Ctrl (Win/Linux) or Meta (Mac)
 * @param {boolean}  [options.ignoreInInputs=true]  skip when focus is inside an input/textarea/select
 *                                                    UNLESS the palette itself is open
 * @param {boolean}  [options.paletteOpen=false]     pass true to allow firing inside inputs
 *
 * Usage:
 *   useHotkey('k', () => setOpen(true), { ctrlOrMeta: true });
 *   useHotkey('Escape', () => setOpen(false));
 */
export default function useHotkey(key, handler, options = {}) {
  const { ctrlOrMeta = false, ignoreInInputs = true, paletteOpen = false } = options;

  useEffect(() => {
    const onKeyDown = (e) => {
      // Check modifier
      if (ctrlOrMeta && !(e.ctrlKey || e.metaKey)) return;

      // Check key (case-insensitive for single chars)
      if (e.key.toLowerCase() !== key.toLowerCase()) return;

      // Skip when typing inside inputs unless the palette is already open
      if (ignoreInInputs && !paletteOpen) {
        const tag = document.activeElement?.tagName;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
        if (document.activeElement?.isContentEditable) return;
      }

      handler(e);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler, ctrlOrMeta, ignoreInInputs, paletteOpen]);
}
