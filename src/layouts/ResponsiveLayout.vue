<template>
  <div class="responsive-layout" :class="{ 'responsive-layout--fullscreen': isFullscreen }" :style="themeStyles">
    <!-- 响应式侧边栏 -->
    <div 
      class="sidebar-wrapper"
      :class="{
        'sidebar-wrapper--fullscreen': isFullscreen,
        'sidebar-wrapper--fullscreen-hover': isFullscreen && isSidebarHovered
      }"
      @mouseenter="handleSidebarMouseEnter"
      @mouseleave="handleSidebarMouseLeave"
    >
      <ResponsiveSidebar
        :navigation-items="processedNavigationItems"
        :app-config="appConfig.app"
        @collapse-change="handleCollapseChange"
      />
    </div>

    <!-- 全屏模式下的左侧悬停触发区域 -->
    <div 
      v-if="isFullscreen"
      class="fullscreen-sidebar-trigger"
      @mouseenter="handleSidebarMouseEnter"
      @mouseleave="handleSidebarMouseLeave"
    ></div>

    <!-- 主内容区域 -->
    <main 
      class="main-content"
      :class="{
        'main-content--collapsed': isCollapsed ,
        'main-content--fullscreen': isFullscreen
      }"
    >
      <!-- 全屏模式下的右上角悬停触发区域 -->
      <div 
        v-if="isFullscreen"
        class="fullscreen-button-trigger"
        @mouseenter="handleFullscreenButtonMouseEnter"
        @mouseleave="handleFullscreenButtonMouseLeave"
      ></div>

      <!-- 全屏切换按钮 -->
      <button 
        class="fullscreen-button"
        :class="{
          'fullscreen-button--fullscreen': isFullscreen
        }"
        @click.stop="toggleFullscreen"
        :title="isFullscreen ? '退出全屏' : '进入全屏'"
        @mouseenter="handleFullscreenButtonMouseEnter"
        @mouseleave="handleFullscreenButtonMouseLeave"
      >
        <Minimize2 v-if="isFullscreen" :size="20" />
        <Maximize2 v-else :size="20" />
      </button>

      <!-- 页面导航按钮 -->
      <div 
        class="page-navigation-buttons"
        :class="{
          'page-navigation-buttons--fullscreen': isFullscreen
        }"
        @mouseenter="handleFullscreenButtonMouseEnter"
        @mouseleave="handleFullscreenButtonMouseLeave"
      >
        <!-- PDF导出按钮 -->
        <button 
          v-if="shouldShowPdfExportButton"
          class="nav-button nav-button--export"
          :class="{
            'nav-button--fullscreen': isFullscreen
          }"
          @click.stop="showPDFExportDialog"
          title="导出PDF"
        >
          <FileDown :size="16" />
        </button>

        <!-- 上一页按钮 -->
        <button 
          class="nav-button nav-button--previous"
          :class="{
            'nav-button--disabled': !canGoPrevious,
            'nav-button--fullscreen': isFullscreen
          }"
          @click.stop="goToPreviousPage"
          :disabled="!canGoPrevious"
          :title="canGoPrevious ? `上一页 ${getPageTitle(previousPage)}` : '没有上一页'"
        >
          <ChevronLeft :size="16" />
        </button>

        <!-- 下一页按钮 -->
        <button 
          class="nav-button nav-button--next"
          :class="{
            'nav-button--disabled': !canGoNext,
            'nav-button--fullscreen': isFullscreen
          }"
          @click.stop="goToNextPage"
          :disabled="!canGoNext"
          :title="canGoNext ? `下一页 ${getPageTitle(nextPage)}` : '没有下一页'"
        >
          <ChevronRightIcon :size="16" />
        </button>
      </div>

      <!-- 页面内容 -->
      <div 
        ref="pageContentRef"
        class="page-content" 
        :class="{ 'page-content--fullscreen': isFullscreen }"
        :style="pageContentStyle"
      >
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- PDF导出对话框 -->
    <PDFExportDialog
      v-model:visible="isPDFExportDialogVisible"
      @export-start="handlePDFExportStart"
      @export-complete="handlePDFExportComplete"
      @export-error="handlePDFExportError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Maximize2, 
  Minimize2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  FileDown
} from 'lucide-vue-next'
import ResponsiveSidebar from '@/layouts/ResponsiveSidebar.vue'
import PDFExportDialog from '@/layouts/PDFExportDialog.vue'
import { useMenu } from '@/core/composables/useMenu'
import { usePageNavigation } from '@/core/composables/usePageNavigation'
import { PDFExportService } from '@/core/services/PDFExportService'
import { appConfig } from '@/core/utils/config'
import { useTheme } from '@/core/composables/useTheme'

// 应用配置已迁移到 @/config/app.config.ts

/**
 * 响应式状态
 */
const isCollapsed = ref(false)
const isFullscreen = ref(false)
const screenWidth = ref(window.innerWidth)
const screenHeight = ref(window.innerHeight)
const isSidebarHovered = ref(false)
const isFullscreenButtonHovered = ref(false)
const isPDFExportDialogVisible = ref(false)

/**
 * 固定比例缩放配置
 */
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080
const pageContentRef = ref<HTMLElement>()

/**
 * 当前路由和路由器
 */
const router = useRouter()

/**
 * 使用菜单系统
 */
const { menuConfig } = useMenu()

/**
 * 使用页面导航系统
 */
const {
  previousPage,
  nextPage,
  canGoPrevious,
  canGoNext,
  goToPreviousPage,
  goToNextPage,
  getPageTitle
} = usePageNavigation()

/**
 * 使用主题系统
 */
const { themeStyles } = useTheme()

/**
 * 计算属性：是否显示PDF导出按钮
 */
const shouldShowPdfExportButton = computed(() => {
  return appConfig.value.app.features?.showPdfExportButton ?? true
})

/**
 * 计算属性：处理后的导航项
 */
const processedNavigationItems = computed(() => {
  try {
    return menuConfig?.value?.items || []
  } catch (error) {
    console.warn('获取导航项时出错:', error)
    return []
  }
})

/**
 * 计算属性：缩放比例和样式
 */
const scaleRatio = computed(() => {
  const sidebarWidth = isCollapsed.value ? 80 : 280
  const paddingSize = 64 // 2rem = 32px * 2 = 64px
  
  let availableWidth: number
  let availableHeight: number
  
  if (isFullscreen.value) {
    // 全屏模式：宽度占满整个屏幕，不留任何间距
    availableWidth = screenWidth.value
    availableHeight = screenHeight.value
  } else {
    // 非全屏模式：减去侧边栏宽度和padding
    availableWidth = screenWidth.value - sidebarWidth - paddingSize
    availableHeight = screenHeight.value - paddingSize
  }
  
  // 计算宽高比缩放
  const scaleX = availableWidth / DESIGN_WIDTH
  const scaleY = availableHeight / DESIGN_HEIGHT
  
  // 使用较小的缩放比例以保持宽高比，确保内容完全适配
  return Math.min(scaleX, scaleY, 3) // 最大不超过3倍
})

/**
 * 计算属性：页面内容样式
 */
const pageContentStyle = computed(() => {
  const scale = scaleRatio.value
  
  return {
    transform: `scale(${scale})`,
    width: `${DESIGN_WIDTH}px`,
    height: `${DESIGN_HEIGHT}px`
  }
})

/**
 * 窗口尺寸变化处理
 */
const handleResize = (): void => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}

/**
 * 处理侧边栏折叠状态变化
 */
const handleCollapseChange = (collapsed: boolean): void => {
  isCollapsed.value = collapsed
}



/**
 * 处理侧边栏鼠标进入事件
 */
const handleSidebarMouseEnter = (): void => {
  if (isFullscreen.value) {
    isSidebarHovered.value = true
  }
}

/**
 * 处理侧边栏鼠标离开事件
 */
const handleSidebarMouseLeave = (): void => {
  if (isFullscreen.value) {
    isSidebarHovered.value = false
  }
}

/**
 * 处理全屏按钮鼠标进入事件
 */
const handleFullscreenButtonMouseEnter = (): void => {
  if (isFullscreen.value) {
    isFullscreenButtonHovered.value = true
  }
}

/**
 * 处理全屏按钮鼠标离开事件
 */
const handleFullscreenButtonMouseLeave = (): void => {
  if (isFullscreen.value) {
    isFullscreenButtonHovered.value = false
  }
}

/**
 * 切换全屏模式
 */
const toggleFullscreen = async (): Promise<void> => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  } catch (error) {
    console.error('全屏API调用失败:', error)
    // 如果全屏API失败，手动重置状态
    isFullscreen.value = !!document.fullscreenElement
  }
}

/**
 * 键盘事件处理
 */
const handleKeydown = (event: KeyboardEvent): void => {
  // F11 键处理（全局有效）
  if (event.key === 'F11') {
    event.preventDefault()
    toggleFullscreen()
    return
  }
  
  // 只在全屏模式下处理其他键盘事件
  if (!isFullscreen.value) return
  
  // 防止在输入框等元素中触发
  const target = event.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return
  }
  
  switch (event.key) {
    case 'PageDown':
    case 'ArrowRight':
    case ' ': // 空格键
      event.preventDefault()
      goToNextPage()
      break
    case 'PageUp':
    case 'ArrowLeft':
      event.preventDefault()
      goToPreviousPage()
      break
  }
}

/**
 * 全屏状态变化监听
 */
const handleFullscreenChange = (): void => {
  isFullscreen.value = !!document.fullscreenElement
  
  // 退出全屏时重置悬停状态
  if (!isFullscreen.value) {
    isSidebarHovered.value = false
    isFullscreenButtonHovered.value = false
  }
}

/**
 * 显示PDF导出对话框
 */
const showPDFExportDialog = (): void => {
  isPDFExportDialogVisible.value = true
}

/**
 * 处理PDF导出开始事件
 */
const handlePDFExportStart = (): void => {
  console.log('PDF导出开始')
}

/**
 * 处理PDF导出完成事件
 * @param result 导出结果
 */
const handlePDFExportComplete = (result: any): void => {
  console.log('PDF导出完成:', result)
}

/**
 * 处理PDF导出错误事件
 * @param error 错误信息
 */
const handlePDFExportError = (error: Error): void => {
  console.error('PDF导出失败:', error)
}

/**
 * 组件挂载
 */
onMounted(() => {
  // 初始化屏幕尺寸
  handleResize()
  
  // 设置PDF导出服务的路由实例
  const pdfExportService = PDFExportService.getInstance()
  pdfExportService.setRouter(router)
  
  window.addEventListener('resize', handleResize)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('keydown', handleKeydown)
  

})

/**
 * 监听侧边栏状态变化，重新计算缩放比例
 */
watch([isCollapsed, isFullscreen], () => {
  // 状态变化时触发重新计算
  // 缩放比例会通过计算属性自动更新
}, { immediate: true })

/**
 * 组件卸载
 */
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* 响应式布局容器 - 固定比例模式 */
.responsive-layout {
  display: flex;
  height: 100vh;
  background-color: #f8fafc;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

/* 全屏模式下的布局 */
.responsive-layout--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
}

/* 侧边栏包装器 */
.sidebar-wrapper {
  position: relative;
  z-index: 100;
}

/* 全屏模式下的侧边栏包装器 */
.sidebar-wrapper--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

/* 全屏模式下鼠标悬停时显示侧边栏 */
.sidebar-wrapper--fullscreen-hover {
  transform: translateX(0);
}

/* 全屏模式下侧边栏悬停触发区域 */
.sidebar-wrapper--fullscreen::before {
  content: '';
  position: absolute;
  top: 0;
  right: -20px;
  width: 20px;
  height: 100%;
  background: transparent;
  z-index: 1001;
}

/* 全屏模式下的左侧悬停触发区域 */
.fullscreen-sidebar-trigger {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 100vh;
  background: transparent;
  z-index: 1001;
  cursor: pointer;
}

/* 主内容区域 - 固定比例缩放模式 */
.main-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: #f8fafc;
  padding: 2rem;
  box-sizing: border-box;
}



.fullscreen-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
}

/* 全屏模式下的控制按钮 */
.fullscreen-button--fullscreen {
  z-index: 1002;
  opacity: 0;
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.5);
}

/* 按钮悬停效果 */
.fullscreen-button:hover {
  opacity: 1;
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fullscreen-button--fullscreen:hover {
  opacity: 1;
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 页面导航按钮 */
.page-navigation-buttons {
  position: fixed;
  top: 4rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-navigation-buttons--fullscreen {
  z-index: 1002;
  opacity: 0;
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.5);
}

.page-navigation-buttons--fullscreen:hover {
  opacity: 1;
}

/* 导航按钮样式 */
.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
}

.nav-button:hover:not(.nav-button--disabled) {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-button--fullscreen {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}

.nav-button--fullscreen:hover:not(.nav-button--disabled) {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-button--disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none !important;
}

.nav-button--disabled:hover {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.6);
  box-shadow: none;
}

.nav-button--fullscreen.nav-button--disabled:hover {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}

/* 主内容区域全屏状态 */
.main-content--fullscreen {
  margin-left: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 999;
  padding: 0; /* 全屏模式下不设置padding，让内容完全占满屏幕 */
  /* 在全屏模式下保持居中对齐 */
  justify-content: center;
  align-items: center;
}

/* 页面内容 - 固定比例缩放容器 */
.page-content {
  position: relative;
  width: 1920px;
  height: 1080px;
  transform-origin: center center;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  flex-shrink: 0;
}

.page-content--fullscreen {
  /* 移除固定100vw/100vh，使用JavaScript计算的动态尺寸 */
  border-radius: 0;
  box-shadow: none;
  /* 保持居中缩放原点 */
  transform-origin: center center;
}

/* 确保路由视图内容填满容器 */
.page-content > * {
  width: 100%;
  height: 100%;
  overflow: auto;
}

/* --- 页面过渡动画 --- */

/* 定义过渡期间的共享样式。
  这是动画的核心，指定了动画的属性、时长和缓动曲线。
*/
.page-enter-active,
.page-leave-active {
  /* 直接将动画时长设置为 0.4s。
    为了获得最佳性能，我们明确指定只对 opacity 和 transform 属性进行过渡。
  */
  transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* 确保在动画播放期间，元素是可见的，否则动画不会播放 */
  visibility: visible;
}

/* 定义“进入”动画的起始状态。
  页面将从这个状态开始，动画播放到其默认样式。
*/
.page-enter-from {
  opacity: 0;
  transform: translateX(30px); /* 从右侧 30px 的位置开始进入 */
}

/* 定义“离开”动画的结束状态。
  页面将从其默认样式开始，动画播放到这个状态。
*/
.page-leave-to {
  opacity: 0;
  transform: translateX(-30px); /* 向左侧 -30px 的位置移出 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
  }
}
</style>