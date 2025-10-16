# 主题系统使用指南

## 概述

本项目采用基于 YAML 配置的动态主题系统，通过 Tailwind CSS 扩展实现完全自定义的颜色、字体和排版配置。系统支持完整的色阶、透明度变化，按tailwindcss的规范使用即可。
扩展的颜色变量包括：`primary`, `secondary`, `invert`, `background`, `background-invert`,`border`, `border-subtle`, `link`, `link-hover`, `link-visited`,`accent1`, `accent2`, `accent3`, `accent4`, `accent5`, `accent6`
扩展的字体包括：`font-body`, `font-heading`, `font-code`
字体大小包括：`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, `text-9xl`

### 背景色类名
```html
<!-- 默认背景色 - 完整色阶 -->
<div class="bg-background">默认背景</div>
<div class="bg-background-50">默认背景（最浅）</div>
<div class="bg-background-100">默认背景（很浅）</div>
<div class="bg-background-500">默认背景（标准）</div>
<div class="bg-background-900">默认背景（最深）</div>

<!-- 次级背景色 - 完整色阶 -->
<div class="bg-background-subtle">次级背景</div>
<div class="bg-background-subtle-100">次级背景（很浅）</div>
<div class="bg-background-subtle-300">次级背景（较浅）</div>
<div class="bg-background-subtle-700">次级背景（较深）</div>
```

### 边框色类名
```html
<!-- 默认边框色 - 完整色阶 -->
<div class="border border-border">默认边框</div>
<div class="border border-border-200">默认边框（浅）</div>
<div class="border border-border-400">默认边框（中浅）</div>
<div class="border border-border-600">默认边框（中深）</div>

<!-- 次级边框色 - 完整色阶 -->
<div class="border border-border-subtle">次级边框</div>
<div class="border border-border-subtle-300">次级边框（较浅）</div>
<div class="border border-border-subtle-500">次级边框（标准）</div>
```

### 链接色类名
```html
<!-- 链接色系统 - 完整色阶 -->
<a class="text-link">默认链接</a>
<a class="text-link-300">浅色链接</a>
<a class="text-link-700">深色链接</a>

<!-- 悬浮状态链接色 -->
<a class="text-link-hover">悬浮链接色</a>
<a class="text-link-hover-400">悬浮链接色（中浅）</a>

<!-- 已访问链接色 -->
<a class="text-link-visited">已访问链接</a>
<a class="text-link-visited-600">已访问链接（中深）</a>
```

### 强调色类名
```html
<!-- 强调色背景 - 完整色阶 -->
<div class="bg-accent1">强调色1背景</div>
<div class="bg-accent1-100">强调色1背景（很浅）</div>
<div class="bg-accent1-300">强调色1背景（较浅）</div>
<div class="bg-accent1-500">强调色1背景（标准）</div>
<div class="bg-accent1-700">强调色1背景（较深）</div>
<div class="bg-accent1-900">强调色1背景（最深）</div>

<!-- 强调色文本 - 完整色阶 -->
<p class="text-accent2">强调色2文本</p>
<p class="text-accent2-400">强调色2文本（中浅）</p>
<p class="text-accent2-600">强调色2文本（中深）</p>

<!-- 强调色边框 - 完整色阶 -->
<div class="border border-accent3">强调色3边框</div>
<div class="border border-accent3-200">强调色3边框（浅）</div>
<div class="border border-accent3-800">强调色3边框（深）</div>

<!-- 所有六个强调色 -->
<div class="bg-accent1">强调色1</div>
<div class="bg-accent2">强调色2</div>
<div class="bg-accent3">强调色3</div>
<div class="bg-accent4">强调色4</div>
<div class="bg-accent5">强调色5</div>
<div class="bg-accent6">强调色6</div>
```

## 字体系统

### 字体家族类名
```html
<!-- 标题字体 -->
<h1 class="font-heading">标题文本</h1>
<h2 class="font-heading text-2xl">大标题</h2>

<!-- 正文字体 -->
<p class="font-body">正文内容</p>
<span class="font-body text-sm">小号正文</span>

<!-- 代码字体 -->
<code class="font-code">代码文本</code>
<pre class="font-code text-xs">代码块</pre>
```

## 实际使用示例

### 完整组件示例
```vue
<template>
  <div class="bg-background p-6 rounded-lg border border-border">
    <!-- 标题区域 -->
    <header class="mb-4">
      <h1 class="font-heading text-3xl text-primary mb-2">
        产品展示卡片
      </h1>
      <p class="font-body text-secondary">
        使用主题系统的完整示例
      </p>
    </header>
    
    <!-- 内容区域 -->
    <main class="bg-background-subtle p-4 rounded border border-border-subtle">
      <p class="font-body text-primary-700 mb-3">
        这是一个使用主题系统的示例组件，展示了各种颜色和字体的使用。
      </p>
      
      <!-- 按钮组 -->
      <div class="flex gap-3 mb-4">
        <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600">
          主要按钮
        </button>
        <button class="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-600">
          次要按钮
        </button>
        <button class="border border-tertiary text-invert px-4 py-2 rounded hover:bg-tertiary-50">
          边框按钮
        </button>
      </div>
      
      <!-- 状态标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="bg-accent1 text-white px-3 py-1 rounded-full text-sm">设计</span>
        <span class="bg-accent2 text-white px-3 py-1 rounded-full text-sm">开发</span>
        <span class="bg-accent3 text-white px-3 py-1 rounded-full text-sm">测试</span>
        <span class="bg-accent4 text-white px-3 py-1 rounded-full text-sm">部署</span>
      </div>
      
      <!-- 链接示例 -->
      <div class="space-y-2">
        <a href="#" class="text-link hover:text-link-hover block">默认链接样式</a>
        <a href="#" class="text-link-600 hover:text-link-hover-600 block">深色链接样式</a>
        <a href="#" class="text-link-visited block">已访问链接样式</a>
      </div>
    </main>
    
    <!-- 代码示例 -->
    <footer class="mt-4 p-3 bg-tertiary-50 rounded border border-tertiary-200">
      <code class="font-code text-sm text-invert-800">
        const theme = useTheme()
      </code>
    </footer>
  </div>
</template>

<script setup>
import { useTheme } from '@/core/composables/useTheme'

const { themeConfig, themeClass } = useTheme()
</script>
```

### 数据可视化示例
```vue
<template>
  <div class="bg-background p-6 rounded-lg border border-border">
    <h2 class="font-heading text-2xl text-primary mb-4">项目进度统计</h2>
    
    <!-- 图表图例 -->
    <div class="flex flex-wrap gap-4 mb-6">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-accent1 rounded"></div>
        <span class="font-body text-sm text-secondary">需求分析 (25%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-accent2 rounded"></div>
        <span class="font-body text-sm text-secondary">UI设计 (20%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-accent3 rounded"></div>
        <span class="font-body text-sm text-secondary">前端开发 (30%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-accent4 rounded"></div>
        <span class="font-body text-sm text-secondary">后端开发 (15%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-accent5 rounded"></div>
        <span class="font-body text-sm text-secondary">测试 (10%)</span>
      </div>
    </div>
    
    <!-- 柱状图 -->
    <div class="flex items-end gap-2 h-32 mb-4">
      <div class="bg-accent1 w-12 rounded-t" style="height: 75%">
        <div class="text-white text-xs text-center pt-2">25%</div>
      </div>
      <div class="bg-accent2 w-12 rounded-t" style="height: 60%">
        <div class="text-white text-xs text-center pt-2">20%</div>
      </div>
      <div class="bg-accent3 w-12 rounded-t" style="height: 90%">
        <div class="text-white text-xs text-center pt-2">30%</div>
      </div>
      <div class="bg-accent4 w-12 rounded-t" style="height: 45%">
        <div class="text-white text-xs text-center pt-2">15%</div>
      </div>
      <div class="bg-accent5 w-12 rounded-t" style="height: 30%">
        <div class="text-white text-xs text-center pt-2">10%</div>
      </div>
    </div>
    
    <!-- 进度条 -->
    <div class="space-y-3">
      <div>
        <div class="flex justify-between text-sm text-secondary mb-1">
          <span>整体进度</span>
          <span>68%</span>
        </div>
        <div class="w-full bg-tertiary-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full" style="width: 68%"></div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between text-sm text-secondary mb-1">
          <span>质量评分</span>
          <span>85%</span>
        </div>
        <div class="w-full bg-tertiary-200 rounded-full h-2">
          <div class="bg-secondary h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>
    </div>
  </div>
</template>
```
## CSS 变量直接使用

如果需要在特殊情况下直接使用 CSS 变量，可以参考以下变量名：

### 可用的主题变量
```css
/* Tailwind 扩展变量 - 用于色阶生成 */
--tw-color-text-primary
--tw-color-text-secondary  
--tw-color-text-invert
--tw-color-bg-default
--tw-color-bg-subtle
--tw-color-border-default
--tw-color-border-subtle
--tw-color-link-default
--tw-color-link-hover
--tw-color-link-visited
--tw-color-accent1
--tw-color-accent2
--tw-color-accent3
--tw-color-accent4
--tw-color-accent5
--tw-color-accent6

/* 字体变量 */
--tw-font-heading
--tw-font-body
--tw-font-code
--tw-font-size-base
```

### 在样式中使用变量
```vue
<template>
  <div class="custom-component">
    <p class="custom-text">自定义样式文本</p>
  </div>
</template>

<style scoped>
.custom-component {
  background: rgb(from var(--tw-color-bg-default) r g b / 0.8);
  border: 1px solid var(--tw-color-border-default);
  border-radius: 8px;
  padding: 1rem;
}

.custom-text {
  color: var(--tw-color-text-primary);
  font-family: var(--tw-font-body);
  font-size: calc(var(--tw-font-size-base) * 1.125);
}
</style>
```

## 最佳实践

1. **优先使用语义化类名**：`text-primary`、`bg-background` 等
2. **复杂场景使用变量**：`text-[var(--theme-text-primary)]`
3. **保持一致性**：在同一组件中使用相同的命名方式
4. **利用状态色变体**：使用 50-950 的完整色阶
5. **响应式设计**：结合 Tailwind 的响应式前缀使用
6. **强调色用于数据可视化**：使用 `accent1-accent6` 确保颜色和谐
7. **避免过度使用强调色**：强调色主要用于图表、标签等需要区分的场景

