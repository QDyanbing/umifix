import { defineConfig } from 'umi';
import proxy from './proxy';

export default defineConfig({
  runtimePublicPath: {},
  proxy,
});
