<template>
  <DefaultContentPage title="配置系统" subtitle="灵活的YAML配置驱动架构">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 配置系统概览 -->
        <div class="flex items-center mb-6">
          <Icon name="Settings" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">配置系统概览</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering采用YAML配置文件驱动架构，所有核心配置都集中在public/config目录下，无需修改代码即可实现功能定制。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            配置系统包括应用配置、路由配置和主题配置三大部分，实现了高度的灵活性和可维护性。
          </p>
        </div>

        <!-- 应用配置 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="App" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">应用配置 (app.config.yaml)</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">应用基本信息</h3>
          <div class="font-mono text-sm text-secondary space-y-2 mb-6">
            <div class="flex">
              <span class="text-accent1">app:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">icon:</span>
              <span class="text-secondary ml-2">"Presentation"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">title:</span>
              <span class="text-secondary ml-2">"PPT-Engineering"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">version:</span>
              <span class="text-secondary ml-2">"1.0.0"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">baseUrl:</span>
              <span class="text-secondary ml-2">"/PPT-Engineering/"</span>
            </div>
          </div>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">功能特性开关</h3>
          <div class="font-mono text-sm text-secondary space-y-2">
            <div class="flex">
              <span class="text-accent1">features:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">showPdfExportButton:</span>
              <span class="text-secondary ml-2">true</span>
            </div>
          </div>
        </div>

        <!-- 路由配置 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Route" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">路由配置 (routes.config.yaml)</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">路由结构</h3>
          <div class="font-mono text-sm text-secondary space-y-2 mb-6">
            <div class="flex">
              <span class="text-accent1">routes:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">- module:</span>
              <span class="text-secondary ml-2">"home"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">title:</span>
              <span class="text-secondary ml-2">"首页"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">icon:</span>
              <span class="text-secondary ml-2">"Home"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">children:</span>
            </div>
            <div class="flex ml-12">
              <span class="text-accent4">- component:</span>
              <span class="text-secondary ml-2">"HomePage"</span>
            </div>
            <div class="flex ml-12">
              <span class="text-accent4">- component:</span>
              <span class="text-secondary ml-2">"TableOfContentsPage"</span>
            </div>
          </div>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">路由特性</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">模块化组织</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">自动路由生成</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">嵌套路由支持</span>
            </li>
          </ul>
        </div>

        <!-- 主题配置 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Palette" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主题配置 (themes.config.yaml)</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">主题定义</h3>
          <div class="font-mono text-sm text-secondary space-y-2 mb-6">
            <div class="flex">
              <span class="text-accent1">themes:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">blue:</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">name:</span>
              <span class="text-secondary ml-2">"蓝色主题"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">description:</span>
              <span class="text-secondary ml-2">"白底蓝色，经典商务风格"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">logo:</span>
              <span class="text-secondary ml-2">"/images/logo-blue.png"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">palette:</span>
            </div>
            <div class="flex ml-12">
              <span class="text-accent4">primary:</span>
              <span class="text-secondary ml-2">"#3B82F6"</span>
            </div>
            <div class="flex ml-12">
              <span class="text-accent4">secondary:</span>
              <span class="text-secondary ml-2">"#64748B"</span>
            </div>
          </div>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">主题特性</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">多主题支持</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">自定义配色方案</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">字体和样式配置</span>
            </li>
          </ul>
        </div>

        <!-- 配置优势 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Star" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">配置优势</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="Zap" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">低代码配置</h3>
                <p class="font-body text-secondary">无需修改代码，通过修改YAML文件即可实现功能定制</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="RefreshCw" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">热重载支持</h3>
                <p class="font-body text-secondary">配置文件修改后自动重载，实时预览效果</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="GitBranch" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">版本控制友好</h3>
                <p class="font-body text-secondary">YAML格式易于版本控制和团队协作</p>
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
  name: 'ConfigurationSystem'
})
</script>