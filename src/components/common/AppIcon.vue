<template>
  <span 
    class="app-icon inline-flex items-center justify-center"
    :class="[
      props.class,
      {
        'app-icon--lucide': isLucideIcon,
        'app-icon--static': isStaticIcon,
        'app-icon--disabled': props.disabled
      }
    ]"
    :style="iconStyle"
  >
    <!-- Lucide 图标 -->
    <component
      v-if="showIcon && isLucideIcon"
      :is="iconComponent"
      :size="props.size"
      :stroke-width="props.strokeWidth"
      :color="props.color"
    />
    
    <!-- 静态图标 -->
    <img
      v-else-if="showIcon && isStaticIcon && staticIconSrc"
      :src="staticIconSrc"
      :alt="iconDescription || props.name || 'Icon'"
      class="app-icon__static"
      :style="iconStyle"
    />
    
    <!-- 回退显示 -->
    <span 
      v-else-if="showFallback && props.fallback"
      class="app-icon-fallback text-xs"
    >
      {{ props.fallback }}
    </span>
    
    <!-- 默认回退（显示图标名称首字母） -->
    <span 
      v-else-if="showFallback"
      class="app-icon-fallback text-xs"
    >
      {{ props.name?.charAt(0)?.toUpperCase() || '?' }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIcon } from '@/core/composables/useIcon'

interface Props {
  /** 图标名称 */
  name?: string
  /** 图标大小 */
  size?: string | number
  /** 图标颜色 */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  class?: string
  /** 线条宽度（仅Lucide图标） */
  strokeWidth?: number
  /** 回退显示内容（当图标不存在时） */
  fallback?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  disabled: false,
  strokeWidth: 2
})

// 使用图标 composable
const {
  iconComponent,
  iconConfig,
  iconExists,
  iconType,
  isLucideIcon,
  isStaticIcon,
  staticIconSrc,
  iconDescription
} = useIcon(computed(() => props.name))

// 计算图标大小
const iconSize = computed(() => {
  const size = props.size
  return typeof size === 'number' ? `${size}px` : size
})

// 计算图标样式
const iconStyle = computed(() => ({
  width: iconSize.value,
  height: iconSize.value,
  color: props.color,
  opacity: props.disabled ? 0.5 : 1
}))

// 计算是否显示图标
const showIcon = computed(() => {
  return iconExists.value && iconComponent.value
})

// 计算是否显示回退状态
const showFallback = computed(() => {
  return (!iconExists.value || !iconComponent.value) && props.name
})

</script>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.app-icon--lucide {
  /* Lucide图标特定样式 */
}

.app-icon--static {
  /* 静态图标特定样式 */
}

.app-icon--disabled {
  /* 禁用状态样式 */
  cursor: not-allowed;
}

.app-icon__static {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.app-icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #6b7280;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  min-width: 1em;
  min-height: 1em;
}
</style>