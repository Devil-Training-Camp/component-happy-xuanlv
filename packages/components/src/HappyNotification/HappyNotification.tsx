import React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import { HappyFlipper } from '../HappyFlipper';
import Notice from './Notice';
import type { HappyNotificationArgs, NotificationNoticeProps } from './types';
import styles from './HappyNotification.module.less';

let seed = 0;
const getUniqueKey = () => {
  seed += 1;
  return `HappyNotification_${seed}`;
};

interface InstanceProps {
  style?: React.CSSProperties;
  getContainer?: () => HTMLElement;
}

interface HappyNotificationProps extends InstanceProps {
  notices: HappyNotificationArgs[];
}

function HappyNotification({
  notices,
  style,
  getContainer = () => document.body,
}: HappyNotificationProps) {
  return createPortal(
    notices.length ? (
      <HappyFlipper flipKey={notices}>
        <div className={clsx('happyNotification', styles.happyNotification)} style={style}>
          {notices.map((notice) => (
            <Notice key={notice.key} {...notice} />
          ))}
        </div>
      </HappyFlipper>
    ) : null,
    getContainer(),
  );
}

export function createNotificationInstance(properties: InstanceProps) {
  const mountNode = document.createDocumentFragment();
  let notices: HappyNotificationArgs[] = [];

  function removeNotice(key: React.Key) {
    notices = notices.filter((n) => n.key !== key);
    render();
  }

  const root = createRoot(mountNode);

  function render() {
    flushSync(() => root.render(<HappyNotification {...properties} notices={notices} />));
  }

  return {
    notice({
      key = getUniqueKey(),
      onClose,
      maxCount,
      ...args
    }: NotificationNoticeProps): () => void {
      // 可以通过唯一的 key 来更新内容
      const exist = notices.findIndex((n) => n.key === key);
      const current = { ...args, key, onClose: handleClose };

      if (exist >= 0 && notices.length) {
        notices.splice(exist, 1, {
          ...notices[exist],
          ...current,
        });
        notices = notices.slice();
      } else {
        notices = notices.concat(current);
      }

      // 超过最大存在数量，将数组第一项移出
      if (maxCount && notices.length > maxCount) {
        notices.shift();
        notices = notices.slice();
      }

      render();

      function handleClose() {
        removeNotice(key);
        onClose?.();
      }

      return handleClose;
    },
    removeNotice,
    destroy() {
      notices = [];
      render();
    },
  };
}
