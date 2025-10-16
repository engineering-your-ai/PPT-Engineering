# TableOfContents 目录组件使用说明

## 组件概述

`TableOfContents` 是一个功能丰富的目录组件，可以自动从路由配置中获取模块信息生成目录，也支持自定义目录项。该组件完全集成了项目的主题系统，支持多种序号格式和布局选项。

## 主要特性

- ✅ **自动路由获取**：从 `routes.config.yaml` 自动获取模块信息
- ✅ **多种序号格式**：支持数字、章节、小节和自定义格式
- ✅ **主题集成**：完全集成项目主题系统
- ✅ **响应式布局**：支持单列和双列布局
- ✅ **可点击导航**：支持点击跳转到对应页面
- ✅ **高度可定制**：支持自定义目录项、排除特定路由等

## 使用方式

### 基础用法

```vue
<template>
  <TableOfContents
    title="目录"
    subtitle="点击章节可快速跳转"
    number-format="chapter"
    :clickable="true"
  />
</template>
```

### 高级用法

```vue
<template>
  <TableOfContents
    title="内容导览"
    subtitle="点击章节可快速跳转到对应页面"
    :number-format="numberFormat"
    :custom-format="customFormat"
    :show-dots="true"
    :clickable="true"
    :two-column="true"
    :column-breakpoint="6"
    :exclude-routes="['home', 'endpage']"
    theme="white"
  />
</template>

<script setup>
import { ref } from 'vue'

const numberFormat = ref('chapter')
const customFormat = ref('第{n}部分')
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `theme` | `CustomTheme` | - | 自定义配色主题 |
| `title` | `string` | `'目录'` | 目录标题 |
| `subtitle` | `string` | - | 目录副标题 |
| `numberFormat` | `NumberFormat` | `'numeric'` | 序号格式：`numeric` \| `chapter` \| `section` \| `custom` |
| `customFormat` | `string` | `'第{n}项'` | 自定义序号格式模板，`{n}` 为序号占位符 |
| `showPageNumbers` | `boolean` | `false` | 是否显示页码 |
| `showDots` | `boolean` | `true` | 是否显示装饰点线 |
| `clickable` | `boolean` | `true` | 是否可点击跳转 |
| `twoColumn` | `boolean` | `false` | 是否启用两列布局 |
| `columnBreakpoint` | `number` | `8` | 两列布局的分割点 |
| `customItems` | `TOCItem[]` | - | 自定义目录项 |
| `excludeRoutes` | `string[]` | `['home', 'endpage']` | 排除的路由名称数组 |

## 序号格式

### 内置格式

- `numeric`: 1, 2, 3, 4...
- `chapter`: 第1章, 第2章, 第3章...
- `section`: 第1节, 第2节, 第3节...

### 自定义格式

使用 `custom` 格式时，可以通过 `customFormat` 属性自定义格式：

```vue
<TableOfContents
  number-format="custom"
  custom-format="Part {n}"
/>
<!-- 输出：Part 1, Part 2, Part 3... -->

<TableOfContents
  number-format="custom"
  custom-format="模块{n}"
/>
<!-- 输出：模块1, 模块2, 模块3... -->
```

## 自定义目录项

如果不想从路由配置自动获取，可以提供自定义目录项：

```vue
<template>
  <TableOfContents
    :custom-items="customItems"
    number-format="chapter"
  />
</template>

<script setup>
const customItems = [
  {
    id: 'intro',
    title: '项目介绍',
    path: '/intro',
    icon: 'Info'
  },
  {
    id: 'guide',
    title: '使用指南',
    path: '/guide',
    icon: 'Book'
  }
]
</script>
```

## 主题集成

组件完全集成了项目的主题系统，支持所有已配置的主题：

```vue
<!-- 使用特定主题 -->
<TableOfContents theme="darkBusiness" />

<!-- 使用全局主题 -->
<TableOfContents />
```

## 布局选项

### 单列布局（默认）

```vue
<TableOfContents :two-column="false" />
```

### 双列布局

```vue
<TableOfContents 
  :two-column="true" 
  :column-breakpoint="6" 
/>
```

当目录项数量超过 `columnBreakpoint` 时，自动启用双列布局。

## 事件和方法

### 暴露的方法

通过模板引用可以调用组件的方法：

```vue
<template>
  <TableOfContents ref="tocRef" />
</template>

<script setup>
import { ref } from 'vue'

const tocRef = ref()

// 刷新目录项
const refresh = () => {
  tocRef.value.refresh()
}

// 获取当前目录项
const getItems = () => {
  return tocRef.value.getItems()
}
</script>
```

## 样式定制

组件使用CSS变量进行样式管理，可以通过主题系统或直接覆盖CSS变量来定制样式：

```css
.table-of-contents {
  --theme-primary: #your-color;
  --theme-text-primary: #your-text-color;
}
```

## 响应式支持

组件内置响应式支持：

- 移动端自动切换为单列布局
- 字体大小和间距自动调整
- 序号圆圈大小适配屏幕尺寸

## 配合 DefaultContainer 使用

推荐配合项目的 `DefaultContainer` 组件使用，确保布局一致性：

```vue
<template>
  <DefaultContainer theme="white">
    <div class="page-container">
      <TableOfContents
        title="演示文档目录"
        theme="white"
        number-format="chapter"
        :two-column="true"
      />
    </div>
  </DefaultContainer>
</template>
```

## 示例页面

项目中已包含完整的示例页面 `TableOfContentsPage.vue`，展示了：

- 基础目录展示
- 序号格式切换
- 主题集成效果
- 响应式布局
- 交互控制面板

可以通过访问 `/table-of-contents` 路由查看完整效果。