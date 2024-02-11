import React from 'react';
import { HappyButton } from '@xuan/components/src/HappyButton';
import { HappySpace } from '@xuan/components/src/HappySpace';
import { MacScrollbar } from 'mac-scrollbar';
import { HappyTrigger } from '@xuan/components/src/HappyTrigger';
import { PreviewBox, SectionBox } from '@/components/Widget/Widget';

function TipBox(props: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[280px] rounded border border-gray-200 bg-white p-2 shadow-md"
      {...props}
    />
  );
}

const rangeCount = [...Array(1000).keys()];

const textContent =
  '从小丘西行百二十步，隔篁竹，闻水声，如鸣佩环，心乐之。伐竹取道，下见小潭，水尤清冽。';

export default () => {
  const [controlledVisible, setControlledVisible] = React.useState(false);
  const [testVisible, setTestVisible] = React.useState(false);

  return (
    <>
      <PreviewBox>
        <h4>基本</h4>
        <SectionBox>
          <HappySpace>
            <HappyTrigger popup={() => <TipBox>{textContent}</TipBox>}>
              <HappyButton
                onMouseEnter={() => {
                  // eslint-disable-next-line no-console
                  console.log('onMouseEnter');
                }}
              >
                Hover
              </HappyButton>
            </HappyTrigger>

            <HappyTrigger trigger="click" popup={() => <TipBox>{textContent}</TipBox>}>
              <HappyButton
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('onClick');
                }}
              >
                点击
              </HappyButton>
            </HappyTrigger>
          </HappySpace>
        </SectionBox>
      </PreviewBox>

      <PreviewBox>
        <h4>受控</h4>
        <SectionBox>
          <HappySpace>
            <HappyTrigger
              trigger="click"
              visible={controlledVisible}
              onVisibleChange={setControlledVisible}
              popup={() => <TipBox>受控提示</TipBox>}
            >
              {(trigger) => (
                <HappyButton {...trigger} onClick={() => setControlledVisible((v) => !v)}>
                  受控状态：{controlledVisible ? '显示' : '默认'}
                </HappyButton>
              )}
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              // eslint-disable-next-line
              onVisibleChange={(s) => console.log(s)}
              popup={() => <TipBox>提示</TipBox>}
            >
              <HappyButton>不受控回调</HappyButton>
            </HappyTrigger>

            <HappyTrigger trigger="click" defaultVisible popup={() => <TipBox>默认提示</TipBox>}>
              <HappyButton>默认显示</HappyButton>
            </HappyTrigger>
          </HappySpace>
        </SectionBox>
      </PreviewBox>

      <PreviewBox>
        <h4>更多</h4>
        <SectionBox>
          <HappySpace>
            <HappyTrigger
              trigger="click"
              popup={() => <TipBox>{textContent}</TipBox>}
              destroyPopupOnHide={false}
            >
              <HappyButton>隐藏后不销毁</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              popup={() => (
                <TipBox>
                  <div>一级提示</div>
                  <HappyTrigger
                    trigger="click"
                    popup={() => (
                      <TipBox>
                        <div>这里是二级提示</div>
                        <HappyTrigger
                          trigger="click"
                          popup={() => <TipBox>这里是三级提示</TipBox>}
                          placement="rightTop"
                        >
                          <HappyButton>三级提示</HappyButton>
                        </HappyTrigger>
                      </TipBox>
                    )}
                    placement="rightTop"
                  >
                    <HappyButton>二级提示</HappyButton>
                  </HappyTrigger>
                </TipBox>
              )}
            >
              <HappyButton>多级嵌套</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              placement="topLeft"
              trigger="click"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyTrigger placement="right" popup={() => <TipBox>提示2</TipBox>}>
                <HappyTrigger placement="bottom" popup={() => <TipBox>提示1</TipBox>}>
                  <HappyButton>多个提示</HappyButton>
                </HappyTrigger>
              </HappyTrigger>
            </HappyTrigger>
          </HappySpace>
        </SectionBox>
      </PreviewBox>

      <PreviewBox>
        <h4>右键菜单</h4>
        <SectionBox>
          <HappySpace>
            <HappyTrigger trigger="contextMenu" popup={() => <TipBox>{textContent}</TipBox>}>
              <div className="h-32 w-32 bg-slate-100" />
            </HappyTrigger>
          </HappySpace>
        </SectionBox>
      </PreviewBox>

      <PreviewBox>
        <h4>位置</h4>
        <SectionBox>
          <HappySpace>
            <HappyTrigger
              trigger="click"
              placement="top"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>top</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="topLeft"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>topLeft</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="topRight"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>topRight</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="left"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>left</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="leftTop"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>leftTop</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="leftBottom"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>leftBottom</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="right"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>right</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="rightTop"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>rightTop</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="rightBottom"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>rightBottom</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="bottom"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>bottom</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="bottomLeft"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>bottomLeft</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              trigger="click"
              placement="bottomRight"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>bottomRight</HappyButton>
            </HappyTrigger>
          </HappySpace>
        </SectionBox>
      </PreviewBox>

      <PreviewBox>
        <h4>容器中显示</h4>
        <MacScrollbar className="h-[400px] border border-slate-200 p-3">
          <HappyTrigger trigger="click" popup={() => <TipBox>{textContent}</TipBox>}>
            {(trigger) => <HappyButton {...trigger}>挂载到 body</HappyButton>}
          </HappyTrigger>

          <div className="relative mt-2.5 flex h-max justify-between">
            <div>
              {[...Array(50).keys()].map((n) => (
                <HappyTrigger
                  key={n}
                  getPopupContainer={(node) => node.parentNode?.parentNode as HTMLElement}
                  trigger="click"
                  popup={() => <TipBox>{textContent}</TipBox>}
                >
                  <div className="mb-2.5 block">
                    <HappyButton>左侧点击</HappyButton>
                  </div>
                </HappyTrigger>
              ))}
            </div>

            <HappyTrigger
              getPopupContainer={(node) => node.parentNode as HTMLElement}
              trigger="click"
              placement="topRight"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>中间点击</HappyButton>
            </HappyTrigger>

            <HappyTrigger
              getPopupContainer={(node) => node.parentNode as HTMLElement}
              trigger="click"
              placement="rightBottom"
              popup={() => <TipBox>{textContent}</TipBox>}
            >
              <HappyButton>右侧点击</HappyButton>
            </HappyTrigger>
          </div>
        </MacScrollbar>
      </PreviewBox>

      <PreviewBox>
        <h4>性能测试</h4>
        <HappyButton onClick={() => setTestVisible((v) => !v)}>节点显示/移除</HappyButton>
        <div className="flex flex-wrap [&_em]:p-2.5 [&_em]:not-italic">
          {testVisible &&
            rangeCount.map((item) => (
              <HappyTrigger
                key={item}
                popup={() => <TipBox>{textContent}</TipBox>}
                mouseEnterDelay={0.1}
                mouseLeaveDelay={0.1}
                placement="bottom"
              >
                <em>批量数据{item}</em>
              </HappyTrigger>
            ))}
        </div>
      </PreviewBox>
    </>
  );
};
