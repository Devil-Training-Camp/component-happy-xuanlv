import type React from 'react';

/**
 * 基础弹窗参数
 */
export interface HappyDialogProps {
  /**
   * Modal 完全打开后的回调
   */
  afterOpen?: () => void;
  /**
   * Modal 完全关闭后的回调
   */
  afterClose?: () => void;
  /**
   * 垂直居中显示
   */
  centered?: boolean;
  /**
   * 弹窗内容
   */
  children?: React.ReactNode;
  /**
   * 样式名
   */
  className?: string;
  /**
   * 关闭时销毁 Modal 里的子元素
   * @defaultValue true
   */
  destroyOnClose?: boolean;
  /**
   * 挂载的 HTML 节点
   */
  getContainer?: () => HTMLElement;
  /**
   * 是否展示遮罩
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * 点击蒙层是否允许关闭
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * 是否支持键盘 esc 关闭
   * @defaultValue true
   */
  keyboard?: boolean;
  /**
   * 遮罩样式
   */
  maskStyle?: React.CSSProperties;
  /**
   * 点击取消回调
   */
  onCancel?: () => void;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 宽度
   */
  width?: number;
  /**
   * 对话框外层容器的类名
   */
  wrapClassName?: string;
  /**
   * 弹窗层级
   * @defaultValue 1000
   */
  zIndex?: number;
  /**
   * 进入动画
   */
  animationEnter?: (element: HTMLElement) => Animation;
  /**
   * 离开动画
   */
  animationLeave?: (element: HTMLElement) => Animation;
  /**
   * root 节点属性
   */
  rootAttrs?: React.HTMLAttributes<HTMLDivElement>;
}
