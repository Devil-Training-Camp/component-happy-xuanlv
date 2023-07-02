import { useRef } from 'react';

/**
 * 返回当前最新值的 Hook，可以避免闭包问题
 */
export function useLatest<T>(something: T) {
  const ref = useRef(something);
  ref.current = something;
  return ref;
}
