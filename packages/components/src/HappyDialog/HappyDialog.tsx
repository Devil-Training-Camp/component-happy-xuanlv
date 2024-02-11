import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { HappyDialogProps } from './types';
import useDestroyOnHidden from '../hooks/useDestroyOnHidden';
import useAnimationVisible from '../hooks/useAnimationVisible';
import useAnimationOrigin from './useAnimationOrigin';
import { MountHandler } from './MountHandler';
import { getEnterFn, getLeaveFn } from './utils';
import styles from './HappyDialog.module.less';

/**
 * 基础弹窗
 */
function HappyDialog({
  afterOpen,
  afterClose,
  centered,
  children,
  className,
  destroyOnClose = true,
  getContainer = () => document.body,
  mask = true,
  maskClosable = true,
  keyboard = true,
  maskStyle,
  onCancel,
  style,
  visible,
  width = 416,
  wrapClassName,
  zIndex,
  animationEnter,
  animationLeave,
  rootAttrs,
}: HappyDialogProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const container = getContainer();

  // 打开前动画生成
  const getTransform = useAnimationOrigin(modalRef, visible);
  // 动画处理：弹窗关闭触发关闭动画
  const realVisible = useAnimationVisible(
    modalRef,
    visible,
    animationEnter || getEnterFn(getTransform),
    animationLeave || getLeaveFn(getTransform),
    afterOpen,
    afterClose,
  );
  // 进行中的动画
  const action = visible ? 'enter' : realVisible ? 'leave' : undefined;

  // 关闭时销毁 Modal 里的子元素
  const shouldMount = useDestroyOnHidden(destroyOnClose, realVisible);

  const modalElement = shouldMount ? (
    <div
      className={styles.happyModalRoot}
      style={{ zIndex, display: realVisible ? undefined : 'none' }}
      tabIndex={-1}
      // Escape 键取消
      onKeyDown={(evt) => keyboard && evt.key === 'Escape' && onCancel?.()}
      ref={rootRef}
      {...rootAttrs}
    >
      {realVisible && <MountHandler rootRef={rootRef} container={container} />}
      {mask && (
        <div
          className={clsx(styles.happyModalMask, {
            [styles.fadeIn]: action === 'enter',
            [styles.fadeOut]: action === 'leave',
          })}
          style={maskStyle}
        />
      )}
      <div
        className={clsx(styles.happyModalWrap, wrapClassName, {
          [styles.centered]: centered,
        })}
        onClick={maskClosable ? onCancel : undefined}
      >
        <div
          className={clsx(styles.happyModal, className)}
          ref={modalRef}
          role="dialog"
          style={{ width, ...style }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;

  return modalElement && typeof window !== 'undefined' && container
    ? createPortal(modalElement, container)
    : null;
}

export default HappyDialog;
