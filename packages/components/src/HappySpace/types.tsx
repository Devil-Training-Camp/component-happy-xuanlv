import type React from 'react';
import type { SizeType } from '../types';

export interface HappySpaceProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 间距大小
   */
  size?: SpaceSizeType | SpaceSizeType[];
  /**
   * 间距方向
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
}

export type SpaceSizeType = SizeType | number;
