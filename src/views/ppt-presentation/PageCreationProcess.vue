<template>
  <DefaultContentPage title="页面创建流程" subtitle="简单高效的页面创建方法">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 创建流程概览 -->
        <div class="flex items-center mb-6">
          <Icon name="FilePlus" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">页面创建流程概览</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering提供了简单高效的页面创建流程，通过组件化容器和配置驱动的方式，快速构建专业PPT页面。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            页面创建分为三个主要步骤：创建Vue组件、配置路由信息和使用容器组件。
          </p>
        </div>

        <!-- 创建步骤 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="List" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">创建步骤</h2>
        </div>
        
        <div class="space-y-6">
          <!-- 步骤1 -->
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
              <h3 class="font-heading text-xl font-semibold text-primary ml-4">创建Vue组件</h3>
            </div>
            <p class="font-body text-secondary mb-4">在src/views目录下创建Vue组件文件：</p>
            <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto">
              <pre>&lt;template&gt;
  &lt;DefaultContentPage title="页面标题" subtitle="页面副标题"&gt;
    &lt;template #content&gt;
      &lt;div class="space-y-8 p-6"&gt;
        &lt;!-- 页面内容 --&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/DefaultContentPage&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'

defineOptions({
  name: 'PageName'
})
&lt;/script&gt;</pre>
            </div>
          </div>

          <!-- 步骤2 -->
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
              <h3 class="font-heading text-xl font-semibold text-primary ml-4">配置路由信息</h3>
            </div>
            <p class="font-body text-secondary mb-4">在public/config/routes.config.yaml中添加路由配置：</p>
            <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto">
              <pre>routes:
  - module: "module-name"
    title: "模块名称"
    icon: "IconName"
    children:
      - component: "PageName"
        title: "页面标题"
        icon: "PageIcon"
        order: 1</pre>
            </div>
          </div>

          <!-- 步骤3 -->
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
              <h3 class="font-heading text-xl font-semibold text-primary ml-4">使用容器组件</h3>
            </div>
            <p class="font-body text-secondary mb-4">选择合适的容器组件构建页面布局：</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-default border border-border-default rounded-lg p-4">
                <h4 class="font-heading text-lg font-semibold text-primary mb-2">DefaultCoverPage</h4>
                <p class="font-body text-secondary text-sm">章节封面容器，居中布局</p>
              </div>
              <div class="bg-default border border-border-default rounded-lg p-4">
                <h4 class="font-heading text-lg font-semibold text-primary mb-2">DefaultContentPage</h4>
                <p class="font-body text-secondary text-sm">内容页面容器，标准布局</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 页面布局 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Layout" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">页面布局</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">页面尺寸</h3>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">固定尺寸：1920x1080px</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">内容区域高度：约950px</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">PPT风格排版</span>
            </li>
          </ul>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">布局原则</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">模块化内容组织</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">清晰的视觉层次</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">合理的内容间距</span>
            </li>
          </ul>
        </div>

        <!-- 最佳实践 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Lightbulb" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">最佳实践</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="FileText" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">内容组织</h3>
                <p class="font-body text-secondary">使用space-y-8等间距类保持内容一致性，合理划分内容模块</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Icon" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">图标使用</h3>
                <p class="font-body text-secondary">合理使用图标增强视觉效果，保持图标风格一致性</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Palette" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">主题适配</h3>
                <p class="font-body text-secondary">使用主题变量确保页面在不同主题下正常显示</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'PageCreationProcess'
})
</script>