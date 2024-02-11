import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import HappyButton from '../HappyButton';
import mountTest from '../../../tests/shared/mountTest';
import snapshotTest from '../../../tests/shared/snapshotTest';

describe('HappyButton', () => {
  mountTest(<HappyButton>按钮</HappyButton>);

  it('正常渲染', () => {
    snapshotTest(<HappyButton>按钮</HappyButton>);
    snapshotTest(<HappyButton size="large">按钮</HappyButton>);
    snapshotTest(<HappyButton size="small">按钮</HappyButton>);
    snapshotTest(<HappyButton outline>按钮</HappyButton>);
    snapshotTest(<HappyButton danger>按钮</HappyButton>);
    snapshotTest(<HappyButton shape="circle">按钮</HappyButton>);
    snapshotTest(<HappyButton shape="round">按钮</HappyButton>);
    snapshotTest(<HappyButton type="primary">按钮</HappyButton>);
    snapshotTest(<HappyButton type="dashed">按钮</HappyButton>);
    snapshotTest(<HappyButton icon={<div>图标</div>}>按钮</HappyButton>);
    snapshotTest(<HappyButton bordered={false}>按钮</HappyButton>);
  });

  it('空按钮', () => {
    const wrapper = render(
      <HappyButton>
        {null}
        {undefined}
      </HappyButton>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('加载时不应单击该按钮', () => {
    const onClick = vi.fn();
    const { container } = render(
      <HappyButton loading onClick={onClick}>
        button
      </HappyButton>,
    );
    fireEvent.click(container.firstChild!);
    expect(onClick).not.toHaveBeenCalledWith();
  });

  it('禁用时不应单击该按钮', () => {
    const onClick = vi.fn();
    const { container } = render(
      <HappyButton disabled onClick={onClick}>
        button
      </HappyButton>,
    );
    fireEvent.click(container.firstChild!);
    expect(onClick).not.toHaveBeenCalledWith();
  });

  it('自定义链接标签', () => {
    const wrapper = render(
      <HappyButton target="_blank" href="https://react.dev/reference/react" buttonTagName="a">
        链接
      </HappyButton>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('loading 状态改变', async () => {
    const { container, rerender, unmount } = render(<HappyButton>按钮</HappyButton>);
    rerender(<HappyButton loading />);
    expect(container.querySelectorAll('.happy-spin').length).toBe(1);
    rerender(<HappyButton loading={false} />);
    expect(container.querySelectorAll('.happy-spin').length).toBe(0);
    expect(unmount).not.toThrow();
  });
});
