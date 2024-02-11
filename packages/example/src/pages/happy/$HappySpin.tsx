import React from 'react';
import { Spin } from 'antd';
import { HappySpin } from '@xuan/components/src/HappySpin';
import { HappyButton } from '@xuan/components/src/HappyButton';
import IconReload from '@/icons/icon-reload.svg?react';
import { PerformanceBox, PreviewBox, Widget } from '@/components/Widget/Widget';

const rangeCount = [...Array(1000).keys()];

export default () => {
  const [visible1, setVisible1] = React.useState(false);

  // 性能测试
  const [happyTestVisible, setHappyTestVisible] = React.useState(false);
  const [antTestVisible, setAntTestVisible] = React.useState(false);

  return (
    <>
      <Widget>
        <label>正常：</label>
        <HappySpin />
      </Widget>

      <Widget>
        <label>尺寸：</label>
        <HappySpin size="small" />
        <HappySpin />
        <HappySpin size="large" />
      </Widget>

      <Widget>
        <label>自定义指示符：</label>
        <HappySpin size="small" indicator={<IconReload />} />
        <HappySpin indicator={<IconReload />} />
        <HappySpin size="large" indicator={<IconReload />} />
      </Widget>

      <Widget>
        <label>自定义描述：</label>
        <HappySpin size="small" indicator={<IconReload />} tip="加载中" />
        <HappySpin indicator={<IconReload />} tip="加载中" />
        <HappySpin size="large" indicator={<IconReload />} tip="加载中" />
      </Widget>

      <Widget>
        <label>填充：</label>
        <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center bg-slate-50">
          <HappySpin indicator={<IconReload />} full tip="加载中" />
        </div>
      </Widget>

      <Widget>
        <label>有数据：</label>
        <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center bg-slate-50">
          <div>不共春风斗百芳</div>
          <div>自甘篱落傲秋霜</div>
          <HappySpin full />
        </div>
      </Widget>

      <Widget>
        <label>delay：</label>
        <div className="flex items-center gap-2.5">
          <HappyButton onClick={() => setVisible1((prev) => !prev)}>切换</HappyButton>
          <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center bg-slate-50">
            {visible1 && <HappySpin indicator={<IconReload />} full tip="加载中" delay={1000} />}
          </div>
        </div>
      </Widget>

      <PreviewBox>
        <h4>1000 条数据性能测试</h4>

        <PerformanceBox>
          <HappyButton block onClick={() => setHappyTestVisible((v) => !v)}>
            HappyButton 测试
          </HappyButton>
          {happyTestVisible && rangeCount.map((item) => <HappySpin key={item} />)}
        </PerformanceBox>

        <PerformanceBox>
          <HappyButton block onClick={() => setAntTestVisible((v) => !v)}>
            Antd Button 测试
          </HappyButton>
          {antTestVisible && rangeCount.map((item) => <Spin key={item} />)}
        </PerformanceBox>
      </PreviewBox>
    </>
  );
};
