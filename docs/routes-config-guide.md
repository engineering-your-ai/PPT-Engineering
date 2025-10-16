# 路由配置指南

本文档详细说明了项目中路由配置文件 `public/config/routes.config.yaml` 的使用方法和参数说明。

## 快速开始

### 路由层级说明

本项目的路由系统采用**独立页面架构**：
- **父路由**：作为独立的完整页面，配置自己的组件
- **子路由**：作为独立的完整页面，配置自己的组件

```
父路由: /container-demo (独立页面组件)
├── 子路由: /container-demo/default-page (独立页面组件)
└── 子路由: /container-demo/404 (独立页面组件)
```

每个路由（包括父路由和子路由）都是独立的页面，都配置对应的Vue组件。

### 添加新模块和页面

#### 方式一：创建新模块（推荐用于新功能模块）

1. **创建模块目录和组件文件**
   ```bash
   # 创建模块目录
   mkdir src/views/my-module
   
   # 创建页面组件
   src/views/my-module/MyModuleIndex.vue   # 父路由主页面
   src/views/my-module/MyListPage.vue      # 子页面：列表页
   src/views/my-module/MyPreviewPage.vue   # 子页面：预览页
   ```

2. **在配置文件中添加模块路由**
   ```yaml
   # 编辑 public/config/routes.config.yaml
   routes:
     - route: "my-module"                    # 父路由路径
       component: "@/views/my-module/MyModuleIndex.vue"  # 父路由组件
       meta:
         title: "我的模块"                     # 父路由标题
         icon: "Settings"                     # 父路由图标
         order: 10                            # 父路由排序
       children:                              # 子路由配置
         - route: "list"                     # 子路由路径
           component: "@/views/my-module/MyListPage.vue"
           meta:
             title: "列表"
             order: 10
         - route: "preview"                  # 子路由路径
           component: "@/views/my-module/MyPreviewPage.vue"
           meta:
             title: "预览"
             order: 20
   ```

#### 方式二：在现有模块下添加页面

1. **创建页面组件文件**
   ```bash
   # 在现有模块目录下创建新页面
   src/views/existing-module/NewPage.vue
   ```

2. **在现有模块的 children 中添加页面配置**
   ```yaml
   # 在现有模块的 children 数组中添加
   - route: "new-page"
     component: "@/views/existing-module/NewPage.vue"
     meta:
       title: "新页面"
       order: 30
   ```

3. **刷新页面**
   配置文件修改后，刷新浏览器页面即可看到新的路由和菜单项。
   新页面将作为独立页面，访问路径为 `/existing-module/new-page`。

### 删除模块或页面

#### 删除整个模块

1. **从配置文件中移除模块配置**
   ```yaml
   # 删除或注释掉整个模块配置
   # - route: "unwanted-module"
   #   meta:
   #     title: "不需要的模块"
   #   children: [...]
   ```

2. **删除模块目录**（可选）
   ```bash
   # 删除整个模块目录
   rmdir /s src/views/unwanted-module
   ```

#### 删除模块下的单个页面

1. **从模块的 children 中移除页面配置**
   ```yaml
   # 在模块配置中删除对应的子路由
   # - route: "unwanted-page"
   #   component: "@/views/module/UnwantedPage.vue"
   ```

2. **删除页面组件文件**（可选）
   ```bash
   # 删除单个页面文件
   del src/views/module/UnwantedPage.vue
   ```

### 修改现有路由

- **修改标题**: 更改 `meta.title` 值
- **修改图标**: 更改 `meta.icon` 值
- **调整顺序**: 更改 `meta.order` 值
- **隐藏路由**: 添加 `meta.hidden: true`

## 概述

本项目采用配置驱动的路由系统，通过 YAML 配置文件自动生成 Vue Router 路由和导航菜单。配置文件位于 `public/config/routes.config.yaml`，系统会在运行时动态加载并解析该配置。

## 配置文件结构

### 基本结构

```yaml
# 路由配置文件
# 配置驱动的路由定义，支持自动菜单生成

routes:
  - route: "module-name"                        # 父路由路径
    component: "@/views/module-name/ModuleIndex.vue"  # 父路由组件
    meta:
      title: "模块标题"                          # 父路由标题
      icon: "IconName"                           # 父路由图标
      order: 0                                   # 父路由排序
    children:                                    # 子路由配置
      - route: "page-name"                      # 子路由路径
        component: "@/views/module-name/PageName.vue"  # 子路由组件
        meta:
          title: "页面标题"                       # 子路由标题
          order: 0                               # 子路由排序
```

## 参数详细说明

### 父路由参数

#### `route` (必需)
- **类型**: `string`
- **说明**: 父路由路径，用于构建 URL
- **示例**: `"container-demo"` 对应 URL `/container-demo`
- **注意**: 不要以 `/` 开头，系统会自动处理路径拼接

#### `component` (必需)
- **类型**: `string`
- **说明**: 父路由对应的Vue组件文件路径
- **格式**: 使用 `@/` 别名指向 `src` 目录
- **示例**: `"@/views/container-demo/ChapterCoverDemo.vue"`
- **重要**: 父路由现在必须配置独立的组件，作为完整的页面

#### `meta` (必需)
路由元信息对象，包含以下属性：

##### `title` (必需)
- **类型**: `string`
- **说明**: 模块标题，用于导航菜单显示和面包屑导航
- **示例**: `"产品介绍"`

##### `icon` (可选)
- **类型**: `string`
- **说明**: 图标名称，用于导航菜单显示
- **示例**: `"Users"`, `"Settings"`, `"Database"`
- **支持的图标**: 基于项目使用的图标库（参考）

##### `order` (必需)
- **类型**: `number`
- **说明**: 排序号，用于控制导航菜单中的显示顺序
- **示例**: `0`, `1`, `2`
- **注意**: 数字越小，显示位置越靠前

##### `hidden` (可选)
- **类型**: `boolean`
- **说明**: 是否在导航菜单中隐藏该路由
- **默认值**: `false`
- **用途**: 用于隐藏不需要在菜单中显示的路由

#### `children` (可选)
子路由数组，定义该模块下的具体页面。

### 子路由参数

#### `route` (必需)
- **类型**: `string`
- **说明**: 子路由路径
- **示例**: `"default-page"` 对应 URL `/container-demo/default-page`
- **注意**: 最终路径为完整路径格式 `/父路由/子路由`

#### `component` (必需)
- **类型**: `string`
- **说明**: 子路由对应的Vue组件文件路径
- **格式**: 使用 `@/` 别名指向 `src` 目录
- **示例**: `"@/views/container-demo/TestDefaultPage.vue"`
- **重要**: 子路由必须配置独立的组件，作为完整的页面

#### `meta` (必需)
子路由元信息对象：

##### `title` (必需)
- **类型**: `string`
- **说明**: 子路由页面标题，用于导航菜单
- **示例**: `"默认内容页面"`, `"未找到页面文件"`

##### `order` (必需)
- **类型**: `number`
- **说明**: 在父路由下的排序号，用于控制子路由在菜单中的显示顺序
- **示例**: `1`, `2`, `10`

##### `hidden` (可选)
- **类型**: `boolean`
- **说明**: 是否在导航菜单中隐藏
- **默认值**: `false`

## 路由生成规则

### 路径构建
1. **父路由路径**: 直接使用 `route` 值
2. **子路由路径**: 父路径 + "/" + 子路由 `route` 值
3. **索引路由**: `route` 为空字符串时，使用父路径作为访问路径

### 示例路径映射
```yaml
- route: "introduction"  # 对应 /introduction
  children:
    - route: ""             # 对应 /introduction (索引路由)
    - route: "list"         # 对应 /introduction/list
    - route: "create"       # 对应 /introduction/create
```

### 导航菜单生成
1. **显示规则**: 
   - `hidden: true` 的路由不显示
2. **排序规则**: 按 `order` 值升序排列
3. **层级结构**: 自动根据父子关系构建多级菜单

## 配置示例

### 完整示例
```yaml
routes:
  # 首页模块
  - route: "home"
    component: "@/views/HomePage.vue"                # 父路由独立组件
    meta:
      title: "首页"
      icon: "Home"
      order: 0

  # 目录页面模块
  - route: "contents"
    component: "@/views/TableOfContentsPage.vue"     # 父路由独立组件
    meta:
      title: "目录"
      icon: "List"
      order: 1

  # 容器组件演示模块
  - route: "container-demo"
    component: "@/views/container-demo/ChapterCoverDemo.vue"  # 父路由独立组件
    meta:
      title: "容器组件演示"
      icon: "Layout"
      order: 2
    children:
      # 默认内容页面
      - route: "default-page"
        component: "@/views/container-demo/TestDefaultPage.vue"  # 子路由独立组件
        meta:
          title: "默认内容页面"
          order: 1
      # 404页面演示
      - route: "404"
        component: "@/views/container-demo/xxxxx.vue"           # 子路由独立组件
        meta:
          title: "未找到页面文件"
          order: 2
          hidden: true                                           # 隐藏该页面
          
  # 末页模块
  - route: "endpage"
    component: "@/views/EndPage.vue"                  # 父路由独立组件
    meta:
      title: "末页"
      icon: "Send"
      order: 10
```

## 最佳实践

### 1. 路由命名规范
- 使用小写字母和连字符
- 避免使用特殊字符和空格
- 保持路径简洁且有意义

### 2. 组件文件组织
```
src/views/
├── HomePage.vue
├── introduction/
│   ├── UserOverviewPage.vue
│   ├── ListPage.vue
│   └── AdminPage.vue
├── product-catalog/
│   ├── ProductOverviewPage.vue
│   ├── ProductListPage.vue
│   └── ProductDetailPage.vue
└── system-settings/
    ├── GeneralSettingsPage.vue
    └── SecuritySettingsPage.vue
```

### 3. 独立页面设计
- 每个路由（父路由和子路由）都配置独立的组件
- 父路由作为模块的主要页面，展示模块概述或主要内容
- 子路由作为模块的具体功能页面

### 4. 排序策略
- 重要模块使用较小的 `order` 值
- 为未来扩展预留排序空间（如使用 0, 10, 20 而不是 0, 1, 2）
- 子路由排序独立于父路由

### 5. 图标选择
- 使用语义化的图标名称
- 保持图标风格一致
- 确保图标库中存在对应的图标

## 常见问题

### Q: 如何添加新的路由？
A: 在 `routes` 数组中添加新的路由配置对象，系统会自动生成对应的路由和菜单项。

### Q: 如何隐藏某个路由？
A: 在路由的 `meta` 中设置 `hidden: true`。

### Q: 如何设置模块的主要页面？
A: 直接为父路由配置 `component` 字段，指定对应的Vue组件文件路径。父路由本身就是一个独立的页面。

### Q: 路由配置修改后需要重启服务吗？
A: 不需要，配置文件位于 `public` 目录下，修改后刷新页面即可生效。

### Q: 组件路径错误会怎样？
A: 系统会自动回退到 NotFoundPage 组件，并在控制台输出警告信息。

### Q: 父路由必须配置组件吗？
A: 是的，在新的架构中，父路由必须配置 `component` 字段，因为它们都是独立的页面。

### Q: 页码是如何分配的？
A: 系统会自动为父路由和子路由分配连续的页码，按 `order` 排序，排除 `hidden: true` 的路由，从 1 开始编号。

## 技术实现

路由配置的技术实现涉及以下文件：
- `src/utils/config.ts`: 配置加载和解析
- `src/utils/route-generator.ts`: 路由和菜单生成
- `src/types/navigation.ts`: 类型定义
- `src/router/index.ts`: 路由注册

配置文件在应用启动时被动态加载，通过 YAML 解析器转换为 JavaScript 对象，然后生成对应的 Vue Router 路由配置和导航菜单数据。