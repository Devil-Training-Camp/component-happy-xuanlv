import React, { cloneElement, isValidElement, useImperativeHandle, useRef } from 'react';
import { useDebounceCallback, useFunction } from '@xuan/hooks';
import useControllableValue from '../hooks/useControllableValue';
import useAnimationVisible from '../hooks/useAnimationVisible';
import useDestroyOnHidden from '../hooks/useDestroyOnHidden';
import type { HappyTriggerProps } from './types';
import Popup from './Popup';

/**
 * 触发器
 */
function HappyTrigger(props: HappyTriggerProps, ref: React.ForwardedRef<HTMLElement>) {
  const {
    children,
    trigger = 'hover',
    popup,
    placement = trigger === 'contextMenu' ? 'bottomLeft' : 'top',
    visible: controlledVisible,
    onVisibleChange: onControlledVisibleChange,
    defaultVisible,
    getPopupContainer,
    getPopupStyle,
    zIndex = 1030,
    className,
    destroyPopupOnHide = true,
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0,
    animationEnter,
    animationLeave,
  } = props;

  const innerTriggerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerTriggerRef.current as HTMLElement);

  // contextMenu 触发位置
  const positionRef = useRef<DOMRect>();

  const [visible, onVisibleChange] = useControllableValue({
    controlled: props.hasOwnProperty('visible'),
    defaultValue: defaultVisible,
    value: controlledVisible,
    onChange: onControlledVisibleChange,
  });

  // 动画处理
  const realVisible = useAnimationVisible(popupRef, visible, animationEnter, animationLeave);
  // 是否装载
  const shouldMount = useDestroyOnHidden(destroyPopupOnHide, realVisible);

  const onClose = useFunction(() => {
    positionRef.current = undefined;
    onVisibleChange(false);
  });

  // 延迟显示时间
  const debouncedShow = useDebounceCallback(() => onVisibleChange(true), {
    wait: mouseEnterDelay * 1000,
  });
  // 延迟关闭时间
  const debouncedClose = useDebounceCallback(onClose, { wait: mouseLeaveDelay * 1000 });

  // 父/子组件事件触发
  function triggerRestEvent(eventName: string, ...args: unknown[]) {
    if (isValidElement(children)) {
      ((children as React.ReactElement<HTMLElement>).props as Record<string, any>)[eventName]?.(
        ...args,
      );
    }
    (props as Record<string, any>)[eventName]?.(...args);
  }
  function handleShow(e: React.MouseEvent<HTMLElement>) {
    // 某些子组件并未转发 ref
    (innerTriggerRef as React.MutableRefObject<HTMLElement>).current =
      e.currentTarget as HTMLElement;
    debouncedClose.cancel();
    debouncedShow();
  }

  // 鼠标进入
  const onMouseEnter = useFunction((e: React.MouseEvent<HTMLElement>, ...args: unknown[]) => {
    if (trigger === 'hover') {
      handleShow(e);
    }
    triggerRestEvent('onMouseEnter', e, ...args);
  });
  // 鼠标离开
  const onMouseLeave = useFunction((...args: unknown[]) => {
    if (trigger === 'hover') {
      debouncedShow.cancel();
      debouncedClose();
    }
    triggerRestEvent('onMouseLeave', ...args);
  });
  // 点击触发
  const onClick = useFunction((e: React.MouseEvent<HTMLElement>, ...args: unknown[]) => {
    if (trigger === 'click') {
      handleShow(e);
    }
    triggerRestEvent('onClick', e, ...args);
  });
  // 右键菜单
  const onContextMenu = useFunction((e: React.MouseEvent<HTMLElement>, ...args: unknown[]) => {
    if (trigger === 'contextMenu') {
      e.preventDefault();
      const { clientX, clientY } = e;
      positionRef.current = {
        top: clientY,
        right: clientX,
        bottom: clientY,
        left: clientX,
        width: 0,
        height: 0,
      } as DOMRect;
      handleShow(e);
    }
    triggerRestEvent('onContextMenu', e, ...args);
  });

  const childProps = {
    onMouseEnter,
    onMouseLeave,
    onClick,
    onContextMenu,
    ref: innerTriggerRef as React.MutableRefObject<null>,
  };

  return (
    <>
      {typeof children === 'function' ? children(childProps) : cloneElement(children, childProps)}
      {shouldMount && (
        <Popup
          trigger={trigger}
          popupRef={popupRef}
          popup={popup}
          placement={placement}
          visible={realVisible}
          onClose={onClose}
          onCloseDelay={trigger === 'hover' ? debouncedClose : undefined}
          positionRef={positionRef}
          getPopupContainer={getPopupContainer}
          getPopupStyle={getPopupStyle}
          triggerRef={innerTriggerRef}
          zIndex={zIndex}
          className={className}
        />
      )}
    </>
  );
}

export default React.forwardRef(HappyTrigger);
