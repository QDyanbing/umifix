import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'yarn',
  antd: {},
  model: {},
  routes: [{ path: '/', component: './TestPage' }],
  mfsu: { shared: { react: { singleton: true } } },
  locale: { default: 'zh-CN', antd: true },
  hash: true,
  title: '静态测试',
  runtimePublicPath: {},
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  exportStatic: {},
});
