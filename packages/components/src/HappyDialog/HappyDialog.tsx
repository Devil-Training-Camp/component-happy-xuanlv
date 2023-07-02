import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { HappyDialogProps } from './types';
import useDestroyOnHidden from '../hooks/useDestroyOnHidden';
import useAnimationVisible from '../hooks/useAnimationVisible';
import { useModalAnimationOrigin } from './hooks';
import { MountHandler } from './MountHandler';
import styles from './HappyDialog.module.less';

/**
 * 基础弹窗
 */
export default function HappyDialog({
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
  animation,
}: HappyDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // 动画处理：弹窗关闭触发关闭动画
  const { realVisible, activeAnimation, onAnimationEnd } = useAnimationVisible(
    visible,
    afterOpen,
    afterClose,
  );
  const container = getContainer();

  // 关闭时销毁 Modal 里的子元素
  const shouldMount = useDestroyOnHidden(destroyOnClose, realVisible);
  // 动画指向
  const { transformOrigin, onModalElementRef } = useModalAnimationOrigin(visible, container);

  const modalElement = shouldMount ? (
    <div
      className={styles.happyModalRoot}
      style={{ zIndex, display: realVisible ? undefined : 'none' }}
      tabIndex={-1}
      // Escape 键取消
      onKeyDown={(evt) => keyboard && evt.key === 'Escape' && onCancel?.()}
      ref={modalRef}
    >
      {realVisible && <MountHandler modalRef={modalRef} getContainer={getContainer} />}
      {mask && (
        <div
          className={clsx(styles.happyModalMask, {
            [styles.fadeIn]: activeAnimation === 'enter',
            [styles.fadeOut]: activeAnimation === 'leave',
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
          className={clsx(styles.happyModal, className, {
            [animation?.in ?? styles.animateIn]: activeAnimation === 'enter',
            [animation?.out ?? styles.animateOut]: activeAnimation === 'leave',
          })}
          onAnimationEnd={onAnimationEnd}
          ref={onModalElementRef}
          role="dialog"
          style={{
            transformOrigin,
            width,
            ...style,
          }}
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
