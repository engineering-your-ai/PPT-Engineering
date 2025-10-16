# 图标系统使用指南
本项目采用配置文件驱动的统一图标管理系统，支持 Lucide 图标和静态图标的统一管理和使用。系统通过 YAML 配置文件进行图标管理，支持异步加载和动态配置。
## 快速查找和添加图标
### 查找可用图标
所有可用图标都在 `public/config/icons.config.yaml` 文件中定义，按分类组织：
```yaml
# Lucide 图标配置 - 按分类组织
lucide_icons:
  # 导航相关图标
  navigation:
    - Menu
    - X
    - ChevronLeft
    - ChevronDown
  # 基础图标
  basic:
    - Home
    - BarChart3
    - Settings
    # ... 更多图标
# 静态图标配置 - 按分类组织
static_icons:
  # Logo 图标
  logo:
    - name: ppe-engineering-logo
      src: /img/logo/ppe-e.png
    - name: zkml-logo
      src: /img/logo/zkml.png
```

### 添加新图标

#### 1. 添加 Lucide 图标

在 `public/config/icons.config.yaml` 中的相应分类下添加图标名称：

```yaml
lucide_icons:
  # 选择合适的分类或创建新分类
  basic:
    - Home
    - Settings
    - NewIcon  # 新增的图标
  
  # 或创建新分类
  new_category:
    - AnotherNewIcon
```

#### 2. 添加静态图标

1. 将图标文件放到 `public/img/` 目录下的相应文件夹
2. 在配置文件中添加图标配置：

```yaml
static_icons:
  # 选择合适的分类或创建新分类
  custom:
    - name: my-custom-icon
      src: /img/icon/my-custom-icon.svg
```

## 基础使用

### 1. 在模板中使用图标

#### 使用 Icon 组件（推荐）
```vue
<template>
  <!-- 基础使用 -->
  <Icon name="Home" :size="24" />
  
  <!-- 带颜色和样式 -->
  <Icon 
    name="Settings" 
    :size="20" 
    color="#3b82f6" 
    class="custom-icon-class" 
  />
</template>

<script setup>
import Icon from '@/components/layout/contentcommon/Icon.vue'
</script>
```

## 系统架构
### 核心文件
- `public/config/icons.config.yaml` - 图标配置文件
- `src/core/utils/config.ts` - 配置文件工具
- `src/core/utils/icon-registry.ts` - 图标注册表核心
- `src/core/composables/useIcon.ts` - 图标使用的 Composable
- `src/components/layout/Icon.vue` - 布局图标组件

### 配置文件系统
系统现在使用 `icons.config.yaml` 配置文件来管理所有图标，支持：
- 集中化图标配置管理
- 异步图标加载
- 动态配置更新
- 图标分类和元数据管理
