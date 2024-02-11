import React from 'react';
import { createRoot } from 'react-dom/client';
import confirmBuilder from './confirmBuilder';
import HappyConfirm from './HappyConfirm';
import type { HappyConfirmProps } from './types';

/**
 * 确认框
 */
export default function confirm(config: HappyConfirmProps) {
  // 渲染的虚拟节点
  const mountNode = document.createDocumentFragment();

  const root = createRoot(mountNode);

  // 渲染
  function render(props: HappyConfirmProps) {
    root.render(<HappyConfirm {...props} afterClose={destroy} />);
  }

  // 摧毁
  function destroy() {
    root.unmount();
  }

  return confirmBuilder(config, (currentConfig) => {
    // 如果包含参数则渲染更新
    if (currentConfig) {
      render(currentConfig);
      return;
    }
    // 摧毁
    destroy();
  });
}
