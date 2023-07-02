import React, { useEffect, useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import HappyModal from '../HappyModal';
import type { HappyModalProps } from '../types';
import mountTest from '../../../tests/shared/mountTest';
import snapshotTest from '../../../tests/shared/snapshotTest';

function ModalTester(props: HappyModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <HappyModal
        getContainer={() => containerRef.current!}
        visible={visible}
        onCancel={() => setVisible(false)}
        {...props}
      >
        Modal Content
      </HappyModal>
    </>
  );
}

describe('HappyModal', () => {
  mountTest(<ModalTester />);

  it('正常渲染', async () => {
    snapshotTest(<ModalTester />);
  });

  //
  it('渲染无 footer', () => {
    snapshotTest(<ModalTester footer={null} />);
  });

  it('onCancel 需要被调用', () => {
    const onCancel = vi.fn();
    render(<HappyModal visible onCancel={onCancel} />);
    fireEvent.click(document.body.querySelectorAll('button')[0]);
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk 需要被调用', () => {
    const onOk = vi.fn();
    render(<HappyModal visible onOk={onOk} />);
    fireEvent.click(document.body.querySelectorAll('button')[1]);
    expect(onOk).toHaveBeenCalled();
  });

  it('鼠标触发位置', () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div ref={containerRef}>
          <div id="trigger" onClick={() => setOpen(true)}>
            click me
          </div>
          <HappyModal visible={open} getContainer={() => containerRef.current!} />
        </div>
      );
    };
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('#trigger')[0]);
    expect(
      (container.querySelectorAll('[role=dialog]')[0] as HTMLDivElement).style.transformOrigin,
    ).toBeTruthy();
  });
});
