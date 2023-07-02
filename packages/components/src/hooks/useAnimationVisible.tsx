import { useLayoutEffect, useState } from 'react';

/**
 * 动画关闭处理真实关闭状态
 * 通过 onAnimationEnd 回调实现 leaveCallback
 */
export default function useAnimationVisible(
  visible: boolean | undefined,
  afterOpen?: () => void,
  afterClose?: () => void,
) {
  // 真实状态
  const [realVisible, setRealVisible] = useState(visible);
  // 正在进行的动画
  const [activeAnimation, setActiveAnimation] = useState<'enter' | 'leave'>();

  useLayoutEffect(() => {
    if (visible) {
      setRealVisible(true);
      setActiveAnimation('enter');
      return;
    }
    setActiveAnimation('leave');
  }, [visible]);

  function onAnimationEnd() {
    // 重置状态
    setActiveAnimation(undefined);
    // 动画结束后触发渲染
    if (visible) {
      afterOpen?.();
      return;
    }
    setRealVisible(false);
    afterClose?.();
  }

  return {
    realVisible,
    activeAnimation,
    onAnimationEnd,
  };
}
