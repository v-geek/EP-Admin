## pear-ep-admin

#### 简介

`pear-ep-admin` 是一款开源免费的中后台管理系统模版, 使用最新的 `Vue3`、`Vite`、`Ts`、`element-plus`、`Pinia`、`tailwindcss` 等主流技术开发

#### 在线预览地址

[点我预览](https://pear1958.github.io/pear-ep-admin)

#### 登录相关

- 开发中...
- 账号: admin
- 密码: 123456

- 说明: lint-staged v15 版本需要 Node大于18.12.0 https://github.com/lint-staged/lint-staged

<!-- #### 项目截图

- 正在开发中...
<p align="center">
  <img alt="pear-ep-admin" width="100%" src="https://github.com/pear-ep-admin/blob/master/src/assets/readme/admin-1.png">
  <img alt="pear-ep-admin" width="100%" src="https://github.com/pear-ep-admin/blob/master/src/assets/readme/admin-2.png">
  <img alt="pear-ep-admin" width="100%" src="https://github.com/pear-ep-admin/blob/master/src/assets/readme/admin-3.png">
  <img alt="pear-ep-admin" width="100%" src="https://github.com/pear-ep-admin/blob/master/src/assets/readme/admin-4.png">
  <img alt="pear-ep-admin" width="100%" src="https://github.com/pear-ep-admin/blob/master/src/assets/readme/admin-5.png">
</p> -->

#### 安装使用

- 获取项目代码

```
git clone git@github.com:pear1958/pear-ep-admin.git
```

- 安装依赖

```
cd pear-ep-admin
pnpm install
```

- 运行

```
新建 .env.development 文件
cp .env.development.default -> .env.development
pnpm run dev
```

- 打包

```
pnpm run build:pro
```

#### 注意事项

- 使用keep-alive记得 页面name(默认为文件名) 与route.name配置的一样
- 所有 El组件 采用按需导入, 如有需要请到 /src/plugins/elementPlus.ts 添加导入

#### todo-list

- [ ] 多种布局模式
- [ ] 页脚, 侧边栏反转色, 头部反转色
- [ ] 集成 埋点, 错误上报
- [ ] 集成 多种登录方式
- [ ] 集成 ESLint StyleLint
- [ ] 暗黑模式 变量使用方式 优化

#### 支持

如果觉得本项目还不错或在工作中有所启发，请在 Github 帮助开发者点亮星星，这是对开发者最大的支持和鼓励！
