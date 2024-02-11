import { DEFAULT_KEYFRAMES } from '../utils';

export function getEnterFn(getTransform: () => string | undefined) {
  return (element: HTMLElement) => {
    return element.animate?.(
      [
        { transform: getTransform(), opacity: 0 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ],
      DEFAULT_KEYFRAMES,
    );
  };
}

export function getLeaveFn(getTransform: () => string | undefined) {
  return (element: HTMLElement) => {
    return element.animate?.(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: getTransform(), opacity: 0 },
      ],
      DEFAULT_KEYFRAMES,
    );
  };
}
