import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  npmClient: 'yarn',
  antd: {},
  model: {},
  routes,
  mfsu: { shared: { react: { singleton: true } } },
  locale: { default: 'zh-CN', antd: true },
  hash: true,
  title: '静态测试',
  runtimePublicPath: {},
  publicPath: './',
  exportStatic: {},
});
