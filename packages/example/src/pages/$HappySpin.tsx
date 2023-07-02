import React from 'react';
import styled from 'styled-components';
import { HappySpin } from '@xuan/components/src/HappySpin';
import { Widget } from '@/components/Widget/Widget';

const iconReload = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path d="M28.41 6.54l-1.764 1.38c-2.419-3.082-6.144-5.044-10.327-5.044-0.003 0-0.006 0-0.009 0h0c-0.002 0-0.004 0-0.006 0-7.241 0-13.111 5.868-13.116 13.108v0c0 0.007-0 0.014-0 0.022 0 7.247 5.875 13.122 13.122 13.122 5.636 0 10.442-3.553 12.3-8.542l0.030-0.091c0.009-0.025 0.015-0.054 0.015-0.084 0-0.108-0.069-0.2-0.165-0.235l-0.002-0.001-1.772-0.61c-0.024-0.009-0.052-0.014-0.081-0.014-0.107 0-0.198 0.067-0.234 0.162l-0.001 0.002c-0.568 1.518-1.415 2.814-2.488 3.884l-0 0c-1.935 1.946-4.614 3.15-7.574 3.15-0.008 0-0.016 0-0.023-0h0.001c-0.009 0-0.019 0-0.029 0-2.959 0-5.636-1.204-7.568-3.149l-0.001-0.001c-1.943-1.936-3.146-4.615-3.146-7.575 0-0.010 0-0.021 0-0.031v0.002c-0-0.008-0-0.017-0-0.026 0-2.96 1.203-5.639 3.146-7.575l0-0c1.935-1.946 4.614-3.15 7.574-3.15 0.008 0 0.016 0 0.023 0h-0.001c0.009-0 0.020-0 0.031-0 2.959 0 5.636 1.204 7.568 3.149l0.001 0.001c0.308 0.31 0.6 0.638 0.868 0.98l-1.882 1.47c-0.059 0.046-0.096 0.117-0.096 0.197 0 0.117 0.080 0.215 0.189 0.242l0.002 0 5.488 1.344c0.017 0.004 0.037 0.007 0.058 0.007 0.137 0 0.248-0.11 0.25-0.247v-0l0.026-5.654c-0.003-0.137-0.115-0.247-0.252-0.247-0.058 0-0.112 0.020-0.155 0.053l0.001-0z"></path>
  </svg>
);

const SpinWrapBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-color: whitesmoke;
`;

export default () => {
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
        <HappySpin size="small" indicator={iconReload} />
        <HappySpin indicator={iconReload} />
        <HappySpin size="large" indicator={iconReload} />
      </Widget>

      <Widget>
        <label>自定义描述：</label>
        <HappySpin size="small" indicator={iconReload} tip="加载中" />
        <HappySpin indicator={iconReload} tip="加载中" />
        <HappySpin size="large" indicator={iconReload} tip="加载中" />
      </Widget>

      <Widget>
        <label>填充：</label>
        <SpinWrapBox>
          <HappySpin indicator={iconReload} full tip="加载中" />
        </SpinWrapBox>
      </Widget>

      <Widget>
        <label>有数据：</label>
        <SpinWrapBox>
          <div>不共春风斗百芳</div>
          <div>自甘篱落傲秋霜</div>
          <HappySpin full />
        </SpinWrapBox>
      </Widget>
    </>
  );
};
