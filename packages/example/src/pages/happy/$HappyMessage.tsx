import React from 'react';
import { HappyButton } from '@xuan/components/src/HappyButton';
import { HappyMessage } from '@xuan/components/src/HappyMessage';
import IconClose from '@/icons/icon-close.svg?react';
import IconQuestion from '@/icons/icon-question.svg?react';
import { Widget } from '@/components/Widget/Widget';

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Widget>
        <label>默认提示: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.info('这是一条默认消息提示, 自定义 6 秒后关闭', 6, () => {
              // eslint-disable-next-line no-console
              console.log('closed');
            });
          }}
        >
          默认
        </HappyButton>
      </Widget>
      <Widget>
        <label>成功提示: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.success('成功提示', () => {
              // eslint-disable-next-line no-console
              console.log('onClose');
            });
          }}
        >
          成功
        </HappyButton>
      </Widget>
      <Widget>
        <label>警告提示: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.warning('这是一条 warning 类消息提示');
          }}
        >
          警告
        </HappyButton>
      </Widget>
      <Widget>
        <label>错误提示: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.error('这是一条 error 类消息提示');
          }}
        >
          错误
        </HappyButton>
      </Widget>

      <Widget>
        <label>不允许重复: </label>
        <HappyButton
          size="small"
          onClick={async () => {
            HappyMessage.success({
              key: 'message',
              content: '这是一条消息提示',
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>

      <Widget>
        <label>手动关闭: </label>
        <HappyButton
          size="small"
          onClick={async () => {
            const close = HappyMessage.open({
              content: (
                <div className="flex items-center">
                  这是一条消息提示
                  <IconClose className="ml-2" onClick={() => close()} />
                </div>
              ),
              duration: 0,
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>

      <Widget>
        <label>自定义 Icon: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.open({
              type: 'success',
              content: '自定义 Icon',
              icon: <IconQuestion />,
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>
      <Widget>
        <label>带有跳转链接: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.open({
              type: 'success',
              content: '这是一条带有链接的消息提示',
              onClose: () => {
                // eslint-disable-next-line no-console
                console.log('close');
              },
              extra: <a onClick={() => window.open('https://www.baidu.com')}>链接按钮</a>,
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>
      <Widget>
        <label>loading 提示: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.open({
              type: 'loading',
              content: 'loading 时消息提示,通过 open 方式使用',
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>

      <Widget>
        <label>全部销毁: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.open({
              key: 'destroy-message',
              duration: 0,
              content: (
                <HappyButton type="primary" onClick={() => HappyMessage.destroy()}>
                  全部销毁
                </HappyButton>
              ),
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>

      <Widget>
        <label>关闭按钮: </label>
        <HappyButton
          size="small"
          onClick={() => {
            HappyMessage.open({
              type: 'success',
              content: '通过手动关闭消息提示',
              closable: true,
            });
          }}
        >
          打开
        </HappyButton>
      </Widget>
    </>
  );
};
