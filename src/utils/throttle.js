/**
 * Returns a throttled version of fn that fires at most once per requestAnimationFrame.
 * Used for scroll and resize handlers.
 */
export function rafThrottle(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

/**
 * Returns a throttled version of fn that fires at most once per `wait` ms.
 * Used for resize handlers and other non-scroll cases.
 */
export function throttle(fn, wait = 150) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
