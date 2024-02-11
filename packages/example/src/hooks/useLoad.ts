import React, { useEffect, useRef } from 'react';
import { useFunction } from '@xuan/hooks';

/**
 * 处理异步加载的状态
 */
export default function useLoad<F extends (...args: unknown[]) => Promise<R>, R>(
  fn: F,
): [loading: boolean | undefined, result: R | undefined, reload: F] {
  const [loading, updateLoading] = React.useState<boolean>();
  const resultRef = useRef<R>();

  const load = useFunction(async (...args: unknown[]) => {
    updateLoading(true);
    try {
      resultRef.current = await fn(...args);
    } finally {
      updateLoading(false);
    }
    return resultRef.current;
  });

  useEffect(() => {
    load();
  }, []);

  return [loading, resultRef.current, load as F];
}
