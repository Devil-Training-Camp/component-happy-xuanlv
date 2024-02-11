import { useCallback, useRef } from 'react';
import { useLatest } from './useLatest';

export interface DebounceCallback<CallbackArguments extends any[]> {
  (...args: CallbackArguments): void;
  cancel: () => void;
  flush: () => void;
}

export interface DebounceCallbackOptions {
  leading?: boolean;
  /**
   * @defaultValue true
   */
  trailing?: boolean;
  maxWait?: number;
  wait?: number;
}
export function useDebounceCallback<CallbackArguments extends any[]>(
  callback: (...args: CallbackArguments) => void,
  { leading = false, trailing = true, maxWait, wait = maxWait || 0 }: DebounceCallbackOptions,
): DebounceCallback<CallbackArguments> {
  const callbackRef = useLatest(callback);

  const prev = useRef(0);
  const trailingTimeout = useRef<ReturnType<typeof setTimeout>>();
  const clearTrailing = () => trailingTimeout.current && clearTimeout(trailingTimeout.current);

  const fn = useCallback(
    (...args: CallbackArguments) => {
      const now = Date.now();

      function call() {
        prev.current = now;
        clearTrailing();
        callbackRef.current.apply(null, args);
      }
      (fn as DebounceCallback<CallbackArguments>).flush = call;

      const last = prev.current;
      const offset = now - last;
      // leading
      if (last === 0) {
        if (leading) {
          call();
        }
        prev.current = now;
      }

      // body
      if (maxWait !== undefined) {
        if (offset > maxWait) {
          call();
          return;
        }
      } else if (offset < wait) {
        prev.current = now;
      }

      // trailing
      clearTrailing();
      trailingTimeout.current = setTimeout(() => {
        if (trailing) {
          call();
        }
        prev.current = 0;
      }, wait);
    },
    [wait, maxWait, leading],
  ) as DebounceCallback<CallbackArguments>;
  fn.cancel = clearTrailing;
  fn.flush ||= clearTrailing;

  return fn;
}
