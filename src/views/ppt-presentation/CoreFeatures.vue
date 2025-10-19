<template>
  <DefaultContentPage title="核心功能" subtitle="强大的PPT构建与管理功能">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 功能概览 -->
        <div class="flex items-center mb-6">
          <Icon name="Star" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">功能概览</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering提供了一套完整的PPT构建与管理功能，从页面创建到主题配置，从路由管理到导出功能，全方位满足演示需求。
          </p>
        </div>

        <!-- 主要功能 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Zap" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主要功能</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="FileText" :size="24" color="text-accent1" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">页面管理</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-secondary ml-2">基于组件的页面创建</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-secondary ml-2">灵活的内容布局</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-secondary ml-2">可复用页面容器</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Route" :size="24" color="text-accent2" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">路由配置</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-secondary ml-2">YAML配置驱动</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-secondary ml-2">自动路由生成</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-secondary ml-2">模块化组织</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Palette" :size="24" color="text-accent3" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">主题系统</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-secondary ml-2">多主题支持</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-secondary ml-2">实时主题切换</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-secondary ml-2">自定义配色方案</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Icon" :size="24" color="text-accent4" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">图标支持</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-secondary ml-2">丰富的图标库</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-secondary ml-2">可配置图标系统</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent4" />
                <span class="font-body text-secondary ml-2">灵活的图标使用</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 高级功能 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Rocket" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">高级功能</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="Monitor" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">全屏放映</h3>
                <p class="font-body text-secondary">支持全屏模式演示，提供沉浸式演示体验</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="FileDownload" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">PDF导出</h3>
                <p class="font-body text-secondary">一键导出PDF格式，便于分享和打印</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Chart" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">图表支持</h3>
                <p class="font-body text-secondary">集成Mermaid和Draw.io图表，支持复杂数据可视化</p>
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
              <Icon name="Book" :size="24" color="text-accent4" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">完善文档</h3>
                <p class="font-body text-secondary">提供详细的指南文档，包括主题系统、图标系统、路由配置和页面创建</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Tools" :size="24" color="text-accent5" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">开发工具</h3>
                <p class="font-body text-secondary">支持热重载、TypeScript类型检查、代码格式化等现代开发工具</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Github" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">开源生态</h3>
                <p class="font-body text-secondary">遵循GPL-3.0-or-later许可证，支持社区贡献和扩展</p>
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
  name: 'CoreFeatures'
})
</script>