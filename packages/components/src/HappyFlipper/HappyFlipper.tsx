import React, { useLayoutEffect, useMemo, useRef } from 'react';
import type { FlipItemType, IFlipContext } from './FlipContext';
import { FlipContext } from './FlipContext';
import type { HappyFlipperProps } from './types';

export default function HappyFlipper({ flipKey, keyframes, children }: HappyFlipperProps) {
  const lastRectRef = useRef<Map<number, FlipItemType>>(new Map());
  const uniqueIdRef = useRef(0);

  const fnRef = useRef<IFlipContext>({
    add(flipItem) {
      lastRectRef.current.set(flipItem.flipId, flipItem);
    },
    remove(flipId) {
      lastRectRef.current.delete(flipId);
    },
    nextId() {
      uniqueIdRef.current += 1;
      return uniqueIdRef.current;
    },
  });

  useMemo(() => {
    lastRectRef.current.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.rect = item.node.getBoundingClientRect();
    });
  }, [flipKey]);

  useLayoutEffect(() => {
    const { innerWidth, innerHeight } = window;

    const currentRectMap = new Map<number, DOMRect>();
    lastRectRef.current.forEach((item) => {
      currentRectMap.set(item.flipId, item.node.getBoundingClientRect());
    });

    lastRectRef.current.forEach(({ flipId, node, rect }) => {
      const currentRect = currentRectMap.get(flipId);

      if (!(currentRect && rect)) {
        return;
      }

      const invert = {
        left: rect.left - currentRect.left,
        top: rect.top - currentRect.top,
      };

      const isLastRectOverflow =
        rect.right < 0 || rect.left > innerWidth || rect.bottom < 0 || rect.top > innerHeight;

      const isCurrentRectOverflow =
        currentRect.right < 0 ||
        currentRect.left > innerWidth ||
        currentRect.bottom < 0 ||
        currentRect.top > innerHeight;

      if (isLastRectOverflow && isCurrentRectOverflow) {
        return;
      }

      if (invert.top === 0 && invert.left === 0) {
        return;
      }

      node.animate(
        [
          {
            transform: `translate(${invert.left}px, ${invert.top}px)`,
          },
          { transform: 'translate(0, 0)' },
        ],
        {
          duration: 400,
          easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
          ...keyframes,
        },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipKey]);

  return <FlipContext.Provider value={fnRef}>{children}</FlipContext.Provider>;
}
