import { createNotificationInstance } from './HappyNotification';
import type {
  HappyNotificationArgs,
  HappyNotificationInstance,
  NoticeType,
  Placement,
  NotificationInstanceProps,
} from './types';
import { defaultDuration, defaultPlacement, getPlacementStyle } from './utils';

const notificationInstanceMap: Map<
  Placement,
  ReturnType<typeof createNotificationInstance>
> = new Map();

// 基于 placement 创建 notification 实例
const getHappyNotificationInstance = ({
  placement = defaultPlacement,
  top,
  bottom,
  getContainer,
}: NotificationInstanceProps) => {
  const cacheInstance = notificationInstanceMap.get(placement);
  if (cacheInstance) {
    return cacheInstance;
  }

  const instance = createNotificationInstance({
    style: getPlacementStyle(placement as Placement, top, bottom),
    getContainer,
  });

  notificationInstanceMap.set(placement, instance);
  return instance;
};

const HappyNotificationApi = {
  open: (args: HappyNotificationArgs) => {
    const { placement, top, bottom, getContainer, ...noticeProps } = args;

    const instance = getHappyNotificationInstance({
      placement,
      top,
      bottom,
      getContainer,
    });

    return instance.notice({
      ...noticeProps,
      duration: typeof args.duration === 'undefined' ? defaultDuration : args.duration ?? 0,
    });
  },
  close(key: string) {
    notificationInstanceMap.forEach((instance) => {
      instance.removeNotice(key);
    });
  },
  destroy() {
    notificationInstanceMap.forEach((instance) => {
      instance.destroy();
    });

    notificationInstanceMap.clear();
  },
};

// 处理不同场景
['success', 'info', 'warning', 'error'].forEach((type) => {
  // @ts-ignore
  HappyNotificationApi[type] = (config: HappyNotificationArgs) =>
    HappyNotificationApi.open({
      ...config,
      type: type as NoticeType,
    });
});

export default HappyNotificationApi as HappyNotificationInstance;
