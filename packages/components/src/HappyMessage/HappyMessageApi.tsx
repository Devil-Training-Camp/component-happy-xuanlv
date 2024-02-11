import type { InstanceProps } from './HappyMessageNotice';
import { createMessageInstance } from './HappyMessageNotice';
import type { MessageArgs, HappyMessageInstance, NoticeType, JointContent } from './types';
import { defaultDuration, defaultLongerDuration } from './utils';

export interface MessageInstance {
  notice: (args: Omit<MessageArgs, 'getContainer'>) => () => void;
  removeNotice: (key: string | number) => void;
  destroy: () => void;
}

// 暂存实例
let lastInstance: MessageInstance | undefined;

// 创建实例及缓存
const getHappyMessageInstance = (args: InstanceProps): MessageInstance => {
  if (lastInstance) {
    return lastInstance;
  }
  const instance = createMessageInstance(args);

  lastInstance = instance;
  return instance;
};

const HappyNotificationApi = {
  open: ({ getContainer, ...args }: MessageArgs) => {
    return getHappyMessageInstance({ getContainer }).notice({
      ...args,
      duration:
        args.duration ?? (args.closable || args.extra ? defaultLongerDuration : defaultDuration),
    });
  },
  destroy() {
    if (lastInstance) {
      lastInstance.destroy();
      lastInstance = undefined;
    }
  },
};

// 处理不同场景
['success', 'info', 'warning', 'error', 'loading'].forEach((type) => {
  // @ts-ignore
  HappyNotificationApi[type] = (
    jointContent: JointContent,
    duration?: number | (() => void),
    onClose?: () => void,
  ) => {
    const customDuration = typeof duration === 'number';

    return HappyNotificationApi.open({
      onClose: customDuration ? onClose : duration,
      duration: customDuration ? duration : defaultDuration,
      type: type as NoticeType,
      ...(jointContent && typeof jointContent === 'object' && 'content' in jointContent
        ? jointContent
        : { content: jointContent }),
    });
  };
});

export default HappyNotificationApi as HappyMessageInstance;
