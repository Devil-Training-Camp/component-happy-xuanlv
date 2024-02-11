/**
 * 是否为空值
 */
export function isNil(text: unknown) {
  return text === null || text === undefined || text === '';
}

/**
 * 转换为数组
 */
export function toArray<T>(value: T | T[] | undefined): T[] {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value!];
}

/**
 * 默认动画参数
 */
export const DEFAULT_KEYFRAMES: KeyframeAnimationOptions = {
  duration: 400,
  easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  fill: 'both',
};
