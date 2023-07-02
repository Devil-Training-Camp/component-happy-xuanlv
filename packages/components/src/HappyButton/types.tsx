import type React from 'react';
import type { SizeType } from '../types';

export interface HappyButtonProps<T extends keyof JSX.IntrinsicElements = 'button'>
  extends Omit<React.AllHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * 将按钮宽度调整为其父宽度的选项
   */
  block?: boolean;
  /**
   * 禁用状态
   */
  disabled?: boolean;
  /**
   * 是否有边框
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * 是否为激活状态
   */
  active?: boolean;
  /**
   * 设置按钮的图标组件
   */
  icon?: React.ReactNode;
  /**
   * loading
   */
  loading?: boolean;
  /**
   * 按钮形状
   */
  shape?: 'default' | 'circle' | 'round';
  /**
   * 按钮大小
   * @defaultValue 'middle'
   */
  size?: SizeType;
  /**
   * 按钮类型
   * @defaultValue 'default'
   */
  type?: 'default' | 'primary' | 'dashed';
  /**
   * 是否描边
   */
  outline?: boolean;
  /**
   * 设置危险按钮
   */
  danger?: boolean;
  /**
   * 按钮标签名
   * @defaultValue 'button'
   */
  buttonTagName?: T | string;
}
