import React from 'react';
import { HappyButton } from '@xuan/components/src/HappyButton';
import { HappyNotification } from '@xuan/components/src/HappyNotification';
import type {
  NoticeType,
  HappyNotificationArgs,
} from '@xuan/components/src/HappyNotification/types';
import IconClose from '@/icons/icon-close.svg?react';
import { Widget } from '@/components/Widget/Widget';

const innerTypes: NoticeType[] = ['success', 'info', 'warning', 'error'];

export default () => {
  // 事件公共配置
  const object = {
    message: '通知标题',
    description: '这里是通知提醒框内容。',
    onClick: () => {
      // eslint-disable-next-line
      console.log('click');
    },
    onClose: () => {
      // eslint-disable-next-line
      console.log('close');
    },
  };
  // 打开事件
  const openNotification = (config?: Partial<HappyNotificationArgs>) => {
    HappyNotification.open({ ...object, ...config });
  };

  return (
    <>
      <Widget>
        <label>默认4.5秒关：</label>
        <HappyButton onClick={() => openNotification()}>弹出通知</HappyButton>
      </Widget>

      <Widget>
        <label>指定 key：</label>
        <HappyButton onClick={() => openNotification({ key: 'HappyNotification_1' })}>
          弹出通知
        </HappyButton>
      </Widget>

      <Widget>
        <label>更新消息内容：</label>
        <HappyButton
          onClick={() =>
            openNotification({
              key: 'HappyNotification_1',
              message: 'HappyNotification_1',
              description: '基于key: HappyNotification_1 更新内容',
            })
          }
        >
          更新消息内容
        </HappyButton>
      </Widget>

      <Widget>
        <label>无自动关闭：</label>
        <HappyButton onClick={() => openNotification({ key: 'HappyNotification_2', duration: 0 })}>
          弹出通知
        </HappyButton>
      </Widget>

      <Widget>
        <label>关闭指定：</label>
        <HappyButton onClick={() => HappyNotification.close('HappyNotification_2')}>
          关闭指定通知提醒框
        </HappyButton>
      </Widget>

      <Widget>
        <label>右上角：</label>
        <HappyButton onClick={() => openNotification({ placement: 'topRight' })}>
          弹出通知
        </HappyButton>
      </Widget>

      <Widget>
        <label>左下角：</label>
        <HappyButton onClick={() => openNotification({ placement: 'bottomLeft' })}>
          弹出通知
        </HappyButton>
      </Widget>

      <Widget>
        <label>右下角：</label>
        <HappyButton onClick={() => openNotification({ placement: 'bottomRight' })}>
          弹出通知
        </HappyButton>
      </Widget>

      <Widget>
        <label>销毁所有：</label>
        <HappyButton onClick={() => HappyNotification.destroy()}>销毁所有通知</HappyButton>
      </Widget>
      <Widget>
        <label>最大数量：</label>
        <HappyButton onClick={() => openNotification({ maxCount: 3 })}>
          超出最大数量自动关闭最先打开的
        </HappyButton>
      </Widget>
      <Widget>
        <label>自定义图标：</label>
        <HappyButton onClick={() => openNotification({ icon: <IconClose /> })}>
          自定义图标
        </HappyButton>
      </Widget>
      <Widget>
        <label>内置类型：</label>
        {innerTypes.map((type) => (
          <HappyButton key={type} onClick={() => openNotification({ type })}>
            {type}
          </HappyButton>
        ))}
      </Widget>
    </>
  );
};
