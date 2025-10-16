<template>
  <DefaultContainer>
    <div class="w-full h-full flex items-center justify-center">
      <!-- 内容区域 -->
      <div class="w-full h-full flex flex-col items-center justify-center" >
        <!-- 主标题（必选） -->
        <div class="text-center mb-8">
          <slot name="title">
            <h1 class="font-heading text-6xl font-bold leading-tight text-primary">{{ props.title }}</h1>
          </slot>
        </div>

        <!-- 副标题（可选） -->
        <div v-if="props.subtitle" class="text-center mb-12">
          <slot name="subtitle">
            <h2 class="font-heading text-3xl font-medium leading-relaxed text-secondary">{{ props.subtitle }}</h2>
          </slot>
        </div>

        <!-- 自定义内容区域（可选） -->
        <div v-if="slots.content" class="w-full mt-8 max-h-96 overflow-y-auto flex flex-col justify-center items-center content-section">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import DefaultContainer from '@/components/layout/pagecontainer/DefaultContainer.vue'

/**
 * 章节封面容器组件
 * 提供固定尺寸（1920x1080px）的章节封面布局
 * 支持主标题、副标题和自定义内容区域的居中展示
 */
defineOptions({
  name: 'DefaultCoverContainer'
})

/**
 * 组件属性定义
 */
interface Props {
  /** 标题文本（必须） */
  title: string
  /** 副标题文本（可选） */
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {})

/**
 * 获取插槽实例
 */
const slots = useSlots()
</script>

<style scoped>

.content-section {
  /* 添加平滑滚动效果 */
  scroll-behavior: smooth;
  /* 隐藏滚动条但保持功能 */
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}

.content-section::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>



