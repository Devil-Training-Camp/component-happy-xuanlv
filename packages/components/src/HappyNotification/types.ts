import type React from 'react';

export interface NotificationNoticeProps {
  /**
   * 当前通知唯一标志
   */
  key?: React.Key;
  /**
   * 通知提醒标题，必选
   */
  message: React.ReactNode;
  /**
   * 通知提醒内容
   */
  description?: React.ReactNode;
  /**
   * 弹框类型
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /**
   * 默认 4.5 秒后自动关闭，配置为 0 则不自动关闭
   * @defaultValue 4.5
   */
  duration?: number;
  /**
   * 最大显示数, 超过限制时，最早的消息会被自动关闭
   */
  maxCount?: number;
  /**
   * 当通知关闭时触发
   */
  onClose?: () => void;
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 自定义关闭图标
   */
  closeIcon?: React.ReactNode;
  /**
   * 自定义关闭按钮
   */
  btn?: React.ReactNode;
}

export interface NotificationInstanceProps {
  /**
   * 弹出位置
   * @defaultValue 'topRight'
   */
  placement?: Placement;
  /**
   * 距离顶部的位置，单位像素
   * @defaultValue 24
   */
  top?: number;
  /**
   * 距离底部的位置，单位像素
   * @defaultValue 24
   */
  bottom?: number;
  /**
   * 配置渲染节点的输出位置
   * @defaultValue () => document.body
   */
  getContainer?: () => HTMLElement;
}

/**
 * 通知提醒框配置参数
 */
export interface HappyNotificationArgs
  extends NotificationNoticeProps,
    NotificationInstanceProps,
    React.HTMLAttributes<HTMLElement> {}

/**
 * 内置提醒框类型
 */
export type NoticeType = 'info' | 'success' | 'error' | 'warning';

export type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface HappyNotificationInstance {
  info(args: HappyNotificationArgs): () => void;
  success(args: HappyNotificationArgs): () => void;
  error(args: HappyNotificationArgs): () => void;
  warning(args: HappyNotificationArgs): () => void;
  open(args: HappyNotificationArgs): () => void;
  destroy(): void;
  close(key: string): void;
}
