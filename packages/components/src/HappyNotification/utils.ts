import type { Placement } from './types';

export const defaultDuration = 4.5;

export const defaultTop = 24;
export const defaultBottom = 24;
export const defaultPlacement = 'topRight';

// 不同位置样式
export const getPlacementStyle = (
  placement: Placement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) => {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
      break;
  }
  return style;
};
