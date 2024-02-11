import type { Placement } from '../types';

/**
 * 获取触发箭头距离
 */
export function getTriggerArrowEdge(
  trigger: HTMLElement,
  popup: HTMLElement,
  placement: Placement,
) {
  // 箭头距离占触发节点的一半，即指向中心
  return placement.startsWith('left') || placement.startsWith('right')
    ? Math.min(trigger.clientHeight, popup.offsetHeight) / 2
    : Math.min(trigger.clientWidth, popup.offsetWidth) / 2;
}
