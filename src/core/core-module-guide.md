# Core 模块说明文档

## 📋 概述

Core 模块是应用的核心基础设施，提供了所有页面和组件共用的基础功能。经过重构整合，现在拥有更清晰的结构和更好的可维护性。

## 🏗️ 目录结构

```
src/core/
├── composables/           # Vue 3 组合式 API 函数
│   ├── index.ts          # 导出所有 composables
│   ├── useTheme.ts       # 主题管理（整合全局主题功能）
│   ├── useGrid.ts        # 网格布局
│   ├── useIcon.ts        # 图标系统
│   ├── useMenu.ts        # 菜单管理
│   └── usePageNavigation.ts  # 页面导航
├── router/               # 路由配置
│   └── index.ts         # 路由器配置
├── services/            # 业务服务层
│   ├── index.ts         # 导出所有服务
│   ├── PDFExportService.ts   # PDF导出服务
│   └── PageCaptureService.ts # 页面捕获服务
├── types/               # TypeScript 类型定义
│   ├── index.ts         # 导出所有类型
│   ├── components.ts    # 组件类型
│   ├── global.ts        # 全局类型
│   ├── menu.ts          # 菜单类型
│   ├── navigation.ts    # 导航类型
│   ├── pdf-export.ts    # PDF导出类型
│   └── routes.ts        # 路由类型
├── utils/               # 工具函数（按功能分类）
│   ├── index.ts         # 导出所有工具函数
│   ├── common.ts        # 通用工具函数
│   ├── config.ts        # 配置管理
│   ├── dom.ts           # DOM 操作工具
│   ├── eventBus.ts      # 事件总线
│   ├── file.ts          # 文件处理工具
│   ├── icon-registry.ts # 图标注册表
│   ├── localStorage.ts  # 本地存储工具
│   ├── path.ts          # 路径处理工具
│   ├── route-generator.ts # 路由生成器
│   └── static-icons.ts  # 静态图标管理
└── index.ts             # Core 模块主入口
```

## 🧩 模块功能详解

### 1. Composables（组合式函数）

#### useTheme
**整合后的主题管理系统**，现在包含：
- 基础主题配置和样式计算
- 全局主题状态管理
- localStorage 持久化
- 主题切换和初始化

```typescript
// 基础主题使用
const { themeConfig, themeClass, themeStyles } = useTheme('darkBusiness')

// 全局主题管理
const { currentTheme, setGlobalTheme, availableThemes } = useGlobalTheme()
```

#### useIcon
图标系统管理，支持：
- Lucide 图标动态加载
- 静态图标管理
- 批量图标操作
- 图标注册和查询

```typescript
const { iconComponent, iconExists, loading } = useIcon('Home')
const { icons, reloadAll } = useIcons(['Home', 'User', 'Settings'])
```

#### useMenu
菜单系统管理：
- 动态菜单生成
- 菜单搜索功能
- 菜单状态管理
- 路由导航集成

```typescript
const { menuConfig, activeItem, handleItemClick, searchResults } = useMenu()
```

#### usePageNavigation
页面导航功能：
- 基于配置的自动导航
- 上一页/下一页功能
- 面包屑导航
- 路由序列管理

```typescript
const { previousPage, nextPage, goToPreviousPage, goToNextPage } = usePageNavigation()
```

#### useGrid
网格布局工具：
- Tailwind CSS 网格类名计算
- 响应式网格配置
- 动态列数和间距

```typescript
const { gridClass } = useGrid(3, 'medium') // 3列，中等间距
```

### 2. Services（服务层）

#### PDFExportService
PDF导出功能：
- 单页面导出
- 批量页面导出
- 进度监控
- 任务管理

```typescript
// 导出当前页面
await pdfExportService.exportCurrentPage()

// 导出所有页面
await pdfExportService.exportAllPages(options, onProgress)
```

#### PageCaptureService
页面捕获功能：
- HTML转Canvas
- 图片优化
- 资源等待
- 多种捕获模式

```typescript
// 捕获当前页面
const canvas = await pageCaptureService.captureCurrentPage()

// 捕获指定元素
const canvas = await pageCaptureService.captureElement(element)
```

### 3. Utils（工具函数）

#### 按功能分类的工具函数：

**common.ts** - 通用工具
- `cn()` - 类名合并
- `debounce()` - 防抖
- `throttle()` - 节流
- `deepClone()` - 深拷贝
- `formatDate()` - 日期格式化

**dom.ts** - DOM 操作
- `waitForPageLoad()` - 等待页面加载
- `waitForImages()` - 等待图片加载
- `findContentElement()` - 查找内容区域
- `getPageDimensions()` - 获取页面尺寸

**file.ts** - 文件处理
- `generateFilename()` - 生成文件名
- `downloadFile()` - 下载文件
- `canvasToBlob()` - Canvas转Blob
- `optimizeCanvas()` - Canvas优化

**path.ts** - 路径处理
- `getBasePath()` - 获取基础路径
- `buildConfigUrl()` - 构建配置URL
- `buildFullPath()` - 构建完整路径
- `resolveResourcePath()` - 解析资源路径

**config.ts** - 配置管理
- `loadAppConfig()` - 加载应用配置
- `loadRouteConfig()` - 加载路由配置
- `loadIconConfig()` - 加载图标配置
- `initializeConfig()` - 初始化配置系统

### 4. Types（类型定义）

完整的 TypeScript 类型定义，包括：
- 组件接口类型
- 路由配置类型
- 菜单和导航类型
- PDF导出相关类型
- 全局应用类型

## 🚀 使用指南

### 快速开始

```typescript
// 1. 导入整个 core 模块
import { useTheme, useIcon, pdfExportService } from '@/core'

// 2. 或者导入特定模块
import { useTheme } from '@/core/composables'
import { buildFullPath } from '@/core/utils'

// 3. 在组件中使用
export default {
  setup() {
    const { themeClass, themeStyles } = useTheme()
    const { iconComponent } = useIcon('Home')
    
    return {
      themeClass,
      themeStyles,
      iconComponent
    }
  }
}
```

### 配置系统使用

```typescript
// 初始化配置（应用启动时）
import { initializeConfig } from '@/core'
await initializeConfig()

// 访问配置
import { appConfig, routeConfigs } from '@/core'
console.log(appConfig.value.app.title)
console.log(routeConfigs.value)
```

### 主题系统使用

```typescript
// 全局主题管理
import { useGlobalTheme, setGlobalTheme } from '@/core'

const { currentTheme, availableThemes } = useGlobalTheme()

// 切换主题
setGlobalTheme('darkBusiness')

// 组件级主题
const { themeStyles } = useTheme('lightModern')
```

## 🔧 扩展指南

### 添加新的 Composable

1. 在 `composables/` 目录创建新文件
2. 在 `composables/index.ts` 中导出
3. 在主 `index.ts` 中添加快捷导出（可选）

### 添加新的工具函数

1. 根据功能选择合适的文件（common/dom/file/path等）
2. 或创建新的分类文件
3. 在 `utils/index.ts` 中导出

### 添加新的服务

1. 在 `services/` 目录创建服务类
2. 在 `services/index.ts` 中导出
3. 创建单例实例供外部使用

## 📝 注意事项

1. **导入路径**：优先使用 `@/core` 统一导入，避免深层路径
2. **类型安全**：所有公共接口都有完整的 TypeScript 类型定义
3. **性能优化**：大部分功能支持懒加载和缓存
4. **向后兼容**：重构过程中保持了 API 的向后兼容性

## 🐛 常见问题

### Q: 如何添加新的主题？
A: 在 `public/config/themes.yaml` 中添加主题配置，系统会自动加载。

### Q: 图标不显示怎么办？
A: 检查图标是否在 `public/config/icons.config.yaml` 中配置，或使用 `hasIcon()` 检查。

### Q: 配置文件修改后不生效？
A: 使用 `reloadAllConfigs()` 重新加载配置，或清除浏览器缓存。

## 🔄 更新日志

### v2.0.0 (当前版本)
- 重构整合 core 模块
- 合并重复功能（useTheme + useGlobalTheme）
- 优化目录结构，按功能分类
- 完善工具函数分类
- 添加统一的导出接口
- 完善类型定义和文档

### v1.x
- 基础功能实现
- 分散的模块结构