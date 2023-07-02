import React from 'react';
import styled from 'styled-components';
import { HappyDialog } from '@xuan/components/src/HappyDialog';
import { HappyModal, useHappyModal } from '@xuan/components/src/HappyModal';
import { confirm } from '@xuan/components/src/confirm';
import { HappyButton } from '@xuan/components/src/HappyButton';
import { Widget } from '@/components/Widget/Widget';
import { sleep } from '@/utils/sundries';

const ModalContent = styled.div`
  padding: 20px;
`;

const longContent = [...Array(50).keys()].map((n) => <div key={n}>内容{n}</div>);

// eslint-disable-next-line max-lines-per-function
export default () => {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [modal4, setModal4] = React.useState(false);
  const [modal5, setModal5] = React.useState(false);
  const [modal6, setModal6] = React.useState(false);
  const [modal7, setModal7] = React.useState(false);
  const [modal8, setModal8] = React.useState(false);
  const [modal9, setModal9] = React.useState(false);
  const [modal10, setModal10] = React.useState(false);
  const [modal11, setModal11] = React.useState(false);
  const [modal12, setModal12] = React.useState(false);
  const [modal13, setModal13] = React.useState(false);
  const [modal14, setModal14] = React.useState(false);
  const [counter, increment] = React.useReducer((c) => c + 1, 0);

  const [modal, holderElement] = useHappyModal();

  const content1 = (
    <ModalContent>
      <div>点击次数：{counter}</div>
      <HappyButton onClick={increment}>增加</HappyButton>
    </ModalContent>
  );

  return (
    <>
      <h2>HappyDialog 基础弹窗</h2>
      <Widget>
        <label>基本：</label>
        <HappyButton onClick={() => setModal1(true)}>点击</HappyButton>
        <HappyDialog
          visible={modal1}
          onCancel={() => setModal1(false)}
          afterOpen={() => {
            // eslint-disable-next-line no-console
            console.log('open');
          }}
          afterClose={() => {
            // eslint-disable-next-line no-console
            console.log('close');
          }}
        >
          {content1}
        </HappyDialog>
      </Widget>

      <Widget>
        <label>上下居中：</label>
        <HappyButton onClick={() => setModal2(true)}>点击</HappyButton>

        <HappyDialog centered visible={modal2} onCancel={() => setModal2(false)}>
          <ModalContent>
            <HappyButton onClick={() => setModal3(true)}>弹窗3</HappyButton>
          </ModalContent>
        </HappyDialog>
      </Widget>

      <Widget>
        <label>关闭后不卸载：</label>
        <HappyButton onClick={() => setModal3(true)}>点击</HappyButton>

        <HappyDialog
          centered
          visible={modal3}
          onCancel={() => setModal3(false)}
          destroyOnClose={false}
        >
          {content1}
        </HappyDialog>
      </Widget>

      <h2>HappyModal 基本弹窗</h2>

      <Widget>
        <label>基本：</label>
        <HappyButton onClick={() => setModal4(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          visible={modal4}
          onCancel={() => setModal4(false)}
          onOk={() => setModal4(false)}
          okButtonProps={{ type: 'primary', disabled: true }}
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>无标题：</label>
        <HappyButton onClick={() => setModal5(true)}>点击</HappyButton>
        <HappyModal
          visible={modal5}
          onCancel={() => setModal5(false)}
          onOk={() => setModal5(false)}
          destroyOnClose
          okButtonProps={{ type: 'primary', danger: true }}
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>上下居中：</label>
        <HappyButton onClick={() => setModal6(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal6}
          onCancel={() => setModal6(false)}
          onOk={() => setModal6(false)}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>无 Footer：</label>
        <HappyButton onClick={() => setModal7(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal7}
          onCancel={() => setModal7(false)}
          onOk={() => setModal7(false)}
          footer={null}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>无阴影：</label>
        <HappyButton onClick={() => setModal8(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          visible={modal8}
          onCancel={() => setModal8(false)}
          onOk={() => setModal8(false)}
          mask={false}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>阴影禁点击：</label>
        <HappyButton onClick={() => setModal9(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal9}
          onCancel={() => setModal9(false)}
          onOk={() => setModal9(false)}
          maskClosable={false}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>禁用关闭按钮：</label>
        <HappyButton onClick={() => setModal10(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal10}
          onCancel={() => setModal10(false)}
          onOk={() => setModal10(false)}
          maskClosable={false}
          closable={false}
          keyboard={false}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>无关闭图标：</label>
        <HappyButton onClick={() => setModal11(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal11}
          onCancel={() => setModal11(false)}
          onOk={() => setModal11(false)}
          closable={false}
          destroyOnClose
        >
          基本内容
        </HappyModal>
      </Widget>

      <Widget>
        <label>确认中：</label>
        <HappyButton onClick={() => setModal12(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          visible={modal12}
          onCancel={() => setModal12(false)}
          onOk={() => setModal12(false)}
          confirmLoading
          destroyOnClose
        >
          <div>基本内容</div>
        </HappyModal>
      </Widget>

      <Widget>
        <label>居中超长：</label>
        <HappyButton onClick={() => setModal13(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          centered
          width={800}
          visible={modal13}
          onCancel={() => setModal13(false)}
          onOk={() => setModal13(false)}
          destroyOnClose
        >
          {longContent}
        </HappyModal>
      </Widget>

      <Widget>
        <label>超长滚动：</label>
        <HappyButton onClick={() => setModal14(true)}>点击</HappyButton>
        <HappyModal
          title="系统弹窗"
          visible={modal14}
          onCancel={() => setModal14(false)}
          onOk={() => setModal14(false)}
          destroyOnClose
        >
          {longContent}
        </HappyModal>
      </Widget>

      <h2>confirm 确认框</h2>

      <Widget>
        <label>基本：</label>
        <HappyButton
          onClick={() => {
            confirm({
              title: '系统提示',
              content: <div>确认内容</div>,
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>异步确认：</label>
        <HappyButton
          onClick={() => {
            confirm({
              title: <div>点击确定等待2秒</div>,
              async onOk() {
                await sleep(2000);
              },
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>确认中：</label>
        <HappyButton
          onClick={() => {
            confirm({
              title: <div>确认中</div>,
              confirmLoading: true,
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>极简：</label>
        <HappyButton
          onClick={() => {
            confirm({
              icon: null,
              footer: null,
              content: <div>我是一个粉刷匠</div>,
              bodyStyle: {
                padding: 0,
              },
              centered: true,
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>触发关闭：</label>
        <HappyButton
          onClick={() => {
            const confirm1 = confirm({
              content: (
                <div>
                  <h3>我是一个粉刷匠😂</h3>
                  <HappyButton onClick={() => confirm1.close()}>关闭弹窗</HappyButton>
                </div>
              ),
              centered: true,
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>自定义按钮：</label>
        <HappyButton
          onClick={() => {
            const confirm1 = confirm({
              title: '确定',
              content: '我是一个粉刷匠',
              centered: true,
              footer({ cancelButton, okButton }) {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <HappyButton onClick={() => confirm1.close()}>不保存</HappyButton>

                    <span>
                      {cancelButton}
                      {okButton}
                    </span>
                  </div>
                );
              },
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <h2>useModal 弹窗</h2>
      {holderElement}

      <Widget>
        <label>基本：</label>
        <HappyButton
          onClick={() => {
            modal.open({
              title: '我是一个粉刷匠',
              content: <div>粉刷本领强</div>,
              centered: true,
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>

      <Widget>
        <label>confirm：</label>
        <HappyButton
          onClick={() => {
            const confirm1 = modal.confirm({
              content: (
                <div>
                  <h3>我是一个粉刷匠</h3>
                  <HappyButton
                    onClick={() => {
                      confirm1.close();
                      modal.confirm({
                        title: '粉刷本领强！',
                      });
                    }}
                  >
                    再次确认
                  </HappyButton>
                </div>
              ),
              centered: true,
              okButtonProps: {
                danger: true,
              },
            });
          }}
        >
          点击
        </HappyButton>
      </Widget>
    </>
  );
};
