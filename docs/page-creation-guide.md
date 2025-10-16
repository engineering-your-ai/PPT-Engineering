# 页面添加指南
本指南将详细介绍如何在项目中添加新的页面，包括组件使用、路由配置、主题应用和图标管理等各个方面。
## 快速开始
### 添加页面的标准流程

1. **添加页面文件**  
   在 `src/views` 下对应模块文件夹内新增页面文件。

2. **选择页面容器**  
   在 `components/layout/pagecontainer` 中选择**一个**合适的容器组件并在页面文件中使用。
   - `DefaultContainer.vue`：自由页面，可自定义布局。
   - `DefaultCoverPage.vue`：默认章节封面页面，通常只有标题和副标题，可以在内容区域增加一些要点总结。
   - `DefaultContentPage.vue`：默认内容页面，用于显示主要内容包含页头、页脚、内容区域，可以对内容区域进行自定义。

3. **编写页面content部分（内容区域）**  
   - **3.1 颜色、字体**  
     项目采用 YAML 驱动的动态主题系统，通过 Tailwind CSS 扩展实现颜色、字体、排版全自定义。  
       - 扩展颜色：`primary` / `secondary` / `invert` / `background` / `background-invert` / `border` / `border-subtle` / `link` / `link-hover` / `link-visited` / `accent1`~`accent6`  
       - 扩展字体：`font-body` / `font-heading` / `font-code`  
       - 字号：`text-xs` ~ `text-9xl`  
     按 Tailwind 规范使用即可。
   - **3.2 内容组件**  
     可以使用 `components/layout/contentcommon` 目录中的内容组件，在页面容器内快速实现内容，目前内容组件包括：
       - `MermaidChart.vue`：用于渲染mermaid图表
       - `DrawioChart.vue`：用于渲染drawio图表
       - `Icon.vue`：用于渲染图标

4. **配置路由**  
   在 `routes.config.yaml` 中添加对应路由。

5. **测试页面**  
   验证功能与样式。


### 快速添加示例

以下是添加一个新页面的最简单方法：

```bash
# 1. 创建页面组件文件
mkdir src/views/my-new-module
touch src/views/my-new-module/MyNewPage.vue
```

```vue
<!-- 2. 编写页面组件内容 -->
<template>
  <DefaultContentPage 
    title="我的新页面"
    subtitle="页面副标题"
  >
    <template #content>
      <div class="space-y-6 p-6">
        <!-- 使用图标系统和Tailwind类 -->
        <div class="flex items-center mb-4">
          <Icon name="FileText" :size="24" color="text-primary" />
          <h2 class="font-heading text-2xl font-semibold text-primary">页面内容</h2>
        </div>
        
        <p class="font-body text-secondary leading-relaxed">
          这里是页面的主要内容区域，使用语义化的Tailwind类。
        </p>
        
        <!-- 使用Tailwind主题类 -->
        <div class="bg-default border border-border-default rounded-lg p-4 shadow-theme-sm hover:shadow-theme-md transition-shadow">
          <p class="text-primary">使用主题卡片样式</p>
        </div>
        
        <!-- 动态内容使用theme-content类 -->
        <div class="theme-content" v-html="dynamicContent"></div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultContentPage from '@/components/layout/pagecontainer/defaultContentPage.vue'
import Icon from '@/components/layout/Icon.vue'

defineOptions({
  name: 'MyNewPage'
})

const dynamicContent = ref('<h3>动态内容标题</h3><p>这些内容会自动应用主题样式</p>')
</script>
```

```yaml
# 3. 在 public/config/routes.config.yaml 中添加路由
routes:
  # ... 现有路由 ...
  
  # 新增模块
  - route: "my-new-module"
    component: "@/views/my-new-module/MyNewModuleIndex.vue"  # 父路由组件
    meta:
      title: "我的新模块"
      icon: "FileText"  # 图标名称，需在 icons.config.yaml 中配置
      order: 10
    children:
      - route: "page1"
        component: "@/views/my-new-module/MyNewPage.vue"
        meta:
          title: "页面1"
          order: 1
      - route: "page2"
        component: "@/views/my-new-module/AnotherPage.vue"
        meta:
          title: "页面2"
          order: 2
```

**💡 快速提示**：
- **主题系统**：使用Tailwind类 + CSS变量映射，支持配置驱动的主题切换，详见 [`theme-usage-guide.md`](./theme-usage-guide.md)
- **图标系统**：使用 `Icon` 组件，支持Lucide图标库，详见 [`icon-system-guide.md`](./icon-system-guide.md)
- **路由配置**：YAML配置驱动的路由系统，详见 [`routes-config-guide.md`](./routes-config-guide.md)
- **样式规范**：优先使用语义化Tailwind类，动态内容使用 `theme-content` 工具类

## 页面类型选择

项目提供了多种页面布局组件，根据不同场景选择合适的组件：

### 1. 标准内容页面 - DefaultContentPage（推荐）

**适用场景**：
- 大多数内容展示页面
- 需要标题、内容、页脚三段式布局
- 需要统一的页面风格

**特点**：
- 固定1920x1080px尺寸
- 集成HeaderSection、FooterSection
- 支持主题系统
- 内置分页功能

**使用方法**：
```vue
<template>
  <DefaultContentPage 
    title="页面标题"
    subtitle="页面副标题"
  >
    <template #content>
      <!-- 使用Tailwind类的内容区域 -->
      <div class="space-y-6 p-6">
        <h2 class="font-heading text-2xl font-semibold text-primary">内容标题</h2>
        <p class="font-body text-secondary leading-relaxed">页面内容...</p>
        
        <!-- 动态内容使用theme-content类 -->
        <div class="theme-content" v-html="dynamicHtml"></div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/defaultContentPage.vue'
</script>
```

### 2. 章节封面页面 - DefaultCoverContainer

**适用场景**：
- 章节开始页面
- 标题展示页面
- 简洁的封面设计

**特点**：
- 居中对齐的大标题布局
- 支持主标题和副标题
- 适合作为章节分隔页

**使用方法**：
```vue
<template>
  <DefaultCoverContainer
    title="章节标题"
    subtitle="章节副标题"
    :padding="120"
  />
</template>

<script setup lang="ts">
import DefaultCoverContainer from '@/components/layout/pagecontainer/defaultCoverContainer.vue'
</script>
```

### 3. 自定义页面 - FixedSizeContainer

**适用场景**：
- 需要完全自定义布局
- 特殊的页面设计需求
- 不需要标准三段式布局

**特点**：
- 只提供固定尺寸容器
- 完全自由的内容布局
- 需要手动添加所有元素

**使用方法**：
```vue
<template>
  <FixedSizeContainer theme="darkBusiness">
    <!-- 完全自定义的页面内容 -->
    <div class="flex flex-col h-full bg-default">
      <HeaderSection title="自定义标题" />
      
      <div class="flex-1 p-6 space-y-4">
        <h1 class="font-heading text-3xl font-bold text-primary">自定义内容</h1>
        <p class="font-body text-secondary">使用Tailwind类构建自定义布局</p>
        
        <!-- 卡片示例 -->
        <div class="bg-bg-subtle border border-border-default rounded-lg p-4">
          <h3 class="font-heading text-lg font-semibold text-primary mb-2">卡片标题</h3>
          <p class="text-secondary">卡片内容</p>
        </div>
      </div>
      
      <FooterSection text="自定义页脚" />
    </div>
  </FixedSizeContainer>
</template>

<script setup lang="ts">
import FixedSizeContainer from '@/components/layout/container/FixedSizeContainer.vue'
import HeaderSection from '@/components/common/HeaderSection.vue'
import FooterSection from '@/components/common/FooterSection.vue'
</script>
```

## 相关指南

为了更好地使用项目功能，请参考以下指南：

- 🎨 [**主题系统使用指南**](./theme-usage-guide.md) - 学习如何使用和配置主题系统
- 🖼️ [**图标系统使用指南**](./icon-system-guide.md) - 掌握图标系统的使用方法
- 🗺️ [**路由配置指南**](./routes-config-guide.md) - 了解路由配置的详细说明

如有任何问题，请参考相关指南或联系开发团队。