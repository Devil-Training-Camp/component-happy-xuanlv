import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal, flushSync } from 'react-dom';
import clsx from 'clsx';
import { HappyFlipper } from '../HappyFlipper';
import MessageNotice from './MessageNotice';
import type { MessageArgs } from './types';
import styles from './HappyMessageNotice.module.less';

let seed = 0;
const getUniqueKey = () => {
  seed += 1;
  return `HappyMessageNotice_${seed}`;
};

export interface InstanceProps {
  getContainer?: () => HTMLElement;
}

export interface HappyMessageNoticeProps extends InstanceProps {
  notices: MessageArgs[];
}

function HappyMessageNotice({
  notices,
  getContainer = () => document.body,
}: HappyMessageNoticeProps) {
  return createPortal(
    notices.length ? (
      <HappyFlipper flipKey={notices}>
        <div className={clsx('happyMessage', styles.happyMessage)}>
          {notices.map((notice) => (
            <MessageNotice {...notice} key={notice.key} duration={notice.duration as number} />
          ))}
        </div>
      </HappyFlipper>
    ) : null,
    getContainer(),
  );
}

export function createMessageInstance(properties: InstanceProps) {
  const mountNode = document.createDocumentFragment();
  let notices: MessageArgs[] = [];

  function removeNotice(key: string | number) {
    notices = notices.filter((n) => n.key !== key);
    render();
  }

  const root = createRoot(mountNode);

  function render() {
    flushSync(() => root.render(<HappyMessageNotice {...properties} notices={notices} />));
  }

  return {
    notice({ key = getUniqueKey(), onClose, ...args }: MessageArgs): () => void {
      const exist = notices.find((n) => n.key === key);
      if (exist) {
        return exist.onClose!;
      }
      notices = notices.concat({ ...args, key, onClose: handleClose });
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
