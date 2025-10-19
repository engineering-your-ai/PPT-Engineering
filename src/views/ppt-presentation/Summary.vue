<template>
  <DefaultContentPage title="总结" subtitle="PPT Engineering的核心价值与优势">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 核心价值 -->
        <div class="flex items-center mb-6">
          <Icon name="Star" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">核心价值</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering通过配置驱动和组件化设计，重新定义了PPT的创建方式，为开发者和内容创作者提供了更高效、更灵活的解决方案。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            我们相信，未来的演示文稿将不再依赖传统模板，而是通过智能配置和组件组合，实现真正个性化的内容表达。
          </p>
        </div>

        <!-- 主要优势 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Award" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主要优势</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Zap" :size="24" color="text-accent1" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">高效开发</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">配置驱动，快速创建</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">组件化，易于维护</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">热重载，实时预览</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Palette" :size="24" color="text-accent2" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">灵活定制</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">主题系统，一键切换</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">自定义组件，扩展性强</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">响应式设计，多端适配</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Code" :size="24" color="text-accent3" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">技术先进</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">Vue 3 + TypeScript</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">Vite 构建工具</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">现代前端技术栈</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Users" :size="24" color="text-accent4" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">易于使用</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-sm text-secondary ml-2">简单配置，快速上手</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-sm text-secondary ml-2">丰富文档，学习资源</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-sm text-secondary ml-2">社区支持，持续更新</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Target" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">应用场景</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center">
              <Icon name="Briefcase" :size="48" color="text-accent1" class="mx-auto mb-4" />
              <h3 class="font-heading text-lg font-semibold text-primary mb-2">企业演示</h3>
              <p class="font-body text-sm text-secondary">产品发布、项目汇报、培训材料</p>
            </div>
            <div class="text-center">
              <Icon name="GraduationCap" :size="48" color="text-accent2" class="mx-auto mb-4" />
              <h3 class="font-heading text-lg font-semibold text-primary mb-2">教育培训</h3>
              <p class="font-body text-sm text-secondary">课程课件、学术报告、知识分享</p>
            </div>
            <div class="text-center">
              <Icon name="Rocket" :size="48" color="text-accent3" class="mx-auto mb-4" />
              <h3 class="font-heading text-lg font-semibold text-primary mb-2">项目展示</h3>
              <p class="font-body text-sm text-secondary">技术分享、作品展示、创意提案</p>
            </div>
          </div>
        </div>

        <!-- 技术亮点 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Lightbulb" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">技术亮点</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="font-heading text-xl font-semibold text-primary mb-4">配置驱动</h3>
              <p class="font-body text-secondary mb-4">
                通过YAML配置文件定义页面结构，无需编写复杂代码即可创建专业演示文稿。
              </p>
              <div class="bg-background border border-border-default rounded p-3 font-mono text-sm">
                <pre class="text-secondary">routes:
  - path: /overview
    component: ProjectOverview
    title: 项目概述</pre>
              </div>
            </div>
            
            <div>
              <h3 class="font-heading text-xl font-semibold text-primary mb-4">组件化设计</h3>
              <p class="font-body text-secondary mb-4">
                提供丰富的预置组件，支持自定义组件开发，实现真正的组件化PPT构建。
              </p>
              <div class="bg-background border border-border-default rounded p-3 font-mono text-sm">
                <pre class="text-secondary">&lt;DefaultContentPage&gt;
  &lt;template #content&gt;
    &lt;!-- 页面内容 --&gt;
  &lt;/template&gt;
&lt;/DefaultContentPage&gt;</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 社区与生态 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Globe" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">社区与生态</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering致力于构建开放、活跃的开发者社区，通过开源协作推动项目发展。
          </p>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="font-heading text-lg font-semibold text-primary mb-3">贡献方式</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="Code" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">代码贡献</span>
                </li>
                <li class="flex items-center">
                  <Icon name="Book" :size="16" color="text-accent2" />
                  <span class="font-body text-sm text-secondary ml-2">文档完善</span>
                </li>
                <li class="flex items-center">
                  <Icon name="MessageSquare" :size="16" color="text-accent3" />
                  <span class="font-body text-sm text-secondary ml-2">问题反馈</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-heading text-lg font-semibold text-primary mb-3">生态建设</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="Package" :size="16" color="text-accent4" />
                  <span class="font-body text-sm text-secondary ml-2">组件库</span>
                </li>
                <li class="flex items-center">
                  <Icon name="Palette" :size="16" color="text-accent5" />
                  <span class="font-body text-sm text-secondary ml-2">主题市场</span>
                </li>
                <li class="flex items-center">
                  <Icon name="Plugin" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">插件生态</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 结束语 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Heart" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">结语</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering不仅仅是一个工具，更是一种全新的演示文稿创建理念。我们相信，通过配置驱动和组件化设计，每个人都能轻松创建专业、美观的演示内容。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            感谢您对PPT Engineering的关注！我们期待与您一起，共同推动演示文稿创建方式的革新。
          </p>
          <div class="text-center mt-6">
            <p class="font-heading text-xl font-semibold text-primary">立即开始您的PPT Engineering之旅！</p>
          </div>
        </div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'Summary'
})
</script>