<template>
  <DefaultContentPage title="对话截图展示" subtitle="各个页面多轮调整的对话截图">
    <template #content>
      <div class="h-full flex flex-col">
        <!-- 介绍部分 -->
        <div class="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
          <p class="font-body text-xl text-secondary leading-relaxed">
            以下是各页面多轮调整的对话截图，包括封面页、设计理念、项目架构和当前页面的完整展示。
          </p>
        </div>

        <!-- 截图展示区域 -->
        <div class="flex-1 overflow-y-auto pb-6">
          <!-- 封面页 -->
          <div class="mb-10">
            <div class="flex items-center mb-4">
              <div class="h-8 w-1 bg-accent1 rounded-full mr-3"></div>
              <h3 class="font-heading text-2xl font-bold text-primary">封面页</h3>
            </div>
            <div class="grid grid-cols-3 gap-6 pl-4">
              <div v-for="i in 3" :key="`round1-${i}`" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <div class="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 class="font-heading text-lg font-semibold text-secondary">封面页截图 {{ i }}</h4>
                </div>
                <div class="p-4">
                  <img 
                    :src="getImagePath(1, i)" 
                    alt="封面页截图 ${i}" 
                    class="w-full h-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 设计理念页面 -->
          <div class="mb-10">
            <div class="flex items-center mb-4">
              <div class="h-8 w-1 bg-accent2 rounded-full mr-3"></div>
              <h3 class="font-heading text-2xl font-bold text-primary">设计理念页面</h3>
            </div>
            <div class="grid grid-cols-3 gap-6 pl-4">
              <div v-for="i in 10" :key="`round2-${i}`" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <div class="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 class="font-heading text-lg font-semibold text-secondary">设计理念截图 {{ i }}</h4>
                </div>
                <div class="p-4">
                  <img 
                    :src="getImagePath(2, i)" 
                    alt="设计理念截图 ${i}" 
                    class="w-full h-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 项目架构页面 -->
          <div class="mb-6">
            <div class="flex items-center mb-4">
              <div class="h-8 w-1 bg-accent3 rounded-full mr-3"></div>
              <h3 class="font-heading text-2xl font-bold text-primary">项目架构页面</h3>
            </div>
            <div class="grid grid-cols-3 gap-6 pl-4">
              <div v-for="i in 3" :key="`round3-${i}`" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <div class="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 class="font-heading text-lg font-semibold text-secondary">项目架构截图 {{ i }}</h4>
                </div>
                <div class="p-4">
                  <img 
                    :src="getImagePath(3, i)" 
                    alt="项目架构截图 ${i}" 
                    class="w-full h-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 当前页面 -->
          <div class="mb-6">
            <div class="flex items-center mb-4">
              <div class="h-8 w-1 bg-accent4 rounded-full mr-3"></div>
              <h3 class="font-heading text-2xl font-bold text-primary">当前页面</h3>
            </div>
            <div class="grid grid-cols-3 gap-6 pl-4">
              <div v-for="i in 4" :key="`round4-${i}`" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <div class="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 class="font-heading text-lg font-semibold text-secondary">当前页面截图 {{ i }}</h4>
                </div>
                <div class="p-4">
                  <img 
                    :src="getImagePath(4, i)" 
                    alt="当前页面截图 ${i}" 
                    class="w-full h-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
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
import { resolveResourcePath } from '@/core/utils/path'

// 处理图片路径的函数
const getImagePath = (round: number, index: number): string => {
  return resolveResourcePath(`img/插图/多轮对话章节/${round}-${index}.png`)
}

defineOptions({
  name: 'DialogScreenshots'
})
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>