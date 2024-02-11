import type React from 'react';
import {
  cloneElement,
  memo,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import { FlipContext } from '../HappyFlipper';

export interface FlippedProps {
  children: React.ReactElement;
}

function HappyFlipped({ children }: FlippedProps) {
  const ctxRef = useContext(FlipContext);
  const ref = useRef<HTMLElement>(null);

  const childrenRef = (
    children as unknown as { ref: React.RefObject<HTMLElement | null> | undefined }
  )?.ref;

  useImperativeHandle(childrenRef, () => ref.current);

  useLayoutEffect(() => {
    const ctx = ctxRef.current;
    const node = ref.current;

    const flipId = ctx.nextId();

    if (node) {
      ctx.add({ flipId, node });
    }

    return () => {
      ctx.remove(flipId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cloneElement(children, { ref });
}

export default memo(HappyFlipped);
