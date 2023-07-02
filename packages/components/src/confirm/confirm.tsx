import React from 'react';
import { createRoot } from 'react-dom/client';
import HappyConfirm from './HappyConfirm';
import type { HappyConfirmProps } from './types';

/**
 * 确认框
 */
export default function confirm(config: HappyConfirmProps) {
  const root = createRoot(document.createDocumentFragment());

  // 渲染
  function render(props: HappyConfirmProps) {
    root.render(<HappyConfirm {...props} afterClose={destroy} />);
  }

  // 摧毁
  function destroy() {
    root.unmount();
  }

  return happyConfirmBuilder(config, (currentConfig) => {
    // 如果包含参数则渲染更新
    if (currentConfig) {
      render(currentConfig);
      return;
    }
    // 摧毁
    destroy();
  });
}

/**
 * 通过渲染函数构造不同模式的确认框
 * @param config - 弹窗配置参数
 * @param render - 更新渲染，传 undefined 则执行卸载流程
 */
export function happyConfirmBuilder(
  config: HappyConfirmProps,
  render: (props: HappyConfirmProps | undefined) => void,
) {
  // 参数配置
  let currentConfig: HappyConfirmProps = {
    ...config,
    visible: true,
    async onOk(e) {
      const result = config.onOk?.(e);

      // Promise 实例则等待调用
      if (result instanceof Promise) {
        update({ confirmLoading: true });
        try {
          await result;
          close();
        } catch (err) {
          update({ confirmLoading: false });
        }
        return;
      }
      close();
    },
    onCancel() {
      config.onCancel?.();
      close();
    },
    afterClose() {
      config.afterClose?.();
      destroy();
    },
  };

  // 更新
  function update(
    next: Partial<HappyConfirmProps> | ((config: HappyConfirmProps) => Partial<HappyConfirmProps>),
  ) {
    currentConfig = {
      ...currentConfig,
      ...(typeof next === 'function' ? next(currentConfig) : next),
    };
    render(currentConfig);
  }

  // 关闭
  function close() {
    update({ visible: false });
  }

  // 摧毁
  function destroy() {
    render(undefined);
  }

  render(currentConfig);

  return {
    close,
    destroy,
    update,
  };
}
