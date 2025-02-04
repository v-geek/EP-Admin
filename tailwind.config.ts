/** @type {import('tailwindcss').Config} */
export default {
  // 不在 content 包括的文件内, 你编写的 class, 是不会生成对应的css工具类的
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  // 取消 TailwindCSS 内置的全局样式
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      // 添加颜色  eg: text-primary
      colors: {
        'dark-1': '#1f1f1f', // eg: 外层菜单暗黑色
        'dark-2': '#141414', // eg: 布局区域暗黑色
        primary: 'var(--el-color-primary)',
        'base-color': 'var(--el-text-color-primary)'
      }
    }
  },
  plugins: []
}
