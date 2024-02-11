import { useEffect } from 'react';
import { useInitial } from './useInitial';
import { useLatest } from './useLatest';

type Subscription<T> = (val: T) => void;

export function useEventEmitter<T = void>() {
  return useInitial(() => {
    const subscriptions = new Set<Subscription<T>>();

    return {
      emit(val: T) {
        subscriptions.forEach((subscription) => subscription(val));
      },
      useSubscription(callback: Subscription<T>) {
        const callbackRef = useLatest(callback);

        useEffect(() => {
          function subscription(val: T) {
            callbackRef.current?.(val);
          }
          subscriptions.add(subscription);
          return () => {
            subscriptions.delete(subscription);
          };
        }, []);
      },
    };
  });
}
