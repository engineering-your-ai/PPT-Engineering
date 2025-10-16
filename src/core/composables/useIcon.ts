import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { getIcon, hasIcon, getIconConfig } from '@/core/utils/icon-registry'
import type { IconConfig } from '@/core/utils/icon-registry'
import type { Component } from 'vue'
import { resolveResourcePath } from '@/core/utils/path'

/**
 * 图标使用的 Composable
 * @param iconName 图标名称（可以是响应式的）
 */
export function useIcon(iconName: string | ComputedRef<string | undefined> | ComputedRef<string>) {
  /**
   * 计算属性：当前图标名称
   */
  const currentIconName = computed(() => {
    return typeof iconName === 'string' ? iconName : iconName.value
  })
  
  // 响应式状态
  const iconComponent: Ref<Component | null> = ref(null)
  const iconConfig: Ref<IconConfig | undefined> = ref(undefined)
  const iconExists: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  
  /**
   * 加载图标数据
   */
  const loadIconData = async () => {
    const name = currentIconName.value
    if (!name) {
      iconComponent.value = null
      iconConfig.value = undefined
      iconExists.value = false
      return
    }

    loading.value = true
    error.value = null

    try {
      const [component, config, exists] = await Promise.all([
        getIcon(name),
        getIconConfig(name),
        hasIcon(name)
      ])

      iconComponent.value = component
      iconConfig.value = config
      iconExists.value = exists
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load icon'
      iconComponent.value = null
      iconConfig.value = undefined
      iconExists.value = false
    } finally {
      loading.value = false
    }
  }

  // 监听图标名称变化
  watch(currentIconName, loadIconData, { immediate: true })
  
  /**
   * 计算属性：图标类型
   */
  const iconType = computed((): 'lucide' | 'static' | undefined => {
    return iconConfig.value?.type
  })
  
  /**
   * 计算属性：是否为Lucide图标
   */
  const isLucideIcon = computed((): boolean => {
    return iconType.value === 'lucide'
  })
  
  /**
   * 计算属性：是否为静态图标
   */
  const isStaticIcon = computed((): boolean => {
    return iconType.value === 'static'
  })
  
  /**
   * 计算属性：静态图标源路径
   * 使用 resolveResourcePath 处理 baseUrl
   */
  const staticIconSrc = computed((): string | undefined => {
    if (isStaticIcon.value && iconConfig.value?.src) {
      return resolveResourcePath(iconConfig.value.src)
    }
    return undefined
  })
  
  /**
   * 计算属性：图标描述
   */
  const iconDescription = computed((): string | undefined => {
    return iconConfig.value?.description
  })
  
  return {
    // 基础信息
    iconName: currentIconName,
    iconComponent,
    iconConfig,
    iconExists,
    
    // 状态信息
    loading,
    error,
    
    // 类型判断
    iconType,
    isLucideIcon,
    isStaticIcon,
    
    // 静态图标相关
    staticIconSrc,
    
    // 其他信息
    iconDescription,
    
    // 方法
    reload: loadIconData
  }
}

/**
 * 批量图标使用的 Composable
 * @param iconNames 图标名称数组
 */
export function useIcons(iconNames: string[]) {
  // 为每个图标创建独立的 useIcon 实例
  const iconInstances = iconNames.map(name => ({
    name,
    ...useIcon(name)
  }))
  
  /**
   * 计算属性：所有图标的加载状态
   */
  const loading = computed(() => {
    return iconInstances.some(icon => icon.loading.value)
  })
  
  /**
   * 计算属性：是否有错误
   */
  const hasErrors = computed(() => {
    return iconInstances.some(icon => icon.error.value !== null)
  })
  
  /**
   * 计算属性：所有错误信息
   */
  const errors = computed(() => {
    return iconInstances
      .filter(icon => icon.error.value !== null)
      .map(icon => ({ name: icon.name, error: icon.error.value }))
  })
  
  /**
   * 计算属性：存在的图标
   */
  const existingIcons = computed(() => {
    return iconInstances.filter(icon => icon.iconExists.value)
  })
  
  /**
   * 计算属性：不存在的图标名称
   */
  const missingIconNames = computed(() => {
    return iconInstances
      .filter(icon => !icon.iconExists.value)
      .map(icon => icon.name)
  })
  
  /**
   * 计算属性：按类型分组的图标
   */
  const iconsByType = computed(() => {
    const lucideIcons: string[] = []
    const staticIcons: string[] = []
    const unknownIcons: string[] = []
    
    iconInstances.forEach(icon => {
      if (icon.isLucideIcon.value) {
        lucideIcons.push(icon.name)
      } else if (icon.isStaticIcon.value) {
        staticIcons.push(icon.name)
      } else {
        unknownIcons.push(icon.name)
      }
    })
    
    return {
      lucide: lucideIcons,
      static: staticIcons,
      unknown: unknownIcons
    }
  })
  
  /**
   * 重新加载所有图标
   */
  const reloadAll = async () => {
    await Promise.all(iconInstances.map(icon => icon.reload()))
  }
  
  return {
    icons: iconInstances,
    loading,
    hasErrors,
    errors,
    existingIcons,
    missingIconNames,
    iconsByType,
    reloadAll
  }
}

/**
 * 图标注册的 Composable
 */
export function useIconRegistry() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  /**
   * 注册单个图标
   */
  const registerIcon = async (name: string, config: IconConfig) => {
    loading.value = true
    error.value = null
    try {
      await (await import('@/core/utils/icon-registry')).registerIcon(name, config)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to register icon'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 批量注册图标
   */
  const registerIcons = async (icons: Record<string, IconConfig>) => {
    loading.value = true
    error.value = null
    try {
      await (await import('@/core/utils/icon-registry')).registerIcons(icons)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to register icons'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 移除图标
   */
  const unregisterIcon = async (name: string) => {
    loading.value = true
    error.value = null
    try {
      return await (await import('@/core/utils/icon-registry')).unregisterIcon(name)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to unregister icon'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 获取所有图标名称
   */
  const getAllIconNames = async () => {
    try {
      return await (await import('@/core/utils/icon-registry')).getAllIconNames()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get icon names'
      throw err
    }
  }
  
  /**
   * 根据类型获取图标名称
   */
  const getIconNamesByType = async (type: 'lucide' | 'static') => {
    try {
      return await (await import('@/core/utils/icon-registry')).getIconNamesByType(type)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get icon names by type'
      throw err
    }
  }
  
  /**
   * 根据分类获取图标名称
   */
  const getIconNamesByCategory = async (category: string) => {
    try {
      return await (await import('@/core/utils/icon-registry')).getIconNamesByCategory(category)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get icon names by category'
      throw err
    }
  }
  
  /**
   * 重新加载图标注册表
   */
  const reloadRegistry = async () => {
    loading.value = true
    error.value = null
    try {
      await (await import('@/core/utils/icon-registry')).reloadIconRegistry()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reload icon registry'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    error,
    registerIcon,
    registerIcons,
    unregisterIcon,
    getAllIconNames,
    getIconNamesByType,
    getIconNamesByCategory,
    reloadRegistry
  }
}