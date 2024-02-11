import type { DependencyList, RefObject } from 'react';
import { useFunction } from './useFunction';
import { useIsoLayoutEffect } from './useIsoLayoutEffect';

export function useResizeEffect<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (rect: DOMRectReadOnly) => void,
  deps: DependencyList,
) {
  const callbackFn = useFunction(callback);

  useIsoLayoutEffect(() => {
    if (!ref.current) {
      return () => undefined;
    }
    const observer = new ResizeObserver(([{ contentRect }]) => callbackFn(contentRect));
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, deps);
}
