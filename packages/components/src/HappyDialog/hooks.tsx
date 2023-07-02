import React from 'react';

/**
 * 触发源位置
 */
export interface OriginRect {
  x: number;
  y: number;
}

let originRect: OriginRect | undefined;

// 只有点击事件支持从鼠标位置动画展开
if (typeof window !== 'undefined') {
  document.documentElement.addEventListener(
    'click',
    (e) => {
      originRect = {
        x: e.pageX,
        y: e.pageY,
      };
      // 指定时间内发生过点击事件，则从点击位置动画展示
      setTimeout(() => {
        originRect = undefined;
      }, 100);
    },
    true,
  );
}

/**
 * 弹窗的 origin 处理
 */
export function useModalAnimationOrigin(visible: boolean | undefined, container: HTMLElement) {
  const [transformOrigin, setTransformOrigin] = React.useState<string>();
  const currentOrigin = React.useRef<OriginRect | undefined>();

  React.useMemo(() => {
    // 可见变量改变，临时保存 origin 位置
    if (visible) {
      currentOrigin.current = originRect;
    }
  }, [visible]);

  // 计算 origin
  function onModalElementRef(modalDOMNode: HTMLDivElement | null) {
    if (!(currentOrigin.current && modalDOMNode)) {
      setTransformOrigin(undefined);
      return;
    }
    const { x, y } = currentOrigin.current;
    // 获取滚动位置
    const { scrollTop, scrollLeft } =
      container === document.body ? document.documentElement : container;

    const { offsetTop, offsetLeft } = modalDOMNode;

    // 根据绝对位置计算相对位置
    const xOrigin = x - offsetLeft - scrollLeft;
    const yOrigin = y - offsetTop - scrollTop;
    setTransformOrigin(`${xOrigin}px ${yOrigin}px`);
  }

  return {
    transformOrigin,
    onModalElementRef,
  };
}
