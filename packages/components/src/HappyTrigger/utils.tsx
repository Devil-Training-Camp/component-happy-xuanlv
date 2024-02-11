import type { Placement } from '../types';
import type { MainPlacement } from './types';

type MatchPosition = {
  top: number;
  left: number;
};

interface WrapperRect {
  top: number;
  left: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollTop: number;
  scrollLeft: number;
}

interface PopupRect {
  width: number;
  height: number;
}

/**
 * 获取匹配修正后的位置
 * @param placement - 预期的位置信息
 * @param triggerRect - 触发节点 Rect
 * @param popupRect - 弹窗节点 Rect
 * @param wrapper - 容器节点
 */
export function getMatchPositionPlacement(
  placement: Placement,
  triggerRect: DOMRect,
  popupRect: PopupRect,
  wrapper: HTMLElement,
) {
  const originRect = wrapper.getBoundingClientRect();
  const { scrollWidth, scrollHeight, scrollTop, scrollLeft } = wrapper;
  const wrapperRect = {
    top: originRect.top,
    left: originRect.left,
    scrollWidth,
    scrollHeight,
    scrollTop,
    scrollLeft,
  };
  // 按照预期匹配
  const placementList = splitPlacement(placement);
  const expectPosition = getExpectPosition(triggerRect, wrapperRect, popupRect, placementList);
  // 自适应
  return getAdjustmentPosition(
    triggerRect,
    wrapperRect,
    popupRect,
    placement,
    placementList,
    expectPosition,
  );
}

/**
 * 分离位置列表
 */
function splitPlacement(placement: Placement) {
  // 当前的位置方向列表
  return placement
    .replace(/([A-Z])/, (match) => `/${match.toLowerCase()}`)
    .split('/') as MainPlacement[];
}

/**
 * 获取预期的位置
 */
function getExpectPosition(
  triggerRect: DOMRect,
  wrapperRect: WrapperRect,
  popupRect: PopupRect,
  placementList: MainPlacement[],
): MatchPosition {
  const [mainPosition, assistPosition] = placementList;
  // 主方向位置
  const position = {
    [getPositionKey(mainPosition)]: computePosition(
      triggerRect,
      wrapperRect,
      popupRect,
      mainPosition,
      true,
    ),
  } as MatchPosition;
  // 辅助位置
  if (assistPosition) {
    Object.assign(position, {
      [getPositionKey(assistPosition)]: computePosition(
        triggerRect,
        wrapperRect,
        popupRect,
        assistPosition,
      ),
    });
    return position;
  }
  // 获取相邻键名
  const positionKey = ['top', 'bottom'].includes(mainPosition) ? 'left' : 'top';
  // 居中计算规则
  Object.assign(position, {
    [positionKey]:
      positionKey === 'left'
        ? triggerRect.left -
          wrapperRect.left +
          wrapperRect.scrollLeft -
          popupRect.width / 2 +
          triggerRect.width / 2
        : triggerRect.top -
          wrapperRect.top +
          wrapperRect.scrollTop -
          popupRect.height / 2 +
          triggerRect.height / 2,
  });
  return position;
}

/**
 * 计算位置
 */
function computePosition(
  triggerRect: DOMRect,
  wrapperRect: WrapperRect,
  popupRect: PopupRect,
  positionKey: MainPlacement,
  mainDirection?: boolean,
) {
  const position = triggerRect[positionKey];
  const positionRule = {
    top: () =>
      position - wrapperRect.top + wrapperRect.scrollTop - (mainDirection ? popupRect.height : 0),
    right: () =>
      position -
      popupRect.width -
      wrapperRect.left +
      wrapperRect.scrollLeft +
      (mainDirection ? popupRect.width : 0),
    bottom: () =>
      position -
      popupRect.height -
      wrapperRect.top +
      wrapperRect.scrollTop +
      (mainDirection ? popupRect.height : 0),
    left: () =>
      position - wrapperRect.left + wrapperRect.scrollLeft - (mainDirection ? popupRect.width : 0),
  };
  return positionRule[positionKey]();
}

/**
 * 获取适应调整后的位置
 */
function getAdjustmentPosition(
  triggerRect: DOMRect,
  wrapperRect: WrapperRect,
  popupRect: PopupRect,
  placement: Placement,
  placementList: MainPlacement[],
  expectPosition: MatchPosition,
) {
  // 各个方向匹配状态
  const positionMatch = getMatchPosition(wrapperRect, popupRect, expectPosition);
  // 正常范围
  if (positionMatch.top && positionMatch.right && positionMatch.bottom && positionMatch.left) {
    return [expectPosition, placement] as const;
  }
  const suitableSpace = getSuitableSpace(triggerRect, wrapperRect);
  // 位置适应计算
  const adjustmentPlacement = computeAdjustmentPlacement(
    placementList,
    positionMatch,
    suitableSpace,
  );
  // 获取预期的位置
  const adjustmentPosition = getExpectPosition(
    triggerRect,
    wrapperRect,
    popupRect,
    adjustmentPlacement,
  );

  return [
    adjustmentPosition,
    adjustmentPlacement.join('/').replace(/\/(\w)/, (match, $1) => $1.toUpperCase()) as Placement,
  ] as const;
}

/**
 * 位置适应计算
 */
function computeAdjustmentPlacement(
  placementList: MainPlacement[],
  positionMatch: Record<string, boolean>,
  suitableSpace: Record<string, number>,
) {
  const [mainPosition, assistPosition] = placementList;
  // 主位置
  const oppositeMainPosition = getOppositeDirection(mainPosition);
  const resultPlacementList = [
    positionMatch[mainPosition] ||
    suitableSpace[mainPosition] >= suitableSpace[oppositeMainPosition]
      ? mainPosition
      : oppositeMainPosition,
  ];
  // 单个 placement 处理相邻位置
  if (!assistPosition) {
    const [mainPlacement] = placementList;
    // 获取相邻的方向
    const overflowList = getAdjacentDirection(mainPlacement).filter(
      (item) => !positionMatch[getOppositeHorizontalDirection(item)],
    );
    // 只有一个方向超出则处理
    if (overflowList.length < 2) {
      return resultPlacementList.concat(overflowList.map(getOppositeHorizontalDirection));
    }
  }
  // 相邻位置处理
  const assistOppositePosition = getOppositeDirection(assistPosition);
  return resultPlacementList.concat(
    positionMatch[assistOppositePosition] ||
      suitableSpace[assistOppositePosition] >= suitableSpace[assistPosition]
      ? assistPosition
      : assistOppositePosition,
  );
}

/**
 * 获取合适的剩余空间
 */
function getSuitableSpace(triggerRect: DOMRect, wrapperRect: WrapperRect) {
  const { top, left, scrollTop, scrollLeft, scrollWidth, scrollHeight } = wrapperRect;
  return {
    top: triggerRect.top - top + scrollTop,
    right: scrollWidth - (triggerRect.right - left + scrollLeft),
    bottom: scrollHeight - (triggerRect.bottom - top + scrollTop),
    left: triggerRect.left - left + scrollLeft,
  };
}

/**
 * 获取匹配位置状态
 */
function getMatchPosition(
  wrapperRect: WrapperRect,
  popupRect: PopupRect,
  expectPosition: MatchPosition,
) {
  const { top: expectTop, left: expectLeft } = expectPosition;
  return {
    top: expectTop > 0,
    right: wrapperRect.scrollWidth > expectLeft + popupRect.width,
    bottom: wrapperRect.scrollHeight > expectTop + popupRect.height,
    left: expectLeft > 0,
  };
}

/**
 * 获取转换 top 或 left
 */
function getPositionKey(placement: MainPlacement) {
  return placement === 'right' ? 'left' : placement === 'bottom' ? 'top' : placement;
}

/**
 * 取反方向
 */
function getOppositeDirection(placement: MainPlacement): MainPlacement {
  switch (placement) {
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    default:
  }
  return placement;
}

/**
 * 取反横向
 */
function getOppositeHorizontalDirection(placement: MainPlacement) {
  return placement === 'left' || placement === 'right'
    ? getOppositeDirection(placement)
    : placement;
}

/**
 * 获取相邻两个方向
 */
function getAdjacentDirection(placement: MainPlacement): MainPlacement[] {
  if (placement === 'left' || placement === 'right') {
    return ['top', 'bottom'];
  }
  return ['left', 'right'];
}
