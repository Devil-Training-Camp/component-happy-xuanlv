import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { HappyNotification } from '../index';
import CustomIcon from '../../icons/icon-close.svg?react';

describe('HappyNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['setTimeout'],
    });
  });
  afterEach(async () => {
    vi.useRealTimers();
  });

  it('调用销毁函数', async () => {
    HappyNotification.open({
      message: 'msg',
      description: 'desc',
    });
    expect(document.querySelectorAll('.happyNotification')).toHaveLength(1);

    HappyNotification.destroy();
    expect(document.querySelectorAll('.happyNotification')).toHaveLength(0);
  });

  it('手动点击 close', async () => {
    const onClose = vi.fn();
    HappyNotification.open({
      message: 'msg',
      description: 'desc',
      onClose,
    });
    const closeIconNode = document.querySelectorAll('.happyNotificationClose')[0];
    fireEvent.click(closeIconNode);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll('.happyNotification')).toHaveLength(0);
  });

  it('自定义图标', async () => {
    HappyNotification.open({
      message: 'msg',
      description: 'desc',
      icon: <CustomIcon id="customIcon" />,
    });

    expect(document.querySelector('#customIcon')).toBeTruthy();
  });

  it('4.5 秒自动关闭', async () => {
    const onClose = vi.fn();

    HappyNotification.open({
      message: 'msg',
      description: 'desc',
      onClose,
    });

    expect(document.querySelectorAll('.happyNotification')).toHaveLength(1);
    await vi.runAllTimersAsync();

    expect(onClose).toHaveBeenCalled();
  });
});
