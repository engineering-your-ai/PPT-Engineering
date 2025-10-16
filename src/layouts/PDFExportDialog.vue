<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          导出PDF
        </h3>
        <button
          @click="closeDialog"
          :disabled="isExporting"
          class="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6">
        <div v-if="!isExporting && !exportResult" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              导出范围
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="exportMode"
                  type="radio"
                  value="current"
                  class="mr-2 text-blue-600"
                >
                <span class="text-sm text-gray-700">当前页面</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="exportMode"
                  type="radio"
                  value="all"
                  class="mr-2 text-blue-600"
                >
                <span class="text-sm text-gray-700">所有页面</span>
              </label>
            </div>
          </div>

          <div>
            <label for="filename" class="block text-sm font-medium text-gray-700 mb-2">
              文件名（可选）
            </label>
            <input
              id="filename"
              v-model="filename"
              type="text"
              placeholder="留空使用默认文件名"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
        </div>

        <div v-if="isExporting" class="space-y-4">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h4 class="text-lg font-medium text-gray-900 mb-2">
              正在导出PDF...
            </h4>
            <p class="text-sm text-gray-600">
              {{ progressText }}
            </p>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress.percentage}%` }"
            ></div>
          </div>

          <div class="text-center text-sm text-gray-500">
            {{ progress.current }} / {{ progress.total }}
            <span v-if="progress.currentPageTitle">
              - {{ progress.currentPageTitle }}
            </span>
          </div>

          <div class="text-center">
            <button
              @click="cancelExport"
              class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              取消导出
            </button>
          </div>
        </div>

        <div v-if="exportResult" class="text-center space-y-4">
          <div v-if="exportResult.success" class="space-y-4">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-2">
                导出成功
              </h4>
              <p class="text-sm text-gray-600">
                已成功导出 {{ exportResult.pageCount }} 个页面
              </p>
              <p class="text-xs text-gray-500 mt-1">
                文件名: {{ exportResult.filename }}
              </p>
              <p class="text-xs text-gray-500">
                耗时: {{ Math.round(exportResult.duration / 1000) }}秒
              </p>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-2">
                导出失败
              </h4>
              <p class="text-sm text-red-600">
                {{ exportResult.error || '未知错误' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          v-if="!isExporting && !exportResult"
          @click="closeDialog"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          取消
        </button>
        <button
          v-if="!isExporting && !exportResult"
          @click="startExport"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          开始导出
        </button>
        <button
          v-if="exportResult"
          @click="resetDialog"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          重新导出
        </button>
        <button
          v-if="exportResult"
          @click="closeDialog"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { pdfExportService } from '@/core/services/PDFExportService'
import type {
  ExportProgress,
  ExportResult,
} from '@/core/types/pdf-export'

// Props
interface Props {
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})

// Emits
interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'export-start'): void
  (e: 'export-complete', result: ExportResult): void
  (e: 'export-error', error: Error): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const router = useRouter()
const isVisible = ref(props.visible)
const exportMode = ref<'current' | 'all'>('current')
const filename = ref('')
const isExporting = ref(false)
const exportResult = ref<ExportResult | null>(null)
const progress = ref<ExportProgress>({
  current: 0,
  total: 0,
  percentage: 0,
  currentPageTitle: '',
  currentPageRoute: ''
})

// 计算属性
const progressText = computed(() => {
  if (exportMode.value === 'current') {
    return '正在捕获当前页面...'
  }
  
  if (progress.value.currentPageTitle) {
    return `正在处理: ${progress.value.currentPageTitle}`
  }
  
  return '正在准备导出...'
})

// 监听 props 变化
watch(() => props.visible, (newValue) => {
  isVisible.value = newValue
})

watch(isVisible, (newValue) => {
  emit('update:visible', newValue)
})

/**
 * 关闭对话框
 */
function closeDialog(): void {
  if (isExporting.value) {
    return
  }
  
  isVisible.value = false
  resetDialog()
}

/**
 * 重置对话框状态
 */
function resetDialog(): void {
  exportResult.value = null
  progress.value = {
    current: 0,
    total: 0,
    percentage: 0,
    currentPageTitle: '',
    currentPageRoute: ''
  }
}

/**
 * 开始导出
 */
async function startExport(): Promise<void> {
  if (isExporting.value) {
    return
  }
  
  try {
    isExporting.value = true
    exportResult.value = null
    emit('export-start')
    
    const options = {
      filename: filename.value.trim() || undefined,
      mode: exportMode.value
    }
    
    let result: ExportResult
    
    if (exportMode.value === 'current') {
      result = await pdfExportService.exportCurrentPage(options)
    } else {
      result = await pdfExportService.exportAllPages(options, (progressData) => {
        progress.value = progressData
      })
    }
    
    exportResult.value = result
    emit('export-complete', result)
    
  } catch (error) {
    const errorResult: ExportResult = {
      success: false,
      taskId: '',
      filename: '',
      pageCount: 0,
      duration: 0,
      error: error instanceof Error ? error.message : '导出失败'
    }
    
    exportResult.value = errorResult
    emit('export-error', error instanceof Error ? error : new Error('导出失败'))
    
  } finally {
    isExporting.value = false
  }
}

/**
 * 取消导出
 */
function cancelExport(): void {
  if (isExporting.value) {
    pdfExportService.cancelExport()
    isExporting.value = false
    
    const cancelResult: ExportResult = {
      success: false,
      taskId: '',
      filename: '',
      pageCount: 0,
      duration: 0,
      error: '用户取消导出'
    }
    
    exportResult.value = cancelResult
  }
}

/**
 * 处理键盘事件
 * @param event 键盘事件
 */
function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && !isExporting.value) {
    closeDialog()
  }
}

// 生命周期钩子
onMounted(() => {
  // 设置路由实例
  pdfExportService.setRouter(router)
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // 移除键盘事件监听
  document.removeEventListener('keydown', handleKeydown)
})

// 暴露给父组件的方法
defineExpose({
  show: () => {
    isVisible.value = true
  },
  hide: () => {
    closeDialog()
  },
  reset: () => {
    resetDialog()
  }
})
</script>

<style scoped>
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 确保对话框在最顶层 */
.fixed {
  z-index: 9999;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>