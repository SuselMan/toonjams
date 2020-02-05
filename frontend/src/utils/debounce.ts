
/**
 * Delay function execute in provided ms
 * @param fn JS Function
 * @param delay delay to execute function
 */
export function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}