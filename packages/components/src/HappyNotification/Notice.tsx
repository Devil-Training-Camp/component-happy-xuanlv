import React, { useEffect, useRef } from 'react';
import { useFunction } from '@xuan/hooks';
import NoticeContent from './NoticeContent';
import type { NotificationNoticeProps } from './types';

interface NoticeProps
  extends Omit<NotificationNoticeProps, 'maxCount'>,
    React.HTMLAttributes<HTMLElement> {}

export default function Notice({
  message,
  description,
  duration,
  onClose,
  ...restProps
}: NoticeProps) {
  const closeTimerRef = useRef<NodeJS.Timeout>();

  const clearCloseTimer = useFunction(() => clearTimeout(closeTimerRef.current));

  const startCloseTimer = useFunction(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(
      () => {
        if (duration === 0) {
          return;
        }
        onClose?.();
      },
      (duration as number) * 1000,
    );
  });

  const handleClose = useFunction(() => {
    clearCloseTimer();
    onClose?.();
  });

  useEffect(() => {
    startCloseTimer();
    return clearCloseTimer;
  }, [message, description, duration]);

  return (
    <NoticeContent
      {...restProps}
      message={message}
      description={description}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={startCloseTimer}
      onClose={handleClose}
    />
  );
}
