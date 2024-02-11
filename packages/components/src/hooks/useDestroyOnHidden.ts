import { useMemo, useRef } from 'react';

/**
 * 是否隐藏后销毁处理
 * @param destroyOnHidden - 是否隐藏后销毁
 * @param visible - 可见状态
 */
export default function useDestroyOnHidden(
  destroyOnHidden: boolean | undefined,
  visible: boolean | undefined,
) {
  // 首次显示之后才会创建节点
  const firstVisibleRef = useRef(true);

  useMemo(() => {
    if (visible) {
      firstVisibleRef.current = false;
    }
  }, [visible]);

  // 不渲染节点的条件
  const notRenderElement = firstVisibleRef.current || destroyOnHidden;

  return !notRenderElement || visible;
}
