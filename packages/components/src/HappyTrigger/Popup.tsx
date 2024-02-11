import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAreaClick, useDebounceCallback } from '@xuan/hooks';
import clsx from 'clsx';
import type { Placement } from '../types';
import { getMatchPositionPlacement } from './utils';
import type { PopupProps } from './types';
import useCascadeClose from './useCascadeClose';
import styles from './Popup.module.less';

/**
 * 浮层
 */
function Popup({
  trigger,
  popupRef,
  popup,
  placement,
  visible,
  onClose: handleClose,
  onCloseDelay,
  positionRef,
  getPopupContainer,
  getPopupStyle,
  triggerRef,
  zIndex,
  className,
}: PopupProps) {
  // 位置信息
  const [position, updatePosition] = useState<{
    placement: Placement;
    style?: React.CSSProperties;
  }>(() => ({ placement, style: { top: 0, left: 0, opacity: 0 } }));

  // 触发的容器
  const triggerContainer =
    getPopupContainer && triggerRef.current ? getPopupContainer(triggerRef.current) : document.body;

  // 更新位置信息
  const updateLayer = useDebounceCallback(
    () => {
      // 无节点信息则不计算
      if (!(triggerRef.current && popupRef.current)) {
        return;
      }
      // 目标触发位置
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = popupRef.current;

      // 目标节点处于隐藏状态
      const isHidden = triggerRect.width === 0 && triggerRect.height === 0;

      const [matchPosition, computedPlacement] = getMatchPositionPlacement(
        placement,
        positionRef.current || triggerRect,
        { width: offsetWidth, height: offsetHeight },
        triggerContainer,
      );

      updatePosition({
        // 获取位置信息
        placement: computedPlacement,
        style: {
          top: Math.max(0, matchPosition.top),
          left: Math.max(0, matchPosition.left),
          display: isHidden ? 'none' : undefined,
          // 弹窗显示之后恢复不透明，避免闪烁
          opacity: Number(offsetWidth > 0),
        },
      });
    },
    { maxWait: 12 },
  );

  const { onClose, onMouseDown } = useCascadeClose(handleClose);
  // 全局 mouse 事件监听关闭
  useAreaClick(() => [trigger === 'contextMenu' ? undefined : triggerRef.current], onClose);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(updateLayer);
    const mutationObserver = new MutationObserver(updateLayer);

    if (triggerRef.current && popupRef.current) {
      resizeObserver.observe(triggerContainer);
      resizeObserver.observe(triggerRef.current);
      resizeObserver.observe(popupRef.current);
      mutationObserver.observe(triggerRef.current, { attributes: true });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [triggerContainer]);

  const popupNode = popup({ placement: position.placement, onClose, popupRef, triggerRef });
  if (popupNode === null) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(styles.happyPopup, className, { [styles.visible]: visible })}
      style={{ zIndex, ...position.style, ...getPopupStyle?.(position.placement) }}
      ref={popupRef}
      role="tooltip"
      onMouseEnter={onCloseDelay?.cancel}
      onMouseLeave={onCloseDelay}
      onMouseDown={onMouseDown}
    >
      {popupNode}
    </div>,
    triggerContainer,
  );
}

export default Popup;
