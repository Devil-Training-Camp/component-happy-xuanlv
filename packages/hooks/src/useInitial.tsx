import { useRef } from 'react';

/**
 * 组件首次渲染触发回调
 */
export function useInitial<T>(callback: () => T) {
  const { current } = useRef({ initial: false, result: undefined as unknown as T });
  if (!current.initial) {
    current.initial = true;
    current.result = callback();
  }
  return current.result;
}
