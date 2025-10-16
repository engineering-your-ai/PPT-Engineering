<template>
  <DefaultCoverPage 
    title="功能展示模块"
    subtitle="展示项目中的各种功能组件和主题系统"
  >
    <template #content>
      <div class="space-y-8 p-6">


        <!-- 功能卡片网格 -->
        <div class="grid grid-cols-3 gap-6">
          <!-- 主题展示卡片 -->
          <div class="bg-background-subtle border border-border rounded-lg overflow-hidden hover:border-primary-300 transition-all duration-300 hover:shadow-lg">
            <div class="bg-accent1-100 p-6">
              <div class="flex items-center mb-3">
                <Icon name="Palette" :size="24" class="mr-2 text-accent1-700" />
                <h3 class="font-heading text-xl font-semibold text-accent1-800">主题系统</h3>
              </div>
              <p class="font-body text-accent1-700 text-sm">
                展示所有扩展的 Tailwind 变量和主题色彩系统
              </p>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-center">
                <span class="bg-accent1-200 text-accent1-800 px-3 py-1 rounded-full text-xs font-medium">
                  主题系统
                </span>
                <router-link 
                  to="/feature-showcase/theme-showcase" 
                  class="text-link hover:text-link-hover text-sm font-medium transition-colors"
                >
                  查看展示 →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Mermaid图表卡片 -->
          <div class="bg-background-subtle border border-border rounded-lg overflow-hidden hover:border-secondary-300 transition-all duration-300 hover:shadow-lg">
            <div class="bg-accent2-100 p-6">
              <div class="flex items-center mb-3">
                <Icon name="GitBranch" :size="24" class="mr-2 text-accent2-700" />
                <h3 class="font-heading text-xl font-semibold text-accent2-800">Mermaid 图表</h3>
              </div>
              <p class="font-body text-accent2-700 text-sm">
                展示 Mermaid 图表组件的各种图表类型和功能
              </p>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-center">
                <span class="bg-accent2-200 text-accent2-800 px-3 py-1 rounded-full text-xs font-medium">
                  图表组件
                </span>
                <router-link 
                  to="/feature-showcase/mermaid-showcase" 
                  class="text-link hover:text-link-hover text-sm font-medium transition-colors"
                >
                  查看展示 →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Draw.io图表卡片 -->
          <div class="bg-background-subtle border border-border rounded-lg overflow-hidden hover:border-tertiary-300 transition-all duration-300 hover:shadow-lg">
            <div class="bg-accent3-100 p-6">
              <div class="flex items-center mb-3">
                <Icon name="FileImage" :size="24" class="mr-2 text-accent3-700" />
                <h3 class="font-heading text-xl font-semibold text-accent3-800">Draw.io 图表</h3>
              </div>
              <p class="font-body text-accent3-700 text-sm">
                展示 Draw.io 图表组件的加载和显示功能
              </p>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-center">
                <span class="bg-accent3-200 text-accent3-800 px-3 py-1 rounded-full text-xs font-medium">
                  图表组件
                </span>
                <router-link 
                  to="/feature-showcase/drawio-showcase" 
                  class="text-link hover:text-link-hover text-sm font-medium transition-colors"
                >
                  查看展示 →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DefaultCoverPage>
</template>

<script setup lang="ts">
import DefaultCoverPage from '@/components/layout/pagecontainer/DefaultCoverPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'FeatureShowcaseIndex'
})
</script>