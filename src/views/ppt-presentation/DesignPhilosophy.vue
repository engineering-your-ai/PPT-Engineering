<template>
  <DefaultContentPage title="设计理念" subtitle="构建灵活、可扩展的PPT框架">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 核心理念 -->
        <div class="flex items-center mb-6">
          <Icon name="Lightbulb" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">核心理念</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            脱离.ppt文件，基于Vue构建，配置驱动，组件化容器，实现完全自定义的PPT页面构建。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            为AI编写PPT构建基础，降低上下文依赖，实现灵活的页面创建和管理。
          </p>
        </div>

        <!-- 设计原则 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Compass" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">设计原则</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">配置优先</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">YAML配置文件驱动</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">无需修改代码</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">集中管理</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">组件化设计</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">可复用容器组件</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">灵活的内容布局</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">模块化结构</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 架构特点 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Architecture" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">架构特点</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="FileText" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">页面即组件</h3>
                <p class="font-body text-secondary">每个页面都是独立的Vue组件，便于维护和扩展</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Palette" :size="24" color="text-accent4" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">主题系统</h3>
                <p class="font-body text-secondary">支持多主题切换，满足不同场景需求</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Route" :size="24" color="text-accent5" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">路由自动化</h3>
                <p class="font-body text-secondary">基于配置文件自动生成路由，简化开发流程</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 开发体验 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Code" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">开发体验</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="Zap" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">快速开发</h3>
                <p class="font-body text-secondary">简单的页面创建流程，无需复杂配置</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Book" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">完善文档</h3>
                <p class="font-body text-secondary">详细的指南文档，降低学习成本</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Tools" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">工具支持</h3>
                <p class="font-body text-secondary">提供PDF导出、全屏放映等功能</p>
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
  name: 'DesignPhilosophy'
})
</script>