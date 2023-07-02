import React from 'react';
import { HappyButton } from '@xuan/components/src/HappyButton';
import { Widget } from '@/components/Widget/Widget';
import { sleep } from '@/utils/sundries';

const iconCopy = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
    <path fill="currentColor" d="M26 2h-16.75c-0.138 0-0.25 0.112-0.25 0.25v0 1.75c0 0.138 0.112 0.25 0.25 0.25h15.5v21.5c0 0.138 0.112 0.25 0.25 0.25h1.75c0.138 0 0.25-0.112 0.25-0.25v0-22.75c0-0.552-0.448-1-1-1v0zM22 6h-16c-0.552 0-1 0.448-1 1v0 16.584c0.001 0.276 0.113 0.525 0.294 0.706l5.416 5.416c0.067 0.066 0.142 0.123 0.225 0.169l0.005 0.003v0.060h0.132c0.11 0.040 0.224 0.062 0.344 0.062h10.584c0.552 0 1-0.448 1-1v0-22c0-0.552-0.448-1-1-1v0zM10.938 26.756l-2.692-2.694h2.694v2.694zM20.75 27.75h-7.812v-4.438c0-0.69-0.56-1.25-1.25-1.25v0h-4.438v-13.812h13.5v19.5z"></path>
  </svg>
);

export default () => {
  const [buttonLoading, setButtonLoading] = React.useState(false);

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

        <HappyButton disabled icon={iconCopy}>
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
          icon={iconCopy}
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
        <HappyButton icon={iconCopy} />
        <HappyButton icon={iconCopy} size="small" />
        <HappyButton icon={iconCopy} size="large" />
        <HappyButton icon={iconCopy} size="large" loading />
      </Widget>

      <Widget>
        <label>无边框：</label>
        <HappyButton bordered={false}>按钮</HappyButton>
        <HappyButton bordered={false} type="primary">
          按钮
        </HappyButton>
        <HappyButton icon={iconCopy} bordered={false} />
        <HappyButton icon={iconCopy} bordered={false} size="small" />
        <HappyButton icon={iconCopy} bordered={false} size="large" />
        <HappyButton icon={iconCopy} bordered={false} size="large" loading />
      </Widget>

      <Widget>
        <label>圆形：</label>
        <HappyButton size="small" shape="circle" icon={iconCopy} />
        <HappyButton shape="circle" icon={iconCopy} />
        <HappyButton size="large" shape="circle" type="primary" icon={iconCopy} />

        <HappyButton shape="circle" size="small" loading icon={iconCopy} />
        <HappyButton shape="circle" loading icon={iconCopy} />
        <HappyButton shape="circle" type="primary" size="large" loading icon={iconCopy} />
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
    </>
  );
};
