import type { SpaceSizeType } from './types';

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

export function getNumberSize(size: SpaceSizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}
