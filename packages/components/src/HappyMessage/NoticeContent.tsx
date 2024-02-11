import React from 'react';
import clsx from 'clsx';
import type { NoticeType } from './types';
import { HappyFlipped } from '../HappyFlipped';
import { HappySpin } from '../HappySpin';
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
  loading: <HappySpin />,
};

export interface NoticeContentProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  type?: NoticeType;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
  extra?: React.ReactNode;
}

export default function NoticeContent(props: NoticeContentProps) {
  const {
    type,
    icon = type && IconConfig[type],
    content,
    onClose,
    closable,
    extra,
    className,
    ...restProps
  } = props;
  return (
    <HappyFlipped>
      <div className={clsx(styles.noticeContent, className)} {...restProps}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{content}</span>
        {extra && <span className={styles.extra}>{extra}</span>}
        {closable && <IconClose className={styles.closeIcon} onClick={onClose} />}
      </div>
    </HappyFlipped>
  );
}
