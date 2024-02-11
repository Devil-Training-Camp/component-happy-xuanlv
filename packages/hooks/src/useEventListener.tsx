import { useEffect } from 'react';
import { useLatest } from './useLatest';

export interface UseEventListenerOptions extends AddEventListenerOptions {
  getContainer?: () => HTMLElement | null;
}

/**
 * 在 window 上事件绑定处理
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  type: K | undefined,
  fn: (evt: HTMLElementEventMap[K]) => void,
  { getContainer, ...options }: UseEventListenerOptions = {},
) {
  const latest = useLatest(fn);

  useEffect(() => {
    if (!type) {
      return undefined;
    }
    const container = getContainer ? getContainer() : (window as unknown as HTMLElement);
    if (!container) {
      return undefined;
    }
    function wrapper(evt: HTMLElementEventMap[K]) {
      latest.current(evt);
    }
    container.addEventListener(type, wrapper, options);
    return () => {
      container.removeEventListener(type, wrapper);
    };
  }, [type]);
}
