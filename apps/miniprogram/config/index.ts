import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'londy-play-home',
  date: '2026-10-17',
  designWidth: 750,
  deviceRatio: { 640: 2.34, 750: 1, 828: 1.81 },
  sourceRoot: 'src',
  outputRoot: process.env.TARO_OUTPUT_ROOT || 'dist',
  framework: 'react',
  plugins: ['@tarojs/plugin-framework-react'],
  compiler: { type: 'webpack5', prebundle: { enable: false } },
  mini: { postcss: { pxtransform: { enable: true }, cssModules: { enable: false } } },
  h5: { publicPath: '/', staticDirectory: 'static' }
})
