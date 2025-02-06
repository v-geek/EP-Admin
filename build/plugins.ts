import { resolve } from 'path'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { viteBuildInfo } from './info'

export const getPlugins = (viteEnv: ViteEnv): PluginOption[] => {
  const { VITE_TITLE, VITE_OPEN_GZIP } = viteEnv
  return [
    vue(),
    vueJsx(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    // 加载SVG文件作为Vue组件
    svgLoader(),
    viteBuildInfo(),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_TITLE }
      }
    }),
    // 优化 首屏加载慢 等用户体验, 配置 Nginx 即可
    VITE_OPEN_GZIP &&
      viteCompression({
        deleteOriginFile: false, // 压缩后是否删除源文件
        threshold: 10240, // 体积大于 threshold 才会被压缩, 单位b  10kb
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 生成的压缩后缀
      }),
    webUpdateNotice({
      logVersion: true,
      versionType: 'build_timestamp',
      notificationProps: {
        title: 'pear-ep-admin',
        description: '检测到新版本',
        buttonText: '刷新',
        dismissButtonText: '忽略'
      }
    })
  ]
}
