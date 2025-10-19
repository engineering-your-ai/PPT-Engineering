<template>
  <DefaultContentPage title="项目架构" subtitle="组件化、配置驱动的PPT框架架构">
    <template #content>
      <div class="h-full flex flex-col">
        <!-- 架构概述 -->
        <div class="mb-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-white/70 mr-4 border-2 border-accent1">
              <Icon name="Layout" :size="28" color="accent1" />
            </div>
            <h2 class="font-heading text-4xl font-bold text-primary">架构概述</h2>
          </div>
          <p class="font-body text-xl text-secondary leading-relaxed">
            PPT-Engineering采用分层架构设计，以配置驱动为核心理念，实现了组件化、可扩展的PPT构建框架。
          </p>
        </div>

        <!-- 主要内容区域：架构图和说明 -->
        <div class="flex-1 flex gap-6">
          <!-- 左侧：架构图 -->
          <div class="w-3/5 flex flex-col items-center justify-center p-6 bg-white/50 rounded-xl border border-gray-200">
            <h3 class="font-heading text-2xl font-bold text-primary mb-6">系统架构图</h3>
            <div class="w-full">
              <DrawioChart 
                src="/img/flow/project-architecture.drawio" 
                width="100%" 
                height="590px" 
              />
            </div>
          </div>

          <!-- 右侧：架构说明（上下排列） -->
          <div class="w-2/5 flex flex-col gap-6">
            <!-- 上：架构特点 -->
            <div class="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="p-3 rounded-full bg-white/70 mr-4 border-2 border-accent2">
                  <Icon name="CheckCircle" :size="24" color="accent2" />
                </div>
                <h2 class="font-heading text-3xl font-bold text-primary">架构特点</h2>
              </div>
              
              <ul class="space-y-4">
                <li class="flex items-start">
                  <Icon name="Layers" :size="20" color="accent2" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">分层设计，职责清晰，便于维护和扩展</p>
                </li>
                <li class="flex items-start">
                  <Icon name="Settings" :size="20" color="accent2" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">配置驱动，无需修改代码即可调整功能</p>
                </li>
                <li class="flex items-start">
                  <Icon name="Package" :size="20" color="accent2" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">组件化架构，提高代码复用性</p>
                </li>
                <li class="flex items-start">
                  <Icon name="GitBranch" :size="20" color="accent2" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">路由自动化，简化开发流程</p>
                </li>
              </ul>
            </div>

            <!-- 下：核心优势 -->
            <div class="flex-1 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="p-3 rounded-full bg-white/70 mr-4 border-2 border-accent4">
                  <Icon name="Star" :size="24" color="accent4" />
                </div>
                <h2 class="font-heading text-3xl font-bold text-primary">核心优势</h2>
              </div>
              
              <ul class="space-y-4">
                <li class="flex items-start">
                  <Icon name="Zap" :size="20" color="accent4" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">降低页面文件上下文依赖，聚焦单个页面开发</p>
                </li>
                <li class="flex items-start">
                  <Icon name="Palette" :size="20" color="accent4" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">主题系统支持，灵活切换视觉风格</p>
                </li>
                <li class="flex items-start">
                  <Icon name="Layout" :size="20" color="accent4" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">保留自由布局能力，满足多样化需求</p>
                </li>
                <li class="flex items-start">
                  <Icon name="Cpu" :size="20" color="accent4" class="mt-1 mr-3 flex-shrink-0" />
                  <p class="font-body text-secondary">为AI生成PPT提供标准化框架支持</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'
import DrawioChart from '@/components/layout/contentcommon/DrawioChart.vue'

defineOptions({
  name: 'ProjectArchitecture'
})
</script>