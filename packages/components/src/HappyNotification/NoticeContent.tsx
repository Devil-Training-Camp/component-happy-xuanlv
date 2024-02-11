import React from 'react';
import clsx from 'clsx';
import { HappyFlipped } from '../HappyFlipped';
import type { NotificationNoticeProps } from './types';
import IconInfo from '../icons/icon-info-fill.svg?react';
import IconError from '../icons/icon-close-fill.svg?react';
import IconOk from '../icons/icon-ok-fill.svg?react';
import IconWarn from '../icons/icon-warning-fill.svg?react';
import IconClose from '../icons/icon-close.svg?react';
import styles from './NoticeContent.module.less';

const IconConfig = {
  info: <IconInfo className={styles.infoIcon} />,
  success: <IconOk className={styles.successIcon} />,
  error: <IconError className={styles.errorIcon} />,
  warning: <IconWarn className={styles.warnIcon} />,
};

interface NoticeContentProps
  extends Omit<NotificationNoticeProps, 'maxCount' | 'duration'>,
    React.HTMLAttributes<HTMLElement> {}

export default function NoticeContent({
  message,
  description,
  type,
  onClose,
  icon,
  closeIcon,
  btn,
  className,
  ...restProps
}: NoticeContentProps) {
  return (
    <HappyFlipped>
      <div className={clsx(styles.noticeContent, className)} {...restProps}>
        {(type || icon) && (
          <div className={clsx('happyNotificationIcon', styles.icon)}>
            {type ? IconConfig[type] : icon}
          </div>
        )}
        <div className={clsx('happyNotificationMain', styles.main)}>
          <div className={styles.header}>
            <div className={styles.message}>{message}</div>
            <div className={clsx('happyNotificationClose', styles.closeIcon)} onClick={onClose}>
              {closeIcon ?? <IconClose />}
            </div>
          </div>
          {description && <div className={styles.description}>{description}</div>}
          {btn && <div className={styles.extra}>{btn}</div>}
        </div>
      </div>
    </HappyFlipped>
  );
}
