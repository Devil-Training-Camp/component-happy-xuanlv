import React from 'react';
import IconClose from '../icons/icon-close.svg?react';
import type { HappyButtonProps } from '../HappyButton';
import { HappyButton } from '../HappyButton';
import styles from './ModalWidget.module.less';

export interface CloseButtonProps {
  onClick?: React.EventHandler<React.MouseEvent>;
}

/**
 * 关闭按钮
 */
export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <span className={styles.closeButton} onClick={onClick}>
      <IconClose className={styles.closeIcon} />
    </span>
  );
}

export interface FooterOkButtonProps {
  confirmLoading?: boolean;
  okText?: React.ReactNode;
  onOk?: React.EventHandler<React.MouseEvent>;
  okButtonProps?: HappyButtonProps;
}

/**
 * 弹窗底部确认按钮
 */
export function FooterOkButton({
  confirmLoading,
  okText,
  onOk,
  okButtonProps,
}: FooterOkButtonProps) {
  return (
    <HappyButton
      className={styles.footerButton}
      type="primary"
      onClick={onOk}
      loading={confirmLoading}
      {...okButtonProps}
    >
      {okText ?? '确定'}
    </HappyButton>
  );
}

export interface FooterCancelButtonProps {
  cancelText?: React.ReactNode;
  onCancel?: React.EventHandler<React.MouseEvent>;
}

/**
 * 弹窗底部取消按钮
 */
export function FooterCancelButton({ cancelText, onCancel }: FooterCancelButtonProps) {
  return (
    <HappyButton className={styles.footerButton} onClick={onCancel}>
      {cancelText ?? '取消'}
    </HappyButton>
  );
}
