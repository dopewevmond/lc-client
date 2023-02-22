export const debounce = (fn: Function, wait: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<any>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};
