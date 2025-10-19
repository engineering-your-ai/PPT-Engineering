<template>
  <DefaultContentPage title="项目概述" subtitle="PPT Engineering - AI驱动的PPT构建框架">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 项目标题和核心价值 -->
        <div class="flex items-center mb-6">
          <Icon name="Presentation" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">项目核心价值</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            基于大模型当前通用能力强，但没有记忆能力的现状，构建降低上下文依赖的框架，为AI编写PPT构建基础。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            实现完全自定义的PPT页面构建，而非套用模板。
          </p>
        </div>

        <!-- 技术栈 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Code" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">技术栈</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">前端技术</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">Vue@3 + TypeScript@5</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">Vite@5 + Vue Router@4</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent1" />
                <span class="font-body text-secondary ml-2">Tailwind CSS@3</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">构建工具</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">Vite 构建工具</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">pnpm 包管理</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="20" color="text-accent2" />
                <span class="font-body text-secondary ml-2">TypeScript 类型检查</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 项目特色 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Star" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">项目特色</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="User" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">产品经理主导</h3>
                <p class="font-body text-secondary">作者是产品经理，代码完全依赖AI实现</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Github" :size="24" color="text-accent4" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">开源项目</h3>
                <p class="font-body text-secondary">遵循GPL-3.0-or-later许可证</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Zap" :size="24" color="text-accent5" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">配置驱动</h3>
                <p class="font-body text-secondary">核心配置集中于YAML文件，无需修改代码</p>
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
  name: 'ProjectOverview'
})
</script>