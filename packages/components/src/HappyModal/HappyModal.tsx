import React from 'react';
import type { HappyModalProps } from './types';
import { HappyDialog } from '../HappyDialog';
import { CloseButton, FooterCancelButton, FooterOkButton } from './ModalWidget';
import styles from './HappyModal.module.less';

/**
 * 弹窗
 */
export default function HappyModal({
  bodyStyle,
  cancelText,
  closable = true,
  confirmLoading,
  footer,
  onCancel,
  onOk,
  okText,
  title,
  okButtonProps,
  children,
  ...baseProps
}: HappyModalProps) {
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
      <div className={styles.modalFooter}>
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
      {title && (
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
        </div>
      )}
      {closable && <CloseButton onClick={onCancel} />}
      <div className={styles.modalContent} style={bodyStyle}>
        {children}
      </div>
      {renderFooter()}
    </HappyDialog>
  );
}
