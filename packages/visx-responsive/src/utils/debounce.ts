export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

interface DebounceOptions {
  leading?: boolean;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last invocation.
 *
 * When `leading` is true, the function fires immediately on the first call (leading edge),
 * and also fires on the trailing edge if there were subsequent calls during the wait period
 * (matching lodash behavior with leading:true, trailing:true).
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const { leading = false } = options;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  // Track args for the trailing call; null means no subsequent calls after leading
  let pendingArgs: Parameters<T> | null = null;
  let pendingContext: unknown;

  function debounced(this: unknown, ...args: Parameters<T>) {
    if (leading && timeoutId === undefined) {
      // Fire immediately on the leading edge, no pending trailing needed yet
      func.apply(this, args);
      pendingArgs = null;
    } else {
      // Record these args for the trailing call
      pendingArgs = args;
      pendingContext = this;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      if (pendingArgs !== null) {
        func.apply(pendingContext, pendingArgs);
        pendingArgs = null;
        pendingContext = undefined;
      }
    }, wait);
  }

  debounced.cancel = function cancel() {
    clearTimeout(timeoutId);
    timeoutId = undefined;
    pendingArgs = null;
    pendingContext = undefined;
  };

  return debounced as DebouncedFunction<T>;
}
