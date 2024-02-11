import React, { useEffect, useRef } from 'react';
import { useFunction } from '@xuan/hooks';
import type { NoticeContentProps } from './NoticeContent';
import NoticeContent from './NoticeContent';

interface MessageNoticeProps extends NoticeContentProps {
  duration: number;
}

export default function MessageNotice({
  content,
  duration,
  onClose,
  ...restProps
}: MessageNoticeProps) {
  const closeTimerRef = useRef<NodeJS.Timeout>();

  const clearCloseTimer = useFunction(() => clearTimeout(closeTimerRef.current));

  const startCloseTimer = useFunction(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      if (duration === 0) {
        return;
      }
      onClose?.();
    }, duration * 1000);
  });

  const handleClose = useFunction(() => {
    clearCloseTimer();
    onClose?.();
  });

  useEffect(() => {
    startCloseTimer();
    return clearCloseTimer;
  }, [content, duration]);

  return (
    <NoticeContent
      {...restProps}
      content={content}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={startCloseTimer}
      onClose={handleClose}
    />
  );
}
