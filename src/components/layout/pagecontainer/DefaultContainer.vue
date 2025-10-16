<template>
  <div 
    class="flex flex-col bg-background text-primary border border-border transition-colors duration-300"
    :style="containerStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/**
 * 默认布局容器组件
 * 提供固定1920x1080px的容器
 */
defineOptions({
  name: 'DefaultContainer'
})

/**
 * 计算容器样式
 */
const containerStyle = computed((): CSSProperties => ({
  width: '1920px',
  height: '1080px',
  position: 'relative',
  overflow: 'hidden'
}))
</script>

<style scoped>
/* 只保留必要的样式，其他都通过Tailwind类实现 */
</style>