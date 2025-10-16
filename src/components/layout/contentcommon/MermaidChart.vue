<template>
  <MermaidViewer
    ref="mermaidViewer"
    :content="content"
    :src="src"
    :theme="theme"
    :width="width"
    :height="height"
    :show-border="false"
    :preview-enabled="true"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MermaidViewer from '@/components/common/MermaidViewer.vue'

/**
 * MermaidChart 组件接口定义
 * 基于 MermaidViewer 构建的简化版本，专注于图表展示
 */
interface Props {
  /** 图表内容 */
  content?: string
  /** 图表文件路径 */
  src?: string
  /** 主题 */
  theme?: 'default' | 'dark' | 'forest' | 'neutral'
  /** 宽度 */
  width?: string
  /** 高度 */
  height?: string
}

/**
 * Props 默认值配置
 */
const props = withDefaults(defineProps<Props>(), {
  content: '',
  src: '',
  theme: 'default',
  width: '400px',
  height: '400px'
})

// 组件引用
const mermaidViewer = ref<InstanceType<typeof MermaidViewer>>()

/**
 * 重新加载图表
 * 代理到底层 MermaidViewer 组件
 */
const reload = async () => {
  if (mermaidViewer.value) {
    await mermaidViewer.value.reload()
  }
}

/**
 * 清空图表
 * 代理到底层 MermaidViewer 组件
 */
const clear = () => {
  if (mermaidViewer.value) {
    mermaidViewer.value.clear()
  }
}

/**
 * 更新图表内容
 * 代理到底层 MermaidViewer 组件
 * @param newContent 新的图表内容
 */
const updateContent = async (newContent: string) => {
  if (mermaidViewer.value) {
    await mermaidViewer.value.updateContent(newContent)
  }
}

/**
 * 打开/关闭预览弹层
 */
// 预览功能由 MermaidViewer 内部处理

// 暴露组件方法
defineExpose({
  reload,
  clear,
  updateContent
})
</script>

