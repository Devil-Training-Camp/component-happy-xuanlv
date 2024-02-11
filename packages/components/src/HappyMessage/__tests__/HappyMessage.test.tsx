import React from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act } from 'react-dom/test-utils';
import { HappyMessage } from '../index';
import IconClose from '../../icons/icon-close.svg?react';

describe('HappyMessage', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['setTimeout'],
    });
  });
  afterEach(async () => {
    vi.useRealTimers();
  });

  it('手动隐藏', async () => {
    HappyMessage.info('whatever', 0);
    await vi.runAllTimersAsync();
    expect(document.querySelectorAll('.happyMessage')).toHaveLength(1);

    HappyMessage.destroy();
    await vi.runAllTimersAsync();
    expect(document.querySelectorAll('.happyMessage')).toHaveLength(0);
  });

  it('使用 onClose', async () => {
    const onClose = vi.fn();
    HappyMessage.success('whatever', onClose);
    await vi.runAllTimersAsync();
    expect(onClose).toHaveBeenCalled();
  });

  it('自定义图标', async () => {
    act(() => {
      HappyMessage.open({
        content: 'Message',
        icon: <IconClose id="customIcon" style={{ color: 'orange' }} />,
      });
    });
    expect(document.querySelectorAll('#customIcon').length).toBeTruthy();
  });

  it('正确进行销毁', async () => {
    HappyMessage.loading('Action in progress1..', 0);
    await vi.runAllTimersAsync();
    HappyMessage.destroy();
    expect(document.querySelectorAll('.happyMessage')).toHaveLength(0);
  });

  it('传入空', async () => {
    HappyMessage.error(null);
  });
});
