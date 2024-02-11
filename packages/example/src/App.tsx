import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import useLoad from '@/hooks/useLoad';
import { PageRoutes } from './routes';
import { dynamicActivateFrom, locales } from './i18n';
import 'antd/dist/antd.less';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import './App.less';

const defaultLocale = 'zh-cn';

const activePromise = dynamicActivateFrom(defaultLocale).then((locale) => {
  i18n.load(defaultLocale, locale.messages);
  i18n.activate(defaultLocale);
});

function App() {
  const [loading] = useLoad(() => activePromise);

  if (loading !== false) {
    return null;
  }

  return (
    <BrowserRouter>
      <I18nProvider i18n={i18n}>
        <ConfigProvider locale={locales[defaultLocale]?.antd}>
          <PageRoutes />
        </ConfigProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;
