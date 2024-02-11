import React, { useState } from 'react';
import { Space } from 'antd';
import clsx from 'clsx';
import { useEventListener } from '@xuan/hooks';
import { HappyTooltip } from '@xuan/components/src/HappyTooltip';
import { HappyButton } from '@xuan/components/src/HappyButton';
import IconGlobal from '@/icons/icon-global.svg?react';
import { PreviewBox } from '@/components/Widget/Widget';

const rangeCount = [...Array(1000).keys()];

const textContent =
  '从小丘西行百二十步，隔篁竹，闻水声，如鸣佩环，心乐之。伐竹取道，下见小潭，水尤清冽。';

export default () => {
  const [testVisible, setTestVisible] = useState(false);
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <PreviewBox>
        <h4>黑色主题</h4>
        <Space>
          <HappyTooltip content={textContent}>
            <HappyButton>Hover</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click">
            <HappyButton>Click</HappyButton>
          </HappyTooltip>

          <HappyTooltip content="图标">
            <IconGlobal />
          </HappyTooltip>

          <HappyTooltip content={textContent} showArrow={false}>
            <HappyButton>不显示箭头</HappyButton>
          </HappyTooltip>

          <HappyTooltip content="默认显示" defaultVisible>
            <HappyButton>默认显示</HappyButton>
          </HappyTooltip>

          <HappyTooltip content="提示">
            {(trigger) => <HappyButton {...trigger}>短提示</HappyButton>}
          </HappyTooltip>

          <HappyTooltip content={textContent} theme="white" overlayMode={null}>
            <HappyButton>无额外样式</HappyButton>
          </HappyTooltip>

          <HappyTooltip
            content={() => <em>{textContent}</em>}
            overlayStyle={{ padding: 5, maxWidth: 'initial', color: 'orange' }}
          >
            <HappyButton>自定义弹出层样式</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={() => null}>
            <HappyButton>无内容</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={() => <b>内容</b>} matchTriggerWidth trigger="click">
            <HappyButton>触发器最小同宽</HappyButton>
          </HappyTooltip>

          <HappyTooltip content="提示2" placement="top">
            <HappyTooltip content="提示1" placement="bottom">
              <HappyButton>多个提示</HappyButton>
            </HappyTooltip>
          </HappyTooltip>

          <HappyTooltip content={textContent}>
            <HappyButton disabled buttonTagName="div">
              按钮
            </HappyButton>
          </HappyTooltip>
        </Space>
      </PreviewBox>

      <PreviewBox>
        <h4>白色主题</h4>

        <Space>
          <HappyTooltip theme="white" content={textContent}>
            <HappyButton>Hover</HappyButton>
          </HappyTooltip>

          <HappyTooltip theme="white" content={textContent} trigger="click">
            <HappyButton>Click</HappyButton>
          </HappyTooltip>

          <DragMoveDemo />
        </Space>
      </PreviewBox>

      <PreviewBox>
        <h4>位置</h4>
        <Space>
          <HappyTooltip content={textContent} trigger="click">
            <HappyButton>top</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="topLeft">
            <HappyButton>topLeft</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="topRight">
            <HappyButton>topRight</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="left">
            <HappyButton>left</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="leftTop">
            <HappyButton>leftTop</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="leftBottom">
            <HappyButton>leftBottom</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="right">
            <HappyButton>right</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="rightTop">
            <HappyButton>rightTop</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="rightBottom">
            <HappyButton>rightBottom</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="bottom">
            <HappyButton>bottom</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="bottomLeft">
            <HappyButton>bottomLeft</HappyButton>
          </HappyTooltip>

          <HappyTooltip content={textContent} trigger="click" placement="bottomRight">
            <HappyButton>bottomRight</HappyButton>
          </HappyTooltip>
        </Space>
      </PreviewBox>

      <PreviewBox>
        <h4>折叠隐藏</h4>
        <HappyButton onClick={() => setCollapse((n) => !n)}>
          {collapse ? '展开' : '折叠'}
        </HappyButton>
        <div className={clsx('mb-[100px] mt-2.5', { hidden: collapse })}>
          <HappyTooltip content={textContent} trigger="click" visible={true} placement="bottomLeft">
            <HappyButton>一直显示</HappyButton>
          </HappyTooltip>
        </div>
      </PreviewBox>

      <PreviewBox>
        <h4>性能测试</h4>
        <HappyButton onClick={() => setTestVisible((v) => !v)}>节点显示/移除</HappyButton>
        <div className="flex flex-wrap [&_em]:p-2.5 [&_em]:not-italic">
          {testVisible &&
            rangeCount.map((item) => (
              <HappyTooltip key={item} content={textContent}>
                <em>批量数据{item}</em>
              </HappyTooltip>
            ))}
        </div>
      </PreviewBox>
    </>
  );
};

function DragMoveDemo() {
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [dragging, setDragging] = useState(false);
  useEventListener('mousemove', (e) => dragging && setPosition({ x: e.pageX, y: e.pageY }));
  useEventListener('mouseup', () => setDragging(false));

  return (
    <HappyTooltip trigger="click" content={() => textContent}>
      <div
        onMouseDown={() => setDragging(true)}
        style={
          position && {
            position: 'absolute',
            top: position?.y,
            left: position?.x,
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
          }
        }
      >
        <HappyButton active>可拖拽按钮</HappyButton>
      </div>
    </HappyTooltip>
  );
}
