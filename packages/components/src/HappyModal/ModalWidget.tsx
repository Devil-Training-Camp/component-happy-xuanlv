import React from 'react';
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
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        className={styles.closeIcon}
      >
        <path d="M17.62 16l8.2-9.78c0.036-0.043 0.059-0.099 0.059-0.16 0-0.136-0.11-0.247-0.246-0.248h-2.494c-0.154 0.002-0.291 0.071-0.383 0.179l-0.001 0.001-6.766 8.062-6.768-8.064c-0.092-0.109-0.229-0.178-0.383-0.178-0.001 0-0.001 0-0.002 0h-2.492c-0.001 0-0.001 0-0.002 0-0.137 0-0.248 0.111-0.248 0.248 0 0.062 0.023 0.119 0.061 0.162l-0-0 8.202 9.778-8.202 9.78c-0.036 0.043-0.059 0.099-0.059 0.16 0 0.137 0.111 0.248 0.248 0.248 0 0 0 0 0.001 0h2.494c0.154-0.002 0.291-0.071 0.383-0.179l0.001-0.001 6.766-8.064 6.766 8.066c0.092 0.109 0.229 0.178 0.383 0.178 0.001 0 0.001 0 0.002 0h2.494c0.001 0 0.001 0 0.002 0 0.137 0 0.248-0.111 0.248-0.248 0-0.062-0.023-0.119-0.061-0.162l0 0-8.204-9.778z" />
      </svg>
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

export function IconInfoCircle(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14v0c-7.732 0-14-6.268-14-14s6.268-14 14-14v0zM16 4.376c-6.327 0.121-11.41 5.279-11.41 11.624s5.083 11.503 11.399 11.624l0.011 0c6.327-0.121 11.41-5.279 11.41-11.624s-5.083-11.503-11.399-11.624l-0.011-0zM16.75 14c0.138 0 0.25 0.112 0.25 0.25v8.5c0 0.138-0.112 0.25-0.25 0.25v0h-1.5c-0.138 0-0.25-0.112-0.25-0.25v0-8.5c0-0.138 0.112-0.25 0.25-0.25zM16 9c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5v0c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5v0z" />
    </svg>
  );
}
