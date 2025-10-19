<template>
  <DefaultContentPage title="设计理念" subtitle="构建灵活、可扩展的PPT框架">
    <template #content>
      <div class="h-full flex flex-col">
        <!-- 核心理念部分 - 使用渐变背景和强调色 -->
        <div class="mb-6 p-6 rounded-xl  from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full  mr-4 border-2 border-accent1">
              <Icon name="Lightbulb" :size="28" color="accent1" />
            </div>
            <h2 class="font-heading text-4xl font-bold text-primary">核心理念</h2>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-accent1/30">
              <p class="font-body text-xl text-secondary leading-relaxed">
                脱离.ppt文件，基于Vue构建，配置驱动，组件化容器，实现完全自定义的PPT页面构建。
              </p>
            </div>
            <div class="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-accent1/30">
              <p class="font-body text-xl text-secondary leading-relaxed">
                为AI编写PPT构建基础，降低上下文依赖，实现灵活的页面创建和管理。
              </p>
            </div>
          </div>
        </div>

        <!-- 设计原则和架构特点 - 一行两栏布局 -->
        <div class="flex-1 grid grid-cols-2 gap-8">
          <!-- 设计原则部分 -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
            <div class="flex items-center mb-4">
              <div class="p-3 rounded-full bg-white/70 mr-4 border-2 border-accent2">
                <Icon name="Compass" :size="24" color="accent2" />
              </div>
              <h2 class="font-heading text-4xl font-bold text-primary">设计原则</h2>
            </div>
            
            <!-- 原则卡片列表 - 改为网格布局，一行显示两个特点 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white/70 rounded-lg p-6 border border-accent1/20 shadow-sm h-[220px]">
                <div class="flex items-center mb-4">
                  <div class="p-2 rounded-lg bg-accent1/10 mr-3">
                    <Icon name="Settings" :size="20" color="accent1" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-accent1">配置优先</h3>
                </div>
                <ul class="space-y-3 ml-2">
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent1" />
                    <span class="font-body text-secondary ml-2 text-lg">YAML配置文件驱动</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent1" />
                    <span class="font-body text-secondary ml-2 text-lg">无需修改代码</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent1" />
                    <span class="font-body text-secondary ml-2 text-lg">集中管理</span>
                  </li>
                </ul>
              </div>
              
              <div class="bg-white/70 rounded-lg p-6 border border-accent2/20 shadow-sm h-[220px]">
                <div class="flex items-center mb-4">
                  <div class="p-2 rounded-lg bg-accent2/10 mr-3">
                    <Icon name="Package" :size="20" color="accent2" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-accent2">组件化设计</h3>
                </div>
                <ul class="space-y-3 ml-2">
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent2" />
                    <span class="font-body text-secondary ml-2 text-lg">可复用容器组件</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent2" />
                    <span class="font-body text-secondary ml-2 text-lg">灵活的内容布局</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent2" />
                    <span class="font-body text-secondary ml-2 text-lg">模块化结构</span>
                  </li>
                </ul>
              </div>
              
              <!-- 快速开发卡片 -->
              <div class="bg-white/70 rounded-lg p-6 border border-accent3/20 shadow-sm h-[220px]">
                <div class="flex items-center mb-4">
                  <div class="p-2 rounded-lg bg-accent3/10 mr-3">
                    <Icon name="Zap" :size="20" color="accent3" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-accent3">降低页面文件上下文依赖</h3>
                </div>
                <ul class="space-y-3 ml-2">
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent3" />
                    <span class="font-body text-secondary ml-2 text-lg">聚焦单个页面文件</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent3" />
                    <span class="font-body text-secondary ml-2 text-lg">整体布局约束，只需关注内容布恩</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent3" />
                    <span class="font-body text-secondary ml-2 text-lg">即时预览</span>
                  </li>
                </ul>
              </div>
              
              <!-- 自由布局能力卡片 -->
              <div class="bg-white/70 rounded-lg p-6 border border-accent4/20 shadow-sm h-[220px]">
                <div class="flex items-center mb-4">
                  <div class="p-2 rounded-lg bg-accent4/10 mr-3">
                    <Icon name="Layout" :size="20" color="accent4" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-accent4">保留自由布局能力</h3>
                </div>
                <ul class="space-y-3 ml-2">
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent4" />
                    <span class="font-body text-secondary ml-2 text-lg">使用DefaultContainer组件</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent4" />
                    <span class="font-body text-secondary ml-2 text-lg">完全自定义布局</span>
                  </li>
                  <li class="flex items-center">
                    <Icon name="CheckCircle" :size="14" color="accent4" />
                    <span class="font-body text-secondary ml-2 text-lg">脱离标准模板限制</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 架构特点部分 -->
          <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200 shadow-sm">
            <div class="flex items-center mb-4">
              <div class="p-3 rounded-full bg-white/70 mr-4 border-2 border-accent4">
                <Icon name="Layout" :size="24" color="accent4" />
              </div>
              <h2 class="font-heading text-4xl font-bold text-primary">架构特点</h2>
            </div>
            
            <!-- 特点卡片列表 -->
            <div class="space-y-6">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 hover:shadow-md transition-shadow h-[150px]">
                <div class="flex items-center mb-2">
                  <div class="p-2 rounded-lg bg-blue-100 mr-3">
                    <Icon name="FileText" :size="20" color="blue" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-blue-600">页面即组件</h3>
                </div>
                <p class="font-body text-secondary text-lg">每个页面都是独立的Vue组件，便于维护和扩展</p>
              </div>
              
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 hover:shadow-md transition-shadow h-[150px]">
                <div class="flex items-center mb-2">
                  <div class="p-2 rounded-lg bg-green-100 mr-3">
                    <Icon name="Palette" :size="20" color="green" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-green-600">主题系统</h3>
                </div>
                <p class="font-body text-secondary text-lg">支持多主题切换，满足不同场景需求</p>
              </div>
              
              <div class="bg-gradient-to-br from-accent6-50 to-orange-50 rounded-lg p-6 border border-accent6-200 hover:shadow-md transition-shadow h-[150px]">
                <div class="flex items-center mb-2">
                  <div class="p-2 rounded-lg bg-accent6-100 mr-3">
                    <Icon name="GitBranch" :size="20" color="accent6" />
                  </div>
                  <h3 class="font-heading text-2xl font-bold text-accent6-600">路由自动化</h3>
                </div>
                <p class="font-body text-secondary text-lg">基于配置文件自动生成路由，简化开发流程</p>
              </div>
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

defineOptions({
  name: 'FixedDesignPhilosophy'
})
</script>