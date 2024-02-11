import type React from 'react';
import type { DebounceCallback } from '@xuan/hooks';
import type { Placement } from '../types';

export interface TriggerEvent {
  onClick: React.EventHandler<React.MouseEvent>;
  onMouseEnter?: React.EventHandler<React.MouseEvent>;
  onMouseLeave?: React.EventHandler<React.MouseEvent>;
  ref: React.MutableRefObject<null>;
}

export interface HappyPopupConfig {
  /**
   * 位置信息
   */
  placement?: Placement;
  /**
   * 关闭事件
   */
  onClose: () => void;
  /**
   * popup ref
   */
  popupRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * trigger ref
   */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

export interface HappyTriggerProps {
  /**
   * 子节点渲染
   */
  children: React.ReactElement | ((triggerEvent: TriggerEvent) => React.ReactElement);
  /**
   * 触发器
   * @defaultValue 'hover'
   */
  trigger?: 'click' | 'hover' | 'contextMenu' | null;
  /**
   * 弹出层
   */
  popup: (cfg: HappyPopupConfig) => React.ReactNode;
  /**
   * 位置信息
   */
  placement?: Placement;
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 是否可见的回调
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * 默认是否可见
   */
  defaultVisible?: boolean;
  /**
   * 指定挂载的节点
   * @defaultValue 'document.body'
   */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 获取弹出层样式
   */
  getPopupStyle?: (placement: Placement) => React.CSSProperties;
  /**
   * @defaultValue 1030
   */
  zIndex?: number;
  /**
   * className
   */
  className?: string;
  /**
   * onClick
   */
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  /**
   * onMouseEnter
   */
  onMouseEnter?: React.EventHandler<React.MouseEvent>;
  /**
   * onMouseLeave
   */
  onMouseLeave?: React.EventHandler<React.MouseEvent>;
  /**
   * onContextMenu
   */
  onContextMenu?: React.EventHandler<React.MouseEvent>;
  /**
   * 是否隐藏后销毁
   * @defaultValue true
   */
  destroyPopupOnHide?: boolean;
  /**
   * 鼠标进入时显示的延迟时间。单位：秒
   * @defaultValue 0
   */
  mouseEnterDelay?: number;
  /**
   * 鼠标离开时延迟关闭时间 单位：秒
   * @defaultValue 0
   */
  mouseLeaveDelay?: number;
  /**
   * 进入动画
   */
  animationEnter?: (element: HTMLElement) => Animation;
  /**
   * 离开动画
   */
  animationLeave?: (element: HTMLElement) => Animation;
}

export interface PopupProps {
  /**
   * 触发器
   */
  trigger?: 'click' | 'hover' | 'contextMenu' | null;
  /**
   * popup 节点 ref
   */
  popupRef: React.RefObject<HTMLDivElement>;
  /**
   * 弹出层
   */
  popup: (cfg: HappyPopupConfig) => React.ReactNode;
  /**
   * 位置信息
   */
  placement: Placement;
  /**
   * 是否可见
   */
  visible: boolean | undefined;
  /**
   * 是否可见的回调
   */
  onClose: () => void;
  /**
   * 关闭事件防抖
   */
  onCloseDelay?: DebounceCallback<[]>;
  /**
   * 设定的位置 ref
   */
  positionRef: React.MutableRefObject<DOMRect | undefined>;
  /**
   * 指定挂载的节点
   * @defaultValue 'document.body'
   */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 获取弹出层样式
   */
  getPopupStyle?: (placement: Placement) => React.CSSProperties;
  /**
   * 触发事件的目标 ref
   */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * 层级
   */
  zIndex: number;
  /**
   * className
   */
  className?: string;
}

/**
 * 主要位置信息
 */
export type MainPlacement = 'top' | 'right' | 'bottom' | 'left';
