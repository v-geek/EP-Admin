import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import { resolve } from 'path'
import { formatEnv, __APP_INFO__ } from './build/utils'
import { getPlugins } from './build/plugins'
import { include, exclude } from './build/optimize'

const pathSrc = resolve(__dirname, 'src')

// https://cn.vitejs.dev/config/#conditional-config
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 加载 envDir 中的 .env 文件, 默认情况下只有前缀为 VITE_ 的会被加载
  const env = loadEnv(mode, process.cwd())

  // 获取当前运行模式的环境变量对象, Val 是字符串, 因此需要处理一下
  // 直接使用 import.meta.env 来获取环境变量的话, 可以在Vue文件中获取(也有数据类型的问题), 但是无法在此文件中获取
  const viteEnv = formatEnv(env)

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    server: {
      open: true, // 自动开启窗口
      host: true, // 监听本地所有IP
      port: viteEnv.VITE_PORT,
      proxy: {
        [env.VITE_BASE_URL]: {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(env.VITE_BASE_URL, '')
        }
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*']
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/variable.scss" as *;
            @use "@/styles/mixin.scss" as *;
          `
        }
      }
    },
    plugins: getPlugins(viteEnv),
    // 解决 Vite 启动完之后首页加载慢的问题
    optimizeDeps: {
      include, // 启动时 预加载这些包
      exclude
    },
    build: {
      // 关闭source-map 减小打包后的文件体积
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      // esbuild 打包更快, 但是不能去除 console.log
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // 静态资源分类和打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
}
