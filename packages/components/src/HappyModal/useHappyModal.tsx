import React from 'react';
import { useMethods } from '@xuan/hooks';
import type { HappyConfirmProps } from '../confirm/types';
import type { HappyModalProps } from './types';
import HappyModal from './HappyModal';
import HappyConfirm from '../confirm/HappyConfirm';
import { happyConfirmBuilder } from '../confirm/confirm';

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
  const [holderNodes, setHolderNodes] = React.useState<Map<number, JSX.Element>>(
    new Map(),
  );

  function createBuilder<Config extends HappyConfirmProps>(config: Config, ModalComponent: React.FC) {
    const currentModalKey = (modalIdRef.current += 1);

    return happyConfirmBuilder(config, (currentConfig) => {
      // 更新组件
      if (currentConfig) {
        setHolderNodes((prevState) => {
          return new Map(prevState).set(
            currentModalKey,
            <ModalComponent key={currentModalKey} {...currentConfig} />,
          );
        });
        return;
      }

      // 卸载组件
      setHolderNodes((prevState) => {
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

  return [methods, Array.from(holderNodes.values())] as const;
}
