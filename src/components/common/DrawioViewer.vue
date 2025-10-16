<template>
  <div class="drawio-viewer" :class="[
    props.class,
    {
      'drawio-viewer--loading': loading,
      'drawio-viewer--error': error,
      'drawio-viewer--no-border': !props.showBorder
    }
  ]" :style="containerStyle">
    <!-- 加载状态 -->
    <div v-if="loading" class="drawio-viewer__loading layout-center">
      <div class="animate-spin">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-dasharray="31.416" stroke-dashoffset="31.416">
            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416"
              repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <span class="ml-2 text-sm text-secondary">加载中...</span>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="flex flex-col items-center justify-center text-red-500">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mb-2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
      </svg>
      <span class="text-sm">{{ error }}</span>
    </div>

    <!-- Draw.io 图表容器 -->
    <div ref="diagramContainer" class="drawio-viewer__container" :class="{ 'hidden': loading || error }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { resolveResourcePath } from '@/core/utils/path'

interface Props {
  src?: string
  width?: string | number
  height?: string | number
  showBorder?: boolean
  class?: string
  highlightColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  showBorder: true,
  highlightColor: '#0000ff',
})

// 响应式状态
const loading = ref(false)
const error = ref<string | null>(null)
const diagramContainer = ref<HTMLElement | null>(null)

// 引用当前 SVG 和 G 元素
let currentSvg: SVGSVGElement | null = null
let currentG: SVGGElement | null = null

// CDN 配置
const GRAPH_VIEWER_CDN = 'https://viewer.diagrams.net/js/viewer.min.js'

/**
 * 动态加载 GraphViewer 脚本
 */
const loadGraphViewerScript = async (): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).GraphViewer) {
    return
  }

  const existing = document.querySelector(`script[src="${GRAPH_VIEWER_CDN}"]`)
  if (existing) {
    await new Promise<void>((resolve, reject) => {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('CDN viewer.min.js 加载失败')))
      if ((window as any).GraphViewer) resolve()
    })
    return
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GRAPH_VIEWER_CDN
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('CDN viewer.min.js 加载失败'))
    document.head.appendChild(script)
  })
}

// 样式计算
const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  border: props.showBorder ? '1px solid rgb(229, 231, 235)' : 'none'
}))

/**
 * 处理图片路径
 */
const processImagePath = (src: string): string => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  return resolveResourcePath(src)
}

/**
 * 手动应用缩放和居中（基于容器的终极修复版）
 */
const applyManualZoom = () => {
  const svgElement = diagramContainer.value?.querySelector('svg') as SVGSVGElement | null
  if (!svgElement) return

  const gElement = svgElement.querySelector('g') as SVGGElement | null
  if (!gElement) return

  currentSvg = svgElement
  currentG = gElement

  // 获取容器的 client 尺寸（不包括 border/padding）
  const container = diagramContainer.value!
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  if (!containerWidth || !containerHeight) return

  // 获取 g 元素的原始边界框（SVG 逻辑坐标）
  const bbox = gElement.getBBox()
  if (!bbox.width || !bbox.height) return

  // 计算缩放比例（保持宽高比，完整显示）
  const scaleX = containerWidth / bbox.width
  const scaleY = containerHeight / bbox.height
  const scale = Math.min(scaleX, scaleY)

  // 计算缩放后的图像尺寸
  const scaledWidth = bbox.width * scale
  const scaledHeight = bbox.height * scale

  // 计算居中偏移量（使图像在容器中居中）
  const offsetX = (containerWidth - scaledWidth) / 2
  const offsetY = (containerHeight - scaledHeight) / 2

  // 应用变换：先平移到居中位置，再缩放
  // 注意：顺序很重要！如果先缩放再平移，偏移量需要除以 scale
  // 这里我们先平移再缩放，所以偏移量是最终像素值
  gElement.setAttribute(
    'transform',
    `translate(${offsetX}, ${offsetY}) scale(${scale})`
  )

  // 设置 SVG 基础样式
  svgElement.style.width = '100%'
  svgElement.style.height = '100%'
  svgElement.style.overflow = 'visible'
}

/**
 * 窗口大小变化时重新缩放
 */
const handleResize = () => {
  if (currentSvg && currentG) {
    setTimeout(applyManualZoom, 100)
  }
}

/**
 * 加载图表
 */
const loadDiagram = async (src: string) => {
  if (!src) return

  loading.value = true
  error.value = null

  try {
    await loadGraphViewerScript()
    await nextTick()

    // 确保容器存在
    let retryCount = 0
    const maxRetries = 10
    while (!diagramContainer.value && retryCount < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 50))
      retryCount++
    }
    if (!diagramContainer.value) {
      throw new Error('Diagram container is not available')
    }

    diagramContainer.value.innerHTML = ''
    const processedSrc = processImagePath(src)

    const response = await fetch(processedSrc)
    if (!response.ok) {
      throw new Error(`Failed to load diagram: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()

    // 配置：禁用工具栏，不依赖 viewer 的 zoom
    const data: Record<string, any> = {
      xml: xml,
      lightbox: 'false' // 关键：禁用灯箱/工具栏
    }

    if (props.highlightColor) data.highlight = props.highlightColor

    const div = document.createElement('div')
    div.className = 'mxgraph'
    div.style.maxWidth = '100%'
    div.style.border = '1px solid transparent'
    div.setAttribute('data-mxgraph', JSON.stringify(data))
    diagramContainer.value.appendChild(div)

    if (window.GraphViewer) {
      window.GraphViewer.processElements()
      // ⭐️ 关键：延迟后手动缩放
      setTimeout(applyManualZoom, 100)
    } else {
      throw new Error('GraphViewer not initialized')
    }

    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('DrawioViewer: Failed to load diagram', err)
  }
}

// 监听 src 变化
watch(() => props.src, async (newSrc) => {
  if (newSrc) {
    await nextTick()
    loadDiagram(newSrc)
  }
}, { immediate: false })

// 监听其他配置变化
watch(() => [props.highlightColor], async () => {
  if (props.src) {
    await nextTick()
    loadDiagram(props.src)
  }
})

// 组件挂载
onMounted(async () => {
  try {
    await loadGraphViewerScript()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'CDN viewer.min.js 加载失败'
  }

  if (props.src) {
    await nextTick()
    loadDiagram(props.src)
  }
})

// 组件卸载前清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// 暴露方法
defineExpose({
  reload: () => props.src && loadDiagram(props.src),
  clear: () => {
    if (diagramContainer.value) diagramContainer.value.innerHTML = ''
    error.value = null
  }
})

// 全局类型声明
declare global {
  interface Window {
    GraphViewer: {
      processElements(): void
    }
  }
}
</script>

<style scoped>
.drawio-viewer {
  position: relative;
  display: block;
  overflow: hidden;
}

.drawio-viewer__container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /* 确保没有 padding/border 干扰 */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.drawio-viewer__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  display: none !important;
}
</style>

<style>
/* 确保 SVG 正确渲染 */
/* 确保 SVG 不被干扰 */
.mxgraph svg {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  overflow: visible !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.mxgraph {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 提升 Draw.io 遮罩层与图表容器的层级，确保在最上层显示 */
.mx-overlay,
.geDiagramContainer {
  z-index: 9999 !important;
}

div[style*="position: fixed; inset: 0px; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.7;"] {
  z-index: 9999 !important;
}

/* 针对 Draw.io 灯箱工具栏（通过内联样式 transform 识别）进行定位覆盖 */
div[style*="transform: translate(-50%, 0px);"] {
  /* 将工具栏从默认的底部居中改为右上角定位 */
  left: auto !important;
  right: 45px !important;
  top: 45px !important;
  bottom: auto !important;
  /* 取消原有 bottom: 60px */
  z-index: 9999 !important;

  /* 移除原有的水平居中 transform，避免偏移 */
  transform: none !important;
  -webkit-transform: none !important;
}
</style>