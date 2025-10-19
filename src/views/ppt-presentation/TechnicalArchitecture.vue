<template>
  <DefaultContentPage title="技术架构" subtitle="基于Vue 3的现代化PPT构建框架">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 整体架构 -->
        <div class="flex items-center mb-6">
          <Icon name="Architecture" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">整体架构</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            基于Vue 3 + TypeScript + Vite构建的现代化前端框架，采用组件化设计，支持配置驱动的页面管理。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            通过YAML配置文件管理路由、主题和应用设置，实现灵活的PPT页面构建。
          </p>
        </div>

        <!-- 核心技术栈 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Code" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">核心技术栈</h2>
        </div>
        
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-default border border-border-default rounded-lg p-4 shadow-theme-sm">
            <h3 class="font-heading text-lg font-semibold text-primary mb-3">前端框架</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">Vue 3.4.15</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">TypeScript 5.3.3</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">Vue Router 4.2.5</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-4 shadow-theme-sm">
            <h3 class="font-heading text-lg font-semibold text-primary mb-3">构建工具</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Vite 5.0.12</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Tailwind CSS 3.4.1</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">PostCSS 8.4.33</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-4 shadow-theme-sm">
            <h3 class="font-heading text-lg font-semibold text-primary mb-3">功能库</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">js-yaml 4.1.0</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">jspdf 2.5.1</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent3" />
                <span class="font-body text-sm text-secondary ml-2">html2canvas 1.4.1</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 目录结构 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Folder" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">目录结构</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <div class="font-mono text-sm text-secondary space-y-2">
            <div class="flex">
              <span class="text-accent1">ppt-engineering/</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">├── public/</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│   └── config/</span>
              <span class="text-secondary ml-2"># 配置文件目录</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│       ├── app.config.yaml</span>
              <span class="text-secondary ml-2"># 应用配置</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│       ├── routes.config.yaml</span>
              <span class="text-secondary ml-2"># 路由配置</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│       └── themes.config.yaml</span>
              <span class="text-secondary ml-2"># 主题配置</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">├── src/</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│   ├── components/</span>
              <span class="text-secondary ml-2"># 组件目录</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│   ├── views/</span>
              <span class="text-secondary ml-2"># 页面目录</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│   ├── router/</span>
              <span class="text-secondary ml-2"># 路由管理</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">│   └── main.ts</span>
              <span class="text-secondary ml-2"># 入口文件</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">├── docs/</span>
              <span class="text-secondary ml-2"># 文档目录</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">└── package.json</span>
            </div>
          </div>
        </div>

        <!-- 配置系统 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Settings" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">配置系统</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">应用配置</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">应用基本信息</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">功能开关</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">全局设置</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">路由配置</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">页面路由定义</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">模块分组</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">自动生成路由</span>
              </li>
            </ul>
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
  name: 'TechnicalArchitecture'
})
</script>