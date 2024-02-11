import antdEnUS from 'antd/es/locale/en_US';
import antdZhCN from 'antd/es/locale/zh_CN';
import antdZhTW from 'antd/es/locale/zh_TW';

export const locales = {
  'zh-cn': {
    antd: antdZhCN,
  },
  'zh-tw': {
    antd: antdZhTW,
  },
  en: {
    antd: antdEnUS,
  },
};

export const dynamicActivateFrom = (locale: string) => import(`./locales/${locale}/messages.ts`);
