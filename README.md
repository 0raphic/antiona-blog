# Antiona 的小站

> 一个记录嵌入式、ACG 与日常碎片的个人小站。<br>
> 基于开源主题 [astro-koharu](https://github.com/cosZone/astro-koharu) 改造，主色调整为蓝色，并重新设计了品牌标识。

[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-2f7cf6.svg)](./LICENSE)
[![Astro](https://img.shields.io/badge/Astro-7.x-2f7cf6.svg)](https://astro.build/)
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-strict-2f7cf6.svg)](https://www.typescriptlang.org/)

## 关于这个版本

这个仓库是 [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu) 的定制分支，当前改动包括：

- **蓝色主题**：浅色模式为晴空蓝，深色模式为深海蓝；按钮、阴影、评论组件、目录花瓣、404 插画等装饰色同步调整。
- **新品牌资产**：重绘 `logo.svg` 与 `favicon`，并补齐 SVG / ICO / Apple Touch 三种标签页图标。
- **离开标签页提示**：切到其他标签页时标题变为提示语，回来后恢复原标题，站内跳转后也能正确同步。
- **清理示例内容**：删除上游全部示例文章，以及首页精选分类、示例周刊系列和对应导航入口。
- **开源合规**：保留 AGPL-3.0 许可证，新增 [NOTICE](./NOTICE) 说明上游来源、修改内容与字体授权。
- 所有代码中的定制改动都用 `[蓝调主题]`、`[品牌资产]`、`[标签页提示]`、`[示例清理]`、`[开源合规]` 注释标出，便于和上游对比。

## 感谢原作者

特别感谢 **cosZone（cosine）** 创作并开源了 [astro-koharu](https://github.com/cosZone/astro-koharu)。

这个项目从布局、组件、内容系统到构建脚本，绝大部分工作都来自原作者和上游贡献者。没有他们的持续维护与 AGPL 开源，就没有这个站点。也感谢 [Shoka](https://github.com/amehime/hexo-theme-shoka) 主题在视觉与交互上给予的灵感。

- 原作者博客：<https://blog.cosine.ren/>
- 上游仓库：<https://github.com/cosZone/astro-koharu>
- 上游问题反馈：<https://github.com/cosZone/astro-koharu/issues>

如果你喜欢这套主题，请优先给上游项目一个 Star。

## 技术栈

- **框架**：[Astro 7](https://astro.build/) + React 岛屿组件
- **样式**：[Tailwind CSS 4](https://tailwindcss.com/)，shadcn/ui 风格变量
- **内容**：Astro Content Collections（Markdown / MDX）
- **搜索**：[Pagefind](https://pagefind.app/) 静态全文搜索
- **状态**：Nanostores
- **动画**：Motion
- **工具链**：pnpm、Biome、TypeScript、Node.js Test Runner

## 本地开发

环境要求：Node.js ≥ 22.20.0，pnpm 10.28.2。

```bash
git clone https://github.com/0raphic/antiona-blog.git
cd antiona-blog
pnpm install
pnpm dev
```

开发服务器默认运行在 <http://localhost:4321>。

常用命令：

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建产物 |
| `pnpm check` | Astro / TypeScript 类型检查 |
| `pnpm lint` | Biome 检查与格式校验 |
| `pnpm lint:fix` | 自动修复可修复的 lint 问题 |
| `pnpm test` | 运行全部 node:test 测试 |
| `pnpm koharu` | 打开主题自带的交互式 CLI |

## 站点配置

主要配置在 [`config/site.yaml`](./config/site.yaml)：

- 站点名称、作者、域名、头像、建站年份
- 导航、社交链接、音乐、Bangumi、评论系统
- 首页精选分类与精选系列
- 页脚、公告、写作室等功能开关

配置在构建时读取，修改后请重启开发服务器或重新构建。多语言文案与分类译名在 [`config/i18n-content.yaml`](./config/i18n-content.yaml)。

> 示例文章已全部删除，`src/content/blog/` 目前为空。写新文章时直接在该目录下创建 `.md` / `.mdx` 文件，按内容集合的 frontmatter 结构填写标题、日期、分类等字段即可。没有文章时首页会显示空状态，不会报错。

## 主题与品牌资产

| 内容 | 位置 |
| --- | --- |
| 浅色 / 深色设计变量 | [`src/styles/theme/shadcn.css`](./src/styles/theme/shadcn.css) |
| 背景、渐变、按钮色 | [`src/styles/theme/index.css`](./src/styles/theme/index.css) |
| 站点字标 | [`src/assets/svg/logo.svg`](./src/assets/svg/logo.svg) |
| 标签页图标 | [`public/favicon.svg`](./public/favicon.svg)、`public/favicon.ico`、`public/apple-touch-icon.png` |
| 离开标签页标题 | [`src/lib/tab-title.ts`](./src/lib/tab-title.ts) |
| 页头图标引用 | [`src/layouts/HeadMeta.astro`](./src/layouts/HeadMeta.astro) |

字标中的 “Antiona” 已转为轮廓路径，运行时不依赖外部字体；字形来自 [Quicksand](https://fonts.google.com/specimen/Quicksand)，遵循 SIL Open Font License 1.1，授权说明见 [NOTICE](./NOTICE)。

## 部署

```bash
pnpm build
pnpm preview   # 本地检查 dist/
```

构建产物是纯静态文件，可部署到任意静态托管（Cloudflare Pages、Vercel、Netlify、GitHub Pages 或自己的服务器）。若使用站点地图、RSS 与 canonical URL，请先在 `config/site.yaml` 中把 `url` 改成实际域名。

## 目录结构

```text
src/
├── components/   # Astro / React 组件
├── content/      # 内容集合（blog/ 目前为空）
├── features/     # 写作室等功能模块
├── i18n/         # 多语言文案
├── layouts/      # 页面布局与 head
├── lib/          # 纯函数与浏览器侧模块
├── pages/        # 文件路由
├── styles/       # 主题、组件与全局样式
└── constants/    # 站点配置与设计 token
config/           # site.yaml、i18n-content.yaml
public/           # favicon、图片、字体等静态资源
scripts/          # 构建与维护脚本
```

## 许可证与开源合规

本项目沿用上游的 **GNU Affero General Public License v3.0（AGPL-3.0）**，完整条款见 [LICENSE](./LICENSE)。

- 原始项目：<https://github.com/cosZone/astro-koharu>
- 原始作者：cosZone（cosine）及 astro-koharu 贡献者
- 本分支源码：<https://github.com/0raphic/antiona-blog>
- 修改说明、版权归属与第三方字体授权：[NOTICE](./NOTICE)

AGPL 要求：如果你修改本项目并通过网络向用户提供服务，需要向用户提供对应的完整源代码。部署本站时请保留 `LICENSE`、`NOTICE` 与源码链接，并继续以 AGPL-3.0 发布衍生作品。

---

如果这个蓝色版本恰好也对你有用，欢迎参考；主题本身的问题请反馈给上游，定制部分的问题可以提到本仓库的 Issue。