<template>
  <div 
    class="table-of-contents" 
    :style="containerStyles"
  >
    
    <!-- 目录列表 -->
    <div 
      class="toc-list" 
      :class="{ 'two-column': twoColumn && displayItems.length > columnBreakpoint }"
      :style="listStyle"
    >
      <div 
        v-for="(item, index) in displayItems" 
        :key="item.id"
        class="toc-item"
        :class="{
          'toc-item--clickable': clickable
        }"
        :style="itemStyle"
        @click="handleItemClick(item)"
      >
        <div class="toc-item-content" :style="contentFontStyle">
          <!-- 序号 -->
          <span class="toc-number" :style="numberStyle">{{ formatNumber(index + 1) }}</span>
          
          <!-- 标题 -->
          <span class="toc-text">{{ item.title }}</span>
          
          <!-- 连接线（点线） -->
          <div v-if="showDots" class="toc-dots"></div>
          
          <!-- 页码 -->
          <span v-if="showPageNumbers" class="toc-page" :style="pageFontStyle">
            {{ getPageNumber(item, index) }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getVisibleRouteInfos,
  getPageNumberByPath
} from '@/core/utils/route-generator'

/**
 * 目录组件
 * 从路由配置中自动获取模块信息，生成目录列表
 */
defineOptions({
  name: 'TableOfContents'
})

/**
 * 目录项接口
 */
export interface TOCItem {
  id: string
  title: string
  path?: string
  icon?: string
  pageNumber?: number | string
}

/**
 * 序号格式枚举
 */
export type NumberFormat = 'numeric' | 'chapter' | 'section' | 'custom'

/**
 * 组件属性定义
 */
interface Props {
  /** 序号格式：numeric(1,2,3) | chapter(第1章,第2章) | section(第1节,第2节) | custom */
  numberFormat?: NumberFormat
  /** 自定义序号格式模板，当numberFormat为custom时使用，{n}为序号占位符 */
  customFormat?: string
  /** 是否显示页码 */
  showPageNumbers?: boolean
  /** 手动模式：页码起始值（传入则启用手动页码模式） */
  pageStartNumber?: number
  /** 手动模式：每个目录项的页码映射（传入则启用手动页码模式） */
  pageNumbers?: (number | string)[]
  /** 自动模式：是否使用路由自动页码（默认true） */
  useAutoPageNumbers?: boolean
  /** 是否显示装饰点线 */
  showDots?: boolean
  /** 是否可点击跳转 */
  clickable?: boolean
  /** 是否启用两列布局 */
  twoColumn?: boolean
  /** 两列布局的分割点（当项目数量超过此值时启用两列） */
  columnBreakpoint?: number
  /** 自定义目录项，如果提供则不从路由配置获取 */
  customItems?: TOCItem[]
  /** 排除的路由名称数组 */
  excludeRoutes?: string[]
  /** 容器宽度 */
  width?: string | number
  /** 容器高度 */
  height?: string | number
  /** 内容字体大小 */
  contentFontSize?: string
  /** 是否自动调整字体大小 */
  autoFontSize?: boolean
  /** 序号字体大小 */
  numberFontSize?: string
  /** 页码字体大小 */
  pageFontSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  numberFormat: 'numeric',
  customFormat: '第{n}项',
  showPageNumbers: true,
  useAutoPageNumbers: true,
  showDots: true,
  clickable: true,
  twoColumn: false,
  columnBreakpoint: 6,
  pageStartNumber: 1, // 添加默认值
  excludeRoutes: () => ['home','contents', 'endpage'], // 默认排除首页、目录和末页
  width: '100%',
  height: '100%',
  autoFontSize: true
})

// 路由器实例
const router = useRouter()

/**
 * 从路由配置获取目录项（直接使用 route-generator.ts 的函数）
 */
const routeItems = computed((): TOCItem[] => {
  if (props.customItems) {
    return props.customItems
  }

  // 直接使用 route-generator.ts 提供的函数获取可见路由
  const visibleRoutes = getVisibleRouteInfos()
  
  // 过滤和转换为目录项
  return visibleRoutes
    .filter(routeInfo => {
      // 检查是否在排除列表中
      if (props.excludeRoutes.includes(routeInfo.path) || props.excludeRoutes.includes(routeInfo.path.replace(/^\/|\/$/g, ''))) {
        return false
      }
      
      // 只显示父路由（level 0），排除子路由
      return routeInfo.level === 0
    })
    .map(routeInfo => ({
      id: routeInfo.name,
      title: routeInfo.name,
      path: routeInfo.path,
      icon: routeInfo.icon,
      pageNumber: routeInfo.pageNumber  
    }))
    .sort((a, b) => {
      // 如果有页码，按页码排序；否则按字母顺序排序
      if (a.pageNumber && b.pageNumber) {
        return a.pageNumber - b.pageNumber
      }
      return a.title.localeCompare(b.title)
    })
})

/**
 * 显示的目录项
 */
const displayItems = computed(() => routeItems.value)

/**
 * 获取页码 - 简化版本，直接使用 route-generator 的函数
 */
const getPageNumber = (item: TOCItem, index: number): string => {
  // 1. 优先使用手动传入的页码数组
  if (props.pageNumbers && props.pageNumbers[index] !== undefined) {
    return props.pageNumbers[index].toString()
  }
  
  // 2. 使用目录项自带的页码（从路由配置中获取）
  if (item.pageNumber) {
    return item.pageNumber.toString()
  }
  
  // 3. 通过路径从 route-generator 获取页码
  if (item.path && props.useAutoPageNumbers) {
    const pageNumber = getPageNumberByPath(item.path)
    if (pageNumber) {
      return pageNumber.toString()
    }
  }
  
  // 4. 后备方案：使用起始页码递增
  return (props.pageStartNumber + index).toString()
}

/**
 * 计算字体大小（根据目录数量自动调整）
 */
const calculateFontSize = (baseSize: number, itemCount: number): string => {
  if (!props.autoFontSize) {
    return `${baseSize}px`
  }
  
  // 根据目录数量调整字体大小
  if (itemCount <= 5) {
    return `${baseSize}px`
  } else if (itemCount <= 10) {
    return `${Math.max(baseSize * 0.9, 14)}px`
  } else if (itemCount <= 15) {
    return `${Math.max(baseSize * 0.8, 12)}px`
  } else {
    return `${Math.max(baseSize * 0.7, 10)}px`
  }
}

/**
 * 容器样式
 */
const containerStyles = computed((): CSSProperties => {
  const styles: CSSProperties = {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  }
  return styles
})

/**
 * 列表样式（用于均匀分布）
 */
const listStyle = computed((): CSSProperties => {
  // 检查是否应该使用两列布局
  const shouldUseTwoColumn = props.twoColumn && displayItems.value.length > props.columnBreakpoint
  
  if (shouldUseTwoColumn) {
    // 两列布局：使用 Grid
    return {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 2rem', // 水平间距
      height: '100%',
      flex: '1'
    }
  } else {
    // 单列布局：使用 Flex
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      flex: '1'
    }
  }
})

/**
 * 目录项样式
 */
const itemStyle = computed((): CSSProperties => {
  return {
    flex: '1',
    display: 'flex',
    alignItems: 'center'
  }
})



/**
 * 内容字体样式
 */
const contentFontStyle = computed((): CSSProperties => {
  const itemCount = displayItems.value.length
  const baseFontSize = props.contentFontSize ? parseInt(props.contentFontSize) : 50
  
  return {
    fontSize: props.contentFontSize || calculateFontSize(baseFontSize, itemCount)
  }
})

/**
 * 序号样式
 */
const numberStyle = computed((): CSSProperties => {
  const itemCount = displayItems.value.length
  const baseFontSize = props.numberFontSize ? parseInt(props.numberFontSize) : 50
  
  // 根据序号格式类型确定基础宽度
  let baseWidth: number
  switch (props.numberFormat) {
    case 'numeric':
      baseWidth = 60  // 数字格式：适中宽度
      break
    case 'chapter':
      baseWidth = 180 // 章节格式：较大宽度 (第1章)
      break
    case 'section':
      baseWidth = 180 // 节格式：较大宽度 (第1节)
      break
    case 'custom':
      // 自定义格式：根据模板长度估算宽度
      const templateLength = props.customFormat.length
      baseWidth = Math.max(120, Math.min(templateLength * 38, 250))
      break
    default:
      baseWidth = 180
  }
  
  // 根据目录项数量调整宽度（自动字体大小时）
  let finalWidth = baseWidth
  if (props.autoFontSize) {
    if (itemCount <= 5) {
      finalWidth = baseWidth
    } else if (itemCount <= 10) {
      finalWidth = Math.max(baseWidth * 0.9, baseWidth * 0.7)
    } else if (itemCount <= 15) {
      finalWidth = Math.max(baseWidth * 0.8, baseWidth * 0.6)
    } else {
      finalWidth = Math.max(baseWidth * 0.7, baseWidth * 0.5)
    }
  }
  
  return {
    width: `${finalWidth}px`,
    minWidth: `${Math.min(finalWidth, 40)}px`, // 设置最小宽度
    textAlign: 'right',
    fontSize: props.numberFontSize || calculateFontSize(baseFontSize, itemCount),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0
  }
})

/**
 * 页码字体样式
 */
const pageFontStyle = computed((): CSSProperties => {
  const itemCount = displayItems.value.length
  const baseFontSize = props.pageFontSize ? parseInt(props.pageFontSize) : 40
  
  return {
    fontSize: props.pageFontSize || calculateFontSize(baseFontSize, itemCount)
  }
})

/**
 * 格式化序号
 */
const formatNumber = (num: number): string => {
  switch (props.numberFormat) {
    case 'chapter':
      return `第${num}章`
    case 'section':
      return `第${num}节`
    case 'custom':
      return props.customFormat.replace('{n}', num.toString())
    case 'numeric':
    default:
      return num.toString()
  }
}

/**
 * 处理目录项点击
 */
const handleItemClick = (item: TOCItem) => {
  if (!props.clickable || !item.path) {
    return
  }

  // 导航到目标路径
  router.push(item.path).catch(err => {
    console.warn('导航失败:', err)
  })
}

/**
 * 暴露给父组件的方法
 */
defineExpose({
  /**
   * 手动刷新目录项
   */
  refresh: () => {
    // 触发重新计算
    routeItems.value
  },
  
  /**
   * 获取当前目录项
   */
  getItems: () => displayItems.value
})
</script>

<style scoped>

.table-of-contents {
  @apply w-full h-full flex flex-col text-primary;
  background-color: transparent;
  padding: 2rem;
  box-sizing: border-box;
}


/* 目录列表样式 */
.toc-list {
  @apply flex-1;
  min-height: 0; /* 确保 flex 子元素可以收缩 */
}

/* 两列布局 */
.toc-list.two-column {
  @apply grid grid-cols-2 gap-x-8;
}

/* 目录项样式 */
.toc-item {
  @apply relative;
  margin: 0;
  padding: 0.5rem 0;
}

.toc-item--clickable {
  @apply cursor-pointer transition-all duration-300 ease-in-out;
}

.toc-item--clickable:hover {
  @apply transform translate-x-1;
}

.toc-item--clickable:hover .toc-item-content {
  @apply text-primary;
}

.toc-item-content {
  @apply flex items-center transition-all duration-300 font-body;
  line-height: 1.4;
  gap: 1rem;
  width: 100%;
}

/* 序号样式 */
.toc-number {
  @apply inline-flex items-center justify-end font-bold flex-shrink-0;
}



/* 连接线样式（点线） */
.toc-dots {
  @apply flex-1 relative mx-2;
  min-height: 1px;
  overflow: visible;
}

.toc-dots::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  /* 使用稀疏的点线实现 */
  background: repeating-linear-gradient(
    to right,
    rgb(107, 114, 128) 0,
    rgb(107, 114, 128) 2px,
    transparent 2px,
    transparent 10px
  );
  transform: translateY(-50%);
  opacity: 0.8;
  z-index: 1;
}

/* 页码样式 */
.toc-page {
  @apply inline-flex items-center justify-center px-2 py-1 rounded flex-shrink-0 text-secondary font-medium;
  min-width: 2rem;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .table-of-contents {
    padding: 1rem;
  }
  
  .toc-header {
    @apply mb-4;
  }
  
  .toc-list.two-column {
    @apply grid-cols-1;
  }
  
  .toc-item {
    padding: 0.25rem 0;
  }
  
  .toc-item-content {
    gap: 0.5rem;
  }
  

  
  .toc-dots {
    /* 移除错误的定位属性，保持原有的 margin 和 flex 布局 */
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .toc-page {
    min-width: 1.5rem;
    padding: 0.125rem 0.25rem;
    font-size: 0.75rem;
  }
}


/* 确保内容不会溢出 */
.table-of-contents * {
  box-sizing: border-box;
}

/* 优化长文本显示 */
.toc-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* 当目录项很多时的紧凑模式 */
.toc-list:has(.toc-item:nth-child(16)) .toc-item {
  padding: 0.25rem 0;
}

.toc-list:has(.toc-item:nth-child(16)) .toc-item-content {
  gap: 0.75rem;
}

.toc-list:has(.toc-item:nth-child(21)) .toc-item {
  padding: 0.125rem 0;
}

.toc-list:has(.toc-item:nth-child(21)) .toc-item-content {
  gap: 0.5rem;
}
</style>