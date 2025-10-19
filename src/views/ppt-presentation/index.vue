<template>
  <DefaultCoverPage 
    title="自动生成效果"
    subtitle="本页面多轮对话修改，本章节其他页面由Tran CN一次生成"
  >
    <template #content>
      <div class="w-full max-w-4xl mx-auto p-6">
        <!-- 打开弹窗按钮 -->
        <div class="flex justify-center mb-6">
          <button 
            @click="openModal"
            class="px-6 py-3 bg-primary text-white rounded-lg font-medium text-sm transition-all shadow-md hover:bg-primary/90 flex items-center"
          >
            <Icon name="FileText" :size="18" class="mr-2" />
            本章节内容文本（deepseek v3.1生成的markdown）
          </button>
        </div>
        
        <!-- 弹窗层 -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-6" @click="closeModal">
          <div class="bg-default rounded-lg shadow-md max-w-7xl w-full max-h-[98vh] overflow-hidden" @click.stop>
            <!-- 弹窗头部 -->
            <div class="flex items-center justify-between p-4 border-b border-border-default">
              <h2 class="font-heading text-xl font-bold text-primary">页面设计文本内容</h2>
              <button 
                @click="closeModal"
                class="p-2 rounded-lg hover:bg-background transition-colors"
              >
                <Icon name="X" :size="20" color="text-secondary" />
              </button>
            </div>
            
            <!-- 弹窗内容 -->
            <div class="overflow-y-auto max-h-[calc(98vh-6rem)] p-6">
              <div v-for="(page, index) in pages" :key="index" class="mb-8 pb-8 border-b border-border-default last:border-b-0">
                <h3 class="font-heading text-2xl font-bold text-primary mb-4">{{ page.title }}</h3>
                
                <!-- 页面布局说明 -->
                <div v-if="page.layout" class="mb-6">
                  <h4 class="font-heading text-lg font-semibold text-primary mb-3">页面布局</h4>
                  <ul class="space-y-1">
                    <li v-for="(item, itemIndex) in page.layout" :key="itemIndex" class="flex items-start">
                      <Icon name="ChevronRight" :size="16" color="text-accent1" class="mt-0.5 mr-2 flex-shrink-0" />
                      <span class="font-body text-sm text-secondary">{{ item }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- 详细内容 -->
                <div v-if="page.content" class="space-y-4">
                  <div v-for="(section, sectionIndex) in page.content" :key="sectionIndex">
                    <h4 v-if="section.title" class="font-heading text-lg font-semibold text-primary mb-2">{{ section.title }}</h4>
                    
                    <!-- 列表内容 -->
                    <ul v-if="'items' in section && section.items" class="space-y-2 mb-4">
                      <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="flex items-start">
                        <Icon name="CheckCircle" :size="16" color="text-accent2" class="mt-0.5 mr-2 flex-shrink-0" />
                        <span class="font-body text-sm text-secondary">{{ item }}</span>
                      </li>
                    </ul>
                    
                    <!-- 普通文本内容 -->
                    <p v-if="'text' in section && section.text" class="font-body text-sm text-secondary mb-4">{{ section.text }}</p>
                    
                    <!-- 代码块 -->
                    <div v-if="'code' in section && section.code" class="bg-background border border-border-default rounded p-3 mb-4 overflow-x-auto">
                      <pre class="font-mono text-xs text-secondary whitespace-pre-wrap">{{ section.code }}</pre>
                    </div>
                    
                    <!-- 嵌套列表 -->
                    <div v-if="'nestedItems' in section && section.nestedItems" class="ml-4 mb-4">
                      <div v-for="(nestedItem, nestedIndex) in section.nestedItems" :key="nestedIndex" class="mb-3">
                        <h5 v-if="nestedItem.title" class="font-heading text-base font-medium text-primary mb-2">{{ nestedItem.title }}</h5>
                        <ul v-if="nestedItem.items" class="space-y-1">
                          <li v-for="(subItem, subIndex) in nestedItem.items" :key="subIndex" class="flex items-start">
                            <Icon name="ArrowRight" :size="14" color="text-accent3" class="mt-0.5 mr-2 flex-shrink-0" />
                            <span class="font-body text-sm text-secondary">{{ subItem }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DefaultCoverPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultCoverPage from '@/components/layout/pagecontainer/DefaultCoverPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'PptPresentationIndex'
})

/**
 * 嵌套项目接口
 */
interface NestedItem {
  title: string
  items: string[]
}

/**
 * 内容区块接口 - 联合类型
 */
type ContentSection = 
  | { title: string; text: string }
  | { title: string; items: string[] }
  | { title: string; code: string }
  | { title: string; nestedItems: NestedItem[] }

/**
 * 页面接口
 */
interface Page {
  title: string
  layout?: string[]
  content?: ContentSection[]
}

// 弹窗控制
const isModalOpen = ref(false)

// 打开弹窗
const openModal = () => {
  isModalOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isModalOpen.value = false
}

// 页面数据
const pages: Page[] = [
  {
    title: "第1页：项目概述",
    layout: [
      "顶部标题区：项目Logo + 'PPT Engineering' 主标题",
      "左侧内容区：项目简介和核心价值主张",
      "右侧图示区：项目架构示意图",
      "底部信息区：技术栈和版本信息"
    ],
    content: [
      {
        title: "项目标题",
        text: "PPT Engineering - AI驱动的PPT构建框架"
      },
      {
        title: "核心价值",
        items: [
          "基于大模型当前通用能力强，但没有记忆能力的现状",
          "构建降低上下文依赖的框架，为AI编写PPT构建基础",
          "实现完全自定义的PPT页面构建，而非套用模板"
        ]
      },
      {
        title: "技术栈",
        items: [
          "前端：Vue@3 + TypeScript@5 + Vite@5 + Vue Router@4",
          "样式：Tailwind CSS@3",
          "构建工具：Vite",
          "包管理：pnpm"
        ]
      },
      {
        title: "项目特色",
        items: [
          "作者是产品经理，代码完全依赖AI实现",
          "开源项目，遵循GPL-3.0-or-later许可证"
        ]
      }
    ]
  },
  {
    title: "第2页：设计理念",
    layout: [
      "顶部标题：'创新设计理念'",
      "左侧图示：传统PPT vs PPT Engineering对比图",
      "右侧列表：核心设计原则",
      "底部总结：设计理念的价值"
    ],
    content: [
      {
        title: "核心理念",
        text: "配置驱动 + 组件化 + 降低AI上下文依赖"
      },
      {
        title: "三大设计原则",
        nestedItems: [
          {
            title: "配置驱动架构",
            items: [
              "核心配置集中于 `public/config/*.yaml`",
              "包括应用信息、路由、主题、图标配置",
              "绝大多数变更无需改动源码，只需调整配置"
            ]
          },
          {
            title: "组件化页面容器",
            items: [
              "提供标准页面容器组件（DefaultContentPage等）",
              "统一尺寸与三段式布局，保证风格一致",
              "内容区域以插槽方式自由扩展"
            ]
          },
          {
            title: "降低上下文依赖",
            items: [
              "页面内容与路由配置分离",
              "页面文件仅关注内容实现",
              "使用统一的组件容器，简化AI生成逻辑"
            ]
          }
        ]
      },
      {
        title: "与传统PPT工具对比",
        nestedItems: [
          {
            title: "传统工具",
            items: ["模板限制 + 手动排版"]
          },
          {
            title: "PPT Engineering",
            items: ["代码驱动 + 动态生成 + AI友好"]
          }
        ]
      }
    ]
  },
  {
    title: "第3页：技术架构",
    layout: [
      "顶部标题：'技术架构深度解析'",
      "中央架构图：项目分层架构示意图",
      "左侧：前端技术栈详解",
      "右侧：配置系统详解",
      "底部：核心依赖包说明"
    ],
    content: [
      {
        title: "前端技术栈",
        nestedItems: [
          {
            title: "框架层",
            items: ["Vue 3 + Composition API + TypeScript"]
          },
          {
            title: "构建层",
            items: ["Vite + 热重载 + 类型检查"]
          },
          {
            title: "样式层",
            items: ["Tailwind CSS + 自定义主题系统"]
          },
          {
            title: "路由层",
            items: ["Vue Router 4 + 动态路由生成"]
          }
        ]
      },
      {
        title: "配置系统架构",
        code: `public/config/
├── app.config.yaml      # 应用基础配置
├── routes.config.yaml   # 路由配置
├── themes.config.yaml   # 主题配置
└── icons.config.yaml    # 图标配置`
      },
      {
        title: "核心依赖包",
        items: [
          "`@zumer/snapdom`：页面截图和PDF导出",
          "`lucide-vue-next`：图标库集成",
          "`mermaid`：图表渲染支持",
          "`js-yaml`：YAML配置解析"
        ]
      },
      {
        title: "项目结构",
        code: `src/
├── components/     # 可复用组件
├── views/          # 页面组件
├── core/           # 核心逻辑
├── layouts/        # 布局组件
└── styles/         # 全局样式`
      }
    ]
  },
  {
    title: "第4页：核心功能",
    layout: [
      "顶部标题：'强大功能特性'",
      "功能网格：6个核心功能模块展示",
      "每个模块：图标 + 标题 + 简要说明",
      "底部：功能组合价值说明"
    ],
    content: [
      {
        title: "六大核心功能",
        nestedItems: [
          {
            title: "页面管理",
            items: [
              "管理 `src/views` 目录下的页面文件",
              "单个页面只需关注单个Vue文件",
              "支持模块化组织页面结构"
            ]
          },
          {
            title: "路由配置",
            items: [
              "通过YAML文件快速配置路由",
              "支持模块、子路由、自定义元数据",
              "自动生成导航菜单和面包屑"
            ]
          },
          {
            title: "主题切换",
            items: [
              "可配置主题系统（logo、颜色、字体等）",
              "支持多主题快速切换",
              "统一的视觉设计规范"
            ]
          },
          {
            title: "图标支持",
            items: [
              "统一Icon组件，集成Lucide图标库",
              "支持自定义图标扩展",
              "按需使用，配置化管理"
            ]
          },
          {
            title: "全屏放映",
            items: [
              "支持页面全屏展示",
              "提供翻页按钮和键盘快捷键",
              "监听PageUp/Down、空格、方向键"
            ]
          },
          {
            title: "页面导出",
            items: [
              "基于snapdom库导出为PDF",
              "支持全图PDF文件生成",
              "保持页面样式和布局完整"
            ]
          }
        ]
      },
      {
        title: "默认页面支持",
        items: [
          "首页（HomePage）",
          "结束页（EndPage）",
          "目录页（TableOfContentsPage）"
        ]
      }
    ]
  },
  {
    title: "第5页：配置系统详解",
    layout: [
      "顶部标题：'配置驱动架构'",
      "左侧：配置文件结构树状图",
      "中央：配置示例代码展示",
      "右侧：配置优势说明",
      "底部：配置使用流程"
    ],
    content: [
      {
        title: "配置文件结构",
        code: `# app.config.yaml
app:
  icon: "Presentation"
  title: "PPT-Engineering"
  version: "1.0.0"
  baseUrl: "/PPT-Engineering/"
  features:
    showPdfExportButton: true`
      },
      {
        title: "路由配置示例",
        code: `routes:
  - route: "feature-showcase"
    component: "@/views/feature-showcase/Index.vue"
    meta:
      title: "功能展示"
      icon: "Grid3x3"
      order: 2
    children:
      - route: "theme-showcase"
        component: "@/views/feature-showcase/ThemeShowcase.vue"
        meta:
          title: "主题展示"
          icon: "Palette"
          order: 1`
      },
      {
        title: "主题配置优势",
        items: [
          "统一管理：颜色、字体、Logo集中配置",
          "快速切换：多主题支持，一键切换",
          "扩展性强：易于添加新主题",
          "一致性：确保整体视觉风格统一"
        ]
      },
      {
        title: "配置驱动价值",
        nestedItems: [
          {
            title: "",
            items: [
              "降低开发门槛：非技术人员也能修改配置",
              "提高维护性：配置与代码分离，易于维护",
              "支持AI生成：AI可以更轻松地生成配置",
              "快速迭代：配置变更无需重新构建"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "第6页：页面创建流程",
    layout: [
      "顶部标题：'页面创建流程'",
      "左侧：创建步骤流程图",
      "右侧：代码示例展示",
      "底部：最佳实践建议"
    ],
    content: [
      {
        title: "创建步骤",
        items: [
          "创建Vue组件文件",
          "配置路由信息",
          "使用容器组件",
          "添加页面内容"
        ]
      },
      {
        title: "代码示例",
        code: `// 1. 创建Vue组件
<template>
  <DefaultContentPage title="页面标题">
    <template #content>
      <!-- 页面内容 -->
    </template>
  </DefaultContentPage>
</template>

// 2. 配置路由
routes:
  - route: "page-name"
    component: "@/views/module/PageName.vue"
    meta:
      title: "页面标题"
      icon: "IconName"
      order: 1`
      },
      {
        title: "最佳实践",
        items: [
          "遵循统一的命名规范",
          "使用语义化的路由名称",
          "合理组织页面结构",
          "保持代码简洁清晰"
        ]
      }
    ]
  },
  {
    title: "第7页：主题系统",
    layout: [
      "顶部标题：'主题系统详解'",
      "左侧：主题配置文件结构",
      "中央：主题切换效果展示",
      "右侧：自定义主题指南",
      "底部：主题设计原则"
    ],
    content: [
      {
        title: "主题配置",
        code: `# themes.config.yaml
themes:
  default:
    primary: "#3b82f6"
    secondary: "#64748b"
    accent: "#8b5cf6"
    background: "#ffffff"
  dark:
    primary: "#60a5fa"
    secondary: "#94a3b8"
    accent: "#a78bfa"
    background: "#1e293b"`
      },
      {
        title: "主题切换",
        items: [
          "支持多主题预设",
          "一键切换主题",
          "实时预览效果",
          "自定义主题扩展"
        ]
      },
      {
        title: "自定义主题",
        items: [
          "修改颜色配置",
          "调整字体样式",
          "设置图标风格",
          "配置布局参数"
        ]
      }
    ]
  },
  {
    title: "第8页：部署与使用",
    layout: [
      "顶部标题：'部署与使用指南'",
      "左侧：部署环境要求",
      "中央：部署步骤流程图",
      "右侧：使用场景展示",
      "底部：常见问题解答"
    ],
    content: [
      {
        title: "环境要求",
        items: [
          "Node.js 16+",
          "现代浏览器支持",
          "Git版本控制"
        ]
      },
      {
        title: "部署步骤",
        code: `# 克隆项目
git clone https://github.com/username/ppt-engineering.git

# 安装依赖
npm install

# 开发环境
npm run dev

# 构建部署
npm run build

# 预览构建结果
npm run preview`
      },
      {
        title: "使用场景",
        items: [
          "技术演示汇报",
          "产品功能展示",
          "项目进度汇报",
          "教学课件制作"
        ]
      }
    ]
  },
  {
    title: "第9页：未来规划",
    layout: [
      "顶部标题：'未来发展规划'",
      "左侧：短期计划（3-6个月）",
      "中央：中期计划（6-12个月）",
      "右侧：长期愿景（1-2年）",
      "底部：社区建设计划"
    ],
    content: [
      {
        title: "短期计划",
        items: [
          "完善组件库",
          "优化主题系统",
          "增加更多模板",
          "改进用户体验"
        ]
      },
      {
        title: "中期计划",
        items: [
          "AI辅助内容生成",
          "多媒体内容支持",
          "协作编辑功能",
          "云端同步存储"
        ]
      },
      {
        title: "长期愿景",
        items: [
          "构建完整生态系统",
          "支持多种输出格式",
          "插件系统架构",
          "企业级功能支持"
        ]
      },
      {
        title: "社区建设",
        items: [
          "开源社区运营",
          "贡献者激励机制",
          "文档与教程完善",
          "定期版本发布"
        ]
      }
    ]
  },
  {
    title: "第10页：总结与致谢",
    layout: [
      "顶部标题：'总结与致谢'",
      "中央：项目价值总结",
      "左侧：技术亮点回顾",
      "右侧：未来展望",
      "底部：致谢信息"
    ],
    content: [
      {
        title: "项目价值",
        text: "PPT Engineering通过配置驱动和组件化设计，为AI生成PPT提供了标准化框架，降低了AI上下文依赖，实现了完全自定义的PPT页面构建。"
      },
      {
        title: "技术亮点",
        items: [
          "配置驱动的架构设计",
          "组件化的页面容器",
          "降低AI上下文依赖",
          "统一的设计规范"
        ]
      },
      {
        title: "未来展望",
        text: "我们将继续完善项目功能，扩展应用场景，构建活跃的开源社区，让PPT Engineering成为AI时代PPT构建的标准工具。"
      },
      {
        title: "致谢",
        items: [
          "感谢所有贡献者的支持",
          "感谢开源社区的宝贵建议",
          "感谢用户的反馈与使用",
          "感谢AI技术的赋能"
        ]
      }
    ]
  }
]
</script>