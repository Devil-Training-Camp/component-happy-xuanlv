import { useEffect } from 'react';
import { useLatest } from './useLatest';

/**
 * 定时器 setInterval hook
 */
export const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useLatest(callback);

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [savedCallback, delay]);
};
