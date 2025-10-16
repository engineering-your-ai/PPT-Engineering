<template>
  <div class="drawio-chart" :style="containerStyle">
    <DrawioViewer
      :src="src"
      :width="width"
      :height="height"
      :showBorder="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DrawioViewer from '@/components/common/DrawioViewer.vue'

interface Props {
  /** 图表文件路径或URL */
  src?: string
  /** 图表宽度 */
  width?: string | number
  /** 图表高度 */
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  width: '500px',
  height: '400px',
})

const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height
}))

// 对外暴露一个简单的 reload 方法以便父组件调用
defineExpose({
  reload: () => {
    // 该方法留空，父组件可以通过重新传入 src 来触发刷新
  }
})
</script>

<style scoped>
.drawio-chart {
  width: 100%;
  height: 100%;
}
</style>