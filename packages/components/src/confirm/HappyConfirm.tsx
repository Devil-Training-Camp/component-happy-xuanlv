import React from 'react';
import IconWarning from '../icons/icon-warning-fill.svg?react';
import type { HappyConfirmProps } from './types';
import { CloseButton, FooterCancelButton, FooterOkButton } from '../HappyModal/ModalWidget';
import { HappyDialog } from '../HappyDialog';
import styles from './HappyConfirm.module.less';

/**
 * 确认弹窗
 */
export default function HappyConfirm({
  bodyStyle,
  cancelText,
  closable,
  content,
  confirmLoading,
  footer,
  icon,
  onCancel,
  onOk,
  okText,
  title,
  okButtonProps,
  children,
  ...baseProps
}: HappyConfirmProps) {
  function renderFooter() {
    if (footer === null) {
      return null;
    }
    const cancelButton = <FooterCancelButton onCancel={onCancel} cancelText={cancelText} />;
    const okButton = (
      <FooterOkButton
        confirmLoading={confirmLoading}
        onOk={onOk}
        okText={okText}
        okButtonProps={okButtonProps}
      />
    );

    return (
      <div className={styles.confirmFooter}>
        {typeof footer === 'function'
          ? footer({ cancelButton, okButton })
          : footer ?? (
              <>
                {cancelButton}
                {okButton}
              </>
            )}
      </div>
    );
  }

  return (
    <HappyDialog onCancel={onCancel} {...baseProps}>
      {closable && <CloseButton onClick={onCancel} />}
      <div className={styles.confirmBody} style={bodyStyle}>
        {icon === null ? null : (
          <div className={styles.confirmIcon}>
            {icon ?? <IconWarning className={styles.icon} />}
          </div>
        )}

        <div className={styles.confirmContent}>
          {title && <div className={styles.confirmTitle}>{title}</div>}
          {content ?? children}
        </div>
        {renderFooter()}
      </div>
    </HappyDialog>
  );
}
