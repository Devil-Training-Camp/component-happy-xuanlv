import type React from 'react';
import type { HappyButtonProps } from '../HappyButton';
import type { HappyDialogProps } from '../HappyDialog/types';

/**
 * 确认框参数
 */
export interface HappyConfirmProps extends HappyDialogProps {
  /**
   * Modal body 样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * 取消按钮文字
   * @defaultValue '取消'
   */
  cancelText?: React.ReactNode;
  /**
   * 具体内容
   */
  content?: React.ReactNode;
  /**
   * 确定按钮 loading
   */
  confirmLoading?: boolean;
  /**
   * 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
   */
  footer?: React.ReactNode | ((config: RenderFooterConfig) => React.ReactNode);
  /**
   * 是否显示右上角的关闭按钮
   * @defaultValue false
   */
  closable?: boolean;
  /**
   * 前缀图标
   * 当不需要图标时，可以设为 icon={null}
   */
  icon?: React.ReactNode;
  /**
   * 点击确定回调
   */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  /**
   * 确认按钮文字
   * @defaultValue '确定'
   */
  okText?: React.ReactNode;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * ok 按钮 props
   */
  okButtonProps?: HappyButtonProps;
}

interface RenderFooterConfig {
  /**
   * 取消节点
   */
  cancelButton: React.ReactNode;
  /**
   * 确认节点
   */
  okButton: React.ReactNode;
}
