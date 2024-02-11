import type React from 'react';

export interface MessageArgs extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  /**
   * 内容
   */
  content: React.ReactNode;
  /**
   * 存在的时长
   */
  duration?: number;
  /**
   * 类型
   */
  type?: NoticeType;
  /**
   * 关闭后回调
   */
  onClose?: () => void;
  /**
   * 自定义图标，设置为 null 则不显示
   */
  icon?: React.ReactNode;
  /**
   * 唯一标识
   */
  key?: string | number;
  /**
   * 挂载的 HTML 节点
   */
  getContainer?: () => HTMLElement;
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * 额外的节点
   */
  extra?: React.ReactNode;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export type JointContent = React.ReactNode | MessageArgs;

export interface MessageType {
  (): void;
}

export type OpenType = (
  content: JointContent,
  duration?: number | (() => void),
  onClose?: () => void,
) => MessageType;

export interface HappyMessageInstance {
  info: OpenType;
  success: OpenType;
  error: OpenType;
  warning: OpenType;
  loading: OpenType;
  open(args: MessageArgs): MessageType;
  destroy(key?: React.Key): void;
}
