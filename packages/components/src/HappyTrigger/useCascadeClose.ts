import { useRef } from 'react';
import { useFunction } from '@xuan/hooks';

/**
 * 多个 Trigger 级联事件关闭回调
 */
export default function useCascadeClose(handleClose: () => void) {
  const shouldCloseRef = useRef(true);

  const onClose = useFunction(() => {
    if (shouldCloseRef.current) {
      handleClose();
    }
    shouldCloseRef.current = true;
  });

  return {
    onClose,
    onMouseDown() {
      shouldCloseRef.current = false;
    },
  };
}
