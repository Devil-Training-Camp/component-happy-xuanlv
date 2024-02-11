import { useRef, useMemo, useReducer } from 'react';
import { useFunction, useIsoLayoutEffect } from '@xuan/hooks';

/**
 * 派生显示状态
 */
export default function useDerivedVisible(
  visible: boolean | undefined,
  updater: (realVisible: boolean | undefined) => void,
) {
  const realRef = useRef(visible);
  const [, handleRender] = useReducer((c) => !c, false);

  // 在动画结束后调用
  const hide = useFunction(() => {
    realRef.current = false;
    handleRender();
  });

  useMemo(() => {
    // 切换为显示状态，立即同步
    if (visible) {
      realRef.current = true;
    }
  }, [visible]);

  useIsoLayoutEffect(() => {
    updater(realRef.current);
  }, [visible]);

  return [realRef.current, hide] as const;
}
