import type React from 'react';
import { useRef } from 'react';
import useDerivedVisible from './useDerivedVisible';

/**
 * 动画关闭处理真实关闭状态
 */
export default function useAnimationVisible(
  ref: React.RefObject<HTMLElement>,
  visible: boolean | undefined,
  animationEnter?: (element: HTMLElement) => Animation,
  animationLeave?: (element: HTMLElement) => Animation,
  afterOpen?: () => void,
  afterClose?: () => void,
) {
  const lastAnimation = useRef<Animation>();

  const [realVisible, hide] = useDerivedVisible(visible, (real) => {
    const element = ref.current;
    if (!element) {
      return;
    }
    if (!real) {
      return;
    }

    lastAnimation.current?.cancel();
    if (visible) {
      // 进入动画
      const animation = animationEnter?.(element);
      if (!animation) {
        afterOpen?.();
        return;
      }
      animation.onfinish = afterOpen || null;
      lastAnimation.current = animation;
      return;
    }

    // 离开动画
    function handleFinish() {
      hide();
      afterClose?.();
    }
    const animation = animationLeave?.(element);
    if (!animation) {
      handleFinish();
      return;
    }
    animation.onfinish = handleFinish;
    lastAnimation.current = animation;
  });

  return realVisible;
}
