<template>
  <DefaultContentPage title="主题系统" subtitle="灵活的多主题支持与自定义">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 主题系统概览 -->
        <div class="flex items-center mb-6">
          <Icon name="Palette" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主题系统概览</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering内置了强大的主题系统，支持多主题切换和自定义配色方案，满足不同场景的演示需求。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            通过YAML配置文件定义主题，包括颜色、字体、样式等视觉元素，实现一键切换主题效果。
          </p>
        </div>

        <!-- 内置主题 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="SwatchBook" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">内置主题</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <div class="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
              <h3 class="font-heading text-xl font-semibold text-primary">蓝色主题 (blue)</h3>
            </div>
            <p class="font-body text-secondary mb-4">白底蓝色，经典商务风格</p>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">主色调：#3B82F6</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">辅助色：#64748B</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">适用场景：商务演示</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <div class="w-6 h-6 bg-gray-800 rounded-full mr-3"></div>
              <h3 class="font-heading text-xl font-semibold text-primary">深蓝主题 (darkBlue)</h3>
            </div>
            <p class="font-body text-secondary mb-4">深邃背景，黑底白字</p>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">主色调：#1E40AF</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">背景色：#111827</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">适用场景：暗色环境</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 主题配置 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Settings" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主题配置</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">配置结构</h3>
          <div class="font-mono text-sm text-secondary space-y-2 mb-6">
            <div class="flex">
              <span class="text-accent1">themes:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">theme-name:</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">name:</span>
              <span class="text-secondary ml-2">"主题名称"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">description:</span>
              <span class="text-secondary ml-2">"主题描述"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">logo:</span>
              <span class="text-secondary ml-2">"logo路径"</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">palette:</span>
              <span class="text-secondary ml-2"># 调色板</span>
            </div>
            <div class="flex ml-8">
              <span class="text-accent3">typography:</span>
              <span class="text-secondary ml-2"># 字体配置</span>
            </div>
          </div>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">调色板配置</h3>
          <div class="font-mono text-sm text-secondary space-y-2">
            <div class="flex">
              <span class="text-accent1">palette:</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">primary:</span>
              <span class="text-secondary ml-2">"#3B82F6"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">secondary:</span>
              <span class="text-secondary ml-2">"#64748B"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">accent1:</span>
              <span class="text-secondary ml-2">"#10B981"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">accent2:</span>
              <span class="text-secondary ml-2">"#F59E0B"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">accent3:</span>
              <span class="text-secondary ml-2">"#EF4444"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">accent4:</span>
              <span class="text-secondary ml-2">"#8B5CF6"</span>
            </div>
            <div class="flex ml-4">
              <span class="text-accent2">accent5:</span>
              <span class="text-secondary ml-2">"#EC4899"</span>
            </div>
          </div>
        </div>

        <!-- 主题切换 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="RefreshCw" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">主题切换</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="MousePointer" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">UI切换</h3>
                <p class="font-body text-secondary">通过界面上的主题切换按钮，一键切换不同主题</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Code" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">配置切换</h3>
                <p class="font-body text-secondary">修改themes.config.yaml中的defaultTheme字段</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Zap" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">实时预览</h3>
                <p class="font-body text-secondary">主题切换后立即生效，无需刷新页面</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 自定义主题 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Paintbrush" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">自定义主题</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">创建步骤</h3>
          <ol class="space-y-3">
            <li class="flex items-start">
              <div class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-3 mt-0.5">1</div>
              <div>
                <h4 class="font-heading text-lg font-semibold text-primary">定义主题配置</h4>
                <p class="font-body text-secondary">在themes.config.yaml中添加新的主题配置</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-3 mt-0.5">2</div>
              <div>
                <h4 class="font-heading text-lg font-semibold text-primary">配置调色板</h4>
                <p class="font-body text-secondary">定义主色调、辅助色和强调色</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-3 mt-0.5">3</div>
              <div>
                <h4 class="font-heading text-lg font-semibold text-primary">设置字体样式</h4>
                <p class="font-body text-secondary">配置标题、正文等字体样式</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-3 mt-0.5">4</div>
              <div>
                <h4 class="font-heading text-lg font-semibold text-primary">应用主题</h4>
                <p class="font-body text-secondary">设置defaultTheme为新创建的主题</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'ThemeSystem'
})
</script>