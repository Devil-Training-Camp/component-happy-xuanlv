import React from 'react';
import { useMethods } from '@xuan/hooks';
import type { HappyConfirmProps } from '../confirm/types';
import type { HappyModalProps } from './types';
import HappyModal from './HappyModal';
import confirmBuilder from '../confirm/confirmBuilder';
import HappyConfirm from '../confirm/HappyConfirm';

export interface APIHappyModalProps extends HappyModalProps {
  /**
   * 具体内容
   */
  content?: React.ReactNode;
}

/**
 * 通过 useModal 创建支持读取 context 的 contextHolder
 */
export default function useHappyModal() {
  // 每个弹窗唯一 ID
  const modalIdRef = React.useRef(0);
  // 暂存的节点
  const [holderElementMap, setHolderElementMap] = React.useState<Map<number, React.JSX.Element>>(
    new Map(),
  );

  function createBuilder<Config extends HappyConfirmProps>(
    config: Config,
    ModalComponent: React.FC,
  ) {
    const currentModalKey = (modalIdRef.current += 1);

    return confirmBuilder(config, (currentConfig) => {
      // 更新组件
      if (currentConfig) {
        setHolderElementMap((prevState) => {
          return new Map(prevState).set(
            currentModalKey,
            <ModalComponent key={currentModalKey} {...currentConfig} />,
          );
        });
        return;
      }

      // 卸载组件
      setHolderElementMap((prevState) => {
        const currentMap = new Map(prevState);
        currentMap.delete(currentModalKey);
        return currentMap;
      });
    });
  }

  const methods = useMethods({
    /**
     * API 调用弹出确认框
     */
    confirm(config: HappyConfirmProps) {
      return createBuilder(config, HappyConfirm);
    },
    /**
     * API 调用弹出 Modal
     */
    open({ content, ...config }: APIHappyModalProps) {
      return createBuilder({ children: content, ...config }, HappyModal);
    },
  });

  return [methods, Array.from(holderElementMap.values())] as const;
}
