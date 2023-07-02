import type React from 'react';
import type { SizeType } from '../types';

export interface HappySpinProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 大小
   */
  size?: SizeType;
  /**
   * 延迟显示加载效果的时间
   */
  delay?: number;
  /**
   * 自定义指示符
   */
  indicator?: React.ReactNode;
  /**
   * 跟随定位容器填充
   */
  full?: boolean;
  /**
   * 自定义描述文案
   */
  tip?: React.ReactNode;
}
