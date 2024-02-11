import React from 'react';
import { Button } from 'antd';
import { HappyButton } from '@xuan/components/src/HappyButton';
import IconCopy from '@/icons/icon-copy.svg?react';
import { PerformanceBox, PreviewBox, Widget } from '@/components/Widget/Widget';
import { sleep } from '@/utils/sundries';

const rangeCount = [...Array(1000).keys()];

export default () => {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  // 性能测试
  const [happyTestVisible, setHappyTestVisible] = React.useState(false);
  const [antTestVisible, setAntTestVisible] = React.useState(false);

  return (
    <>
      <Widget>
        <label>正常：</label>
        <HappyButton>按钮</HappyButton>
      </Widget>

      <Widget>
        <label>主要：</label>
        <HappyButton type="primary">按钮</HappyButton>
      </Widget>

      <Widget>
        <label>虚线：</label>
        <HappyButton type="dashed">按钮</HappyButton>
      </Widget>

      <Widget>
        <label>链接元素：</label>
        <HappyButton buttonTagName="a">按钮</HappyButton>
      </Widget>

      <Widget>
        <label>禁用：</label>
        <HappyButton type="primary" disabled>
          Primary
        </HappyButton>

        <HappyButton disabled>
          <div>Default</div>
        </HappyButton>

        <HappyButton type="dashed" disabled>
          Dashed
        </HappyButton>

        <HappyButton disabled outline>
          outline
        </HappyButton>

        <HappyButton disabled icon={<IconCopy />}>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <label>危险按钮：</label>
        <HappyButton type="primary" danger>
          按钮
        </HappyButton>
        <HappyButton danger>按钮</HappyButton>
        <HappyButton type="dashed" danger>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <label>描边：</label>
        <HappyButton type="primary" outline>
          按钮
        </HappyButton>
        <HappyButton outline>按钮</HappyButton>
        <HappyButton type="dashed" outline>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <label>大：</label>
        <HappyButton size="large">按钮</HappyButton>
      </Widget>

      <Widget>
        <label>小：</label>
        <HappyButton size="small">按钮</HappyButton>
      </Widget>

      <Widget>
        <label>激活：</label>
        <HappyButton active>按钮</HappyButton>
        <HappyButton type="primary" active>
          按钮
        </HappyButton>
        <HappyButton type="dashed" active>
          按钮
        </HappyButton>
        <HappyButton danger active>
          按钮
        </HappyButton>
        <HappyButton type="primary" danger active>
          按钮
        </HappyButton>
        <HappyButton disabled active>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <label>加载中：</label>
        <HappyButton size="small" loading>
          按钮
        </HappyButton>
        <HappyButton loading>按钮</HappyButton>
        <HappyButton size="large" loading type="primary">
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <label>带图标：</label>

        <HappyButton
          type="primary"
          icon={<IconCopy />}
          loading={buttonLoading}
          onClick={async () => {
            setButtonLoading(true);
            await sleep(2000);
            setButtonLoading(false);
          }}
        >
          {buttonLoading ? '加载中' : '点击加载'}
        </HappyButton>
      </Widget>

      <Widget>
        <label>单图标：</label>
        <HappyButton icon={<IconCopy />} />
        <HappyButton icon={<IconCopy />} size="small" />
        <HappyButton icon={<IconCopy />} size="large" />
        <HappyButton icon={<IconCopy />} size="large" loading />
      </Widget>

      <Widget>
        <label>无边框：</label>
        <HappyButton bordered={false}>按钮</HappyButton>
        <HappyButton bordered={false} type="primary">
          按钮
        </HappyButton>
        <HappyButton icon={<IconCopy />} bordered={false} />
        <HappyButton icon={<IconCopy />} bordered={false} size="small" />
        <HappyButton icon={<IconCopy />} bordered={false} size="large" />
        <HappyButton icon={<IconCopy />} bordered={false} size="large" loading />
      </Widget>

      <Widget>
        <label>圆形：</label>
        <HappyButton size="small" shape="circle" icon={<IconCopy />} />
        <HappyButton shape="circle" icon={<IconCopy />} />
        <HappyButton size="large" shape="circle" type="primary" icon={<IconCopy />} />

        <HappyButton shape="circle" size="small" loading icon={<IconCopy />} />
        <HappyButton shape="circle" loading icon={<IconCopy />} />
        <HappyButton shape="circle" type="primary" size="large" loading icon={<IconCopy />} />
      </Widget>

      <Widget>
        <label>半圆形：</label>
        <HappyButton size="small" shape="round">
          按钮
        </HappyButton>
        <HappyButton shape="round">按钮</HappyButton>
        <HappyButton size="large" shape="round">
          按钮
        </HappyButton>

        <HappyButton size="large" shape="round" loading>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <HappyButton block type="primary">
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <HappyButton block type="primary" loading>
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <HappyButton block>按钮</HappyButton>
      </Widget>

      <Widget>
        <HappyButton block size="large">
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <HappyButton block size="small">
          按钮
        </HappyButton>
      </Widget>

      <Widget>
        <HappyButton block size="small" disabled>
          按钮
        </HappyButton>
      </Widget>

      <PreviewBox>
        <h4>1000 条数据性能测试</h4>
        <PerformanceBox>
          <HappyButton block onClick={() => setHappyTestVisible((v) => !v)}>
            HappyButton 测试
          </HappyButton>
          {happyTestVisible && rangeCount.map((item) => <HappyButton key={item}>按钮</HappyButton>)}
        </PerformanceBox>

        <PerformanceBox>
          <HappyButton block onClick={() => setAntTestVisible((v) => !v)}>
            Antd Button 测试
          </HappyButton>
          {antTestVisible && rangeCount.map((item) => <Button key={item}>按钮</Button>)}
        </PerformanceBox>
      </PreviewBox>
    </>
  );
};
