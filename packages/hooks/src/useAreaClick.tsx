import { useEventListener } from './useEventListener';

/**
 * 区域点击触发事件
 */
export function useAreaClick(
  getPreventNodes: () => (HTMLElement | null | undefined)[],
  callBack: (evt: MouseEvent) => void,
) {
  useEventListener('mousedown', (evt) => {
    if (getPreventNodes().some((item) => item?.contains(evt.target as HTMLElement))) {
      return;
    }
    callBack(evt);
  });
}
