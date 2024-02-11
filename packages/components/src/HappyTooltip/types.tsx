import type React from 'react';
import type { HappyPopupConfig, HappyTriggerProps } from '../HappyTrigger';

export interface HappyTooltipProps extends Omit<HappyTriggerProps, 'popup'> {
  /**
   * 主题色
   * @defaultValue 'dark'
   */
  theme?: 'white' | 'dark';
  /**
   * 是否显示箭头
   * @defaultValue true
   */
  showArrow?: boolean;
  /**
   * 详细内容
   */
  content: string | ((config: HappyPopupConfig) => React.ReactNode);
  /**
   * 提示框模式
   * - message 消息模式（限制最大宽度/添加间距）
   * @defaultValue 'message'
   */
  overlayMode?: 'message' | null;
  /**
   * className
   */
  overlayClassName?: string;
  /**
   * style
   */
  overlayStyle?: React.CSSProperties;
  /**
   * 提示框是否与触发器最小同宽
   */
  matchTriggerWidth?: boolean;
}

export interface HappyTooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'children'>,
    HappyPopupConfig {
  /**
   * className
   */
  className?: string;
  /**
   * 主题色
   * @defaultValue 'white'
   */
  theme?: 'white' | 'dark';
  /**
   * 是否显示箭头
   * @defaultValue true
   */
  showArrow?: boolean;
  /**
   * 提示框模式
   * - message 消息模式（限制最大宽度/添加间距）
   */
  overlayMode?: 'message' | null;
  /**
   * 详细内容
   */
  content: React.ReactNode | ((config: HappyPopupConfig) => React.ReactNode);
  /**
   * 提示框是否与触发器最小同宽
   */
  matchTriggerWidth?: boolean;
}
