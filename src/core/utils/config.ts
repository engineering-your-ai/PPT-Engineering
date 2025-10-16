/**
 * 统一配置模块
 * 整合应用配置、路由配置、YAML加载等功能
 */

import { reactive, computed } from 'vue'
import { parse } from 'yaml'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteConfig } from '@/core/types/navigation'
import type { CustomTheme } from '@/core/composables/useTheme'
import { buildConfigUrl, getBasePath } from './path'

// ==================== 配置常量 ====================



// ==================== 类型定义 ====================

/**
 * 应用配置接口
 */
export interface AppConfig {
  app: {
    icon: string
    title: string
    version: string
    description: string
    baseUrl?: string
    features?: {
      showPdfExportButton?: boolean
    }
  }
}

/**
 * 路由配置YAML接口
 */
export interface RouteConfigYaml {
  routes: Array<{
    route: string
    component: string // 父路由现在也需要指定组件
    meta: {
      title: string
      icon?: string
      order: number
      pageNumber?: number
      hidden?: boolean
    }
    children?: Array<{
      route: string
      component: string
      meta: {
        title: string
        order: number
        pageNumber?: number
        hidden?: boolean
      }
    }>
  }>
}

/**
 * 图标配置接口 - 简化版
 */
export interface IconConfigYaml {
  // Lucide 图标按分类组织
  lucide_icons: Record<string, string[]>
  // 静态图标按分类组织
  static_icons: Record<string, Array<{
    name: string
    src: string
  }>>
  config: {
    default_size?: number
    default_stroke_width?: number
    enable_cache?: boolean
    fallback_behavior?: string
    placeholder_text?: string
  }
}

/**
 * 配置变化监听器类型
 */
export type ConfigChangeListener = (configType: 'app' | 'routes' | 'icons') => void

// ==================== 默认配置 ====================

/**
 * 默认应用配置
 */
const defaultAppConfig: AppConfig = {
  app: {
    icon: 'Presentation',
    title: 'PPT Engineering',
    version: '1.0.0',
    description: 'ppt演示应用',
    baseUrl: '/PPT-Engineering/',
    features: {
      showPdfExportButton: true
    }
  }
}


/**
 * 默认图标配置
 */
const defaultIconConfig: IconConfigYaml = {
  lucide_icons: {},
  static_icons: {},
  config: {
    default_size: 20,
    default_stroke_width: 2,
    enable_cache: true,
    fallback_behavior: 'show_placeholder',
    placeholder_text: '?'
  }
}

/**
 * 获取默认重定向路径
 * 根据路由配置中order最小的路由作为默认路由
 */
function getDefaultRedirectPath(): string {
  if (!configState.routeConfig?.routes) {
    return 'home' // 默认回退路径
  }
  
  // 找到order最小的路由
  const sortedRoutes = [...configState.routeConfig.routes]
    .filter(route => !route.meta.hidden) // 过滤隐藏路由
    .sort((a, b) => a.meta.order - b.meta.order)
  
  if (sortedRoutes.length > 0) {
    return sortedRoutes[0].route
  }
  
  return 'home' // 默认回退路径
}

/**
 * 默认路由记录（动态生成）
 */
function getDefaultRouteRecords(): RouteRecordRaw[] {
  return [
    {
      path: '',
      redirect: getDefaultRedirectPath()
    } as RouteRecordRaw,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: dynamicImport('@/views/default/NotFoundPage.vue'),
      meta: {
        title: '页面未找到',
        hidden: true
      }
    } as RouteRecordRaw
  ]
}

// ==================== 动态组件加载 ====================

/**
 * 动态导入组件函数
 * 完全依赖 routes.config.yaml 中的组件路径配置
 * @param componentPath 组件路径
 * @returns 返回动态导入函数
 */
function dynamicImport(componentPath: string): () => Promise<any> {
  return async () => {
    try {
      // 使用 Vite 的动态导入功能
      // 通过路径模式匹配来支持任意组件路径
      const modules = import.meta.glob('@/views/**/*.vue')
      
      // 规范化组件路径
      const normalizedPath = componentPath.startsWith('@/') ? componentPath : `@/${componentPath}`
      
      // 在所有可用的模块中查找匹配的路径
      let moduleLoader = modules[normalizedPath]
      
      // 如果直接匹配失败，尝试路径变换匹配
      if (!moduleLoader) {
        // 检查是否需要进行路径转换 (@/ -> /src/)
        const moduleKeys = Object.keys(modules)
        // console.warn(`组件路径 "${componentPath}" 未找到。可用的组件路径:`, moduleKeys)
        
        // 尝试根据文件名进行匹配
        const fileName = normalizedPath.split('/').pop() // 获取文件名
        const matchingKey = moduleKeys.find(key => key.endsWith(fileName || ''))
        
        if (matchingKey) {
          moduleLoader = modules[matchingKey]
          // console.log(`通过文件名匹配找到组件: ${matchingKey}`)
        }
      }
      
      if (moduleLoader) {
        return await moduleLoader()
      } else {
        // 如果找不到对应组件，回退到 NotFound 组件
        const notFoundLoader = modules['@/views/default/NotFoundPage.vue']
        if (notFoundLoader) {
          return await notFoundLoader()
        } else {
          throw new Error('NotFound组件也未找到')
        }
      }
    } catch (error) {
      console.error(`加载组件失败: ${componentPath}`, error)
      // 创建一个简单的错误组件
      return {
        default: {
          template: `<div class="error-component">组件加载失败: ${componentPath}</div>`
        }
      }
    }
  }
}

// ==================== 配置缓存 ====================

/**
 * 配置缓存
 */
const configCache = new Map<string, any>()

// ==================== 状态管理 ====================

/**
 * 配置状态
 */
const configState = reactive({
  appConfig: null as AppConfig | null,
  routeConfig: null as RouteConfigYaml | null,
  iconConfig: null as IconConfigYaml | null,
  isLoading: false,
  error: null as string | null
})

/**
 * 配置变化监听器列表
 */
const listeners: ConfigChangeListener[] = []

// ==================== YAML加载 ====================

/**
 * 从URL加载YAML配置文件（带缓存）
 * @param url YAML文件的URL
 * @param useCache 是否使用缓存
 * @returns 解析后的配置对象
 */
async function loadYamlFromUrl<T>(url: string, useCache = true): Promise<T> {
  // 检查缓存
  if (useCache && configCache.has(url)) {
    return configCache.get(url)
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load config from ${url}: ${response.statusText}`)
    }
    const yamlText = await response.text()
    const config = parse(yamlText) as T
    
    // 缓存配置
    if (useCache) {
      configCache.set(url, config)
    }
    
    return config
  } catch (error) {
    console.error(`Error loading YAML config from ${url}:`, error)
    throw error
  }
}

/**
 * 清除配置缓存
 * @param url 可选，指定清除特定配置的缓存，不传则清除所有缓存
 */
export function clearConfigCache(url?: string): void {
  if (url) {
    configCache.delete(url)
  } else {
    configCache.clear()
  }
}

/**
 * 加载应用配置
 * @param force 是否强制重新加载
 * @returns 应用配置对象
 */
export async function loadAppConfig(force = false): Promise<AppConfig> {
  if (!configState.appConfig || force) {
    try {
      configState.isLoading = true
      configState.error = null
      
      const configUrl = buildConfigUrl('config/app.config.yaml')
      configState.appConfig = await loadYamlFromUrl<AppConfig>(configUrl, !force)
      
      notifyListeners('app')
    } catch (error) {
      console.warn('Failed to load app config from YAML, using default config:', error)
      configState.appConfig = { ...defaultAppConfig }
      
      configState.error = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      configState.isLoading = false
    }
  }
  return configState.appConfig
}

/**
 * 加载路由配置
 * @param force 是否强制重新加载
 * @returns 路由配置对象
 */
export async function loadRouteConfig(force = false): Promise<RouteConfigYaml> {
  if (!configState.routeConfig || force) {
    try {
      configState.isLoading = true
      configState.error = null
      
      const configUrl = buildConfigUrl('config/routes.config.yaml')
      configState.routeConfig = await loadYamlFromUrl<RouteConfigYaml>(configUrl, !force)
      
      notifyListeners('routes')
    } catch (error) {
      console.warn('Failed to load route config from YAML, using default config:', error)
      configState.routeConfig = { routes: [] }
      configState.error = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      configState.isLoading = false
    }
  }
  return configState.routeConfig
}

/**
 * 加载图标配置
 * @param force 是否强制重新加载
 * @returns 图标配置对象
 */
export async function loadIconConfig(force = false): Promise<IconConfigYaml> {
  if (!configState.iconConfig || force) {
    try {
      configState.isLoading = true
      configState.error = null
      
      const configUrl = buildConfigUrl('config/icons.config.yaml')
      configState.iconConfig = await loadYamlFromUrl<IconConfigYaml>(configUrl, !force)
      
      notifyListeners('icons')
    } catch (error) {
      console.warn('Failed to load icon config from YAML, using default config:', error)
      configState.iconConfig = { ...defaultIconConfig }
      configState.error = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      configState.isLoading = false
    }
  }
  return configState.iconConfig
}

// ==================== 路由转换 ====================

/**
 * 计算并分配页码
 * 遵循新的规则：父路由和子路由都分配页码
 * @param yamlRoutes YAML路由配置
 * @returns 带有页码的YAML路由配置
 */
function calculatePageNumbers(yamlRoutes: RouteConfigYaml['routes']): RouteConfigYaml['routes'] {
  // 创建副本以避免修改原始数据
  const routes = JSON.parse(JSON.stringify(yamlRoutes))
  
  // 按order排序路由
  routes.sort((a: any, b: any) => (a.meta.order || 0) - (b.meta.order || 0))
  
  let currentPageNumber = 1
  
  routes.forEach((route: any) => {
    // 为父路由分配页码（新规则）
    if (!route.meta?.hidden) {
      route.meta.pageNumber = currentPageNumber
      currentPageNumber++
    }
    
    // 为子路由分配页码
    if (route.children && route.children.length > 0) {
      // 按order排序子路由
      route.children.sort((a: any, b: any) => (a.meta.order || 0) - (b.meta.order || 0))
      
      route.children.forEach((child: any) => {
        // 排除hidden的路由
        if (!child.meta?.hidden) {
          child.meta.pageNumber = currentPageNumber
          currentPageNumber++
        }
      })
    }
  })
  
  return routes
}

/**
 * 将YAML路由配置转换为RouteConfig数组
 * @param yamlRoutes YAML路由配置
 * @returns RouteConfig数组
 */
function convertYamlRoutesToRouteConfig(yamlRoutes: RouteConfigYaml['routes']): RouteConfig[] {
  // 先计算页码
  const routesWithPageNumbers = calculatePageNumbers(yamlRoutes)
  
  return routesWithPageNumbers.map(route => {
    const routeConfig: RouteConfig = {
      path: route.route,
      title: route.meta.title,
      name: route.route,
      order: route.meta.order,
      pageNumber: route.meta.pageNumber,
      component: route.component ? dynamicImport(route.component) : dynamicImport('@/views/default/NotFoundPage.vue'),
      meta: route.meta
    }

    if (route.children && route.children.length > 0) {
      routeConfig.children = route.children.map(child => {
        const childConfig = {
          path: child.route,
          title: child.meta?.title || child.route,
          name: `${route.route}-${child.route}`,
          // 子路由必须指定component，使用动态导入
          component: child.component ? dynamicImport(child.component) : dynamicImport('@/views/default/NotFoundPage.vue'),
          meta: {
            ...child.meta,
            parent: route.route
          }
        }
        return childConfig
      })
    }
    return routeConfig
  })
}

// ==================== 响应式配置 ====================

/**
 * 获取当前路由配置
 * 完全依赖YAML配置，不再使用硬编码的默认配置
 */
function getCurrentRouteConfigs(): RouteConfig[] {
  // console.log('getCurrentRouteConfigs - configState.routeConfig:', configState.routeConfig)
  if (!configState.routeConfig || !configState.routeConfig.routes) {
    console.warn('路由配置未加载或为空，请检查 routes.config.yaml 文件')
    return []
  }
  const result = convertYamlRoutesToRouteConfig(configState.routeConfig.routes)
  // console.log('getCurrentRouteConfigs - result:', result)
  return result
}

/**
 * 响应式应用配置
 */
export const appConfig = computed(() => {
  return configState.appConfig || defaultAppConfig
})

/**
 * 响应式路由配置数组
 */
export const routeConfigs = computed(() => {
  return getCurrentRouteConfigs()
})

/**
 * 响应式默认路由配置
 */
export const defaultRouteConfig = computed(() => {
  return getDefaultRouteRecords()
})

/**
 * 图标配置（计算属性）
 */
export const iconConfig = computed(() => {
  return configState.iconConfig || defaultIconConfig
})

// ==================== 监听器管理 ====================

/**
 * 添加配置变化监听器
 */
export function addChangeListener(listener: ConfigChangeListener): void {
  listeners.push(listener)
}

/**
 * 移除配置变化监听器
 */
export function removeChangeListener(listener: ConfigChangeListener): void {
  const index = listeners.indexOf(listener)
  if (index > -1) {
    listeners.splice(index, 1)
  }
}

/**
 * 通知所有监听器配置已变化
 */
function notifyListeners(configType: 'app' | 'routes' | 'icons'): void {
  listeners.forEach(listener => {
    try {
      listener(configType)
    } catch (error) {
      console.error('Error in config change listener:', error)
    }
  })
}

// ==================== 配置获取函数 ====================

/**
 * 获取应用基础URL配置
 * @returns 应用的baseUrl配置，如果未配置则返回默认值'/'
 */
export function getAppBaseUrl(): string {
  return appConfig.value.app.baseUrl || '/'
}



// ==================== 异步获取器 ====================

/**
 * 异步获取路由配置
 */
export async function getRouteConfigsAsync(): Promise<RouteConfig[]> {
  await loadRouteConfig()
  return getCurrentRouteConfigs()
}

/**
 * 异步获取默认路由配置
 */
export async function getDefaultRouteConfigAsync(): Promise<RouteRecordRaw[]> {
  await loadRouteConfig()
  return getDefaultRouteRecords()
}

// ==================== 初始化 ====================

/**
 * 初始化配置系统
 */
export async function initializeConfig(): Promise<void> {
  try {
    await Promise.all([
      loadAppConfig(),
      loadRouteConfig(),
      loadIconConfig()
    ])
    // console.log('Configuration system initialized successfully')
    // console.log('configState after init:', configState)
    // console.log('routeConfigs.value after init:', routeConfigs.value)
  } catch (error) {
    console.error('Failed to initialize configuration system:', error)
  }
}

/**
 * 重新加载所有配置
 */
export async function reloadAllConfigs(): Promise<void> {
  clearConfigCache() // 清除缓存
  await Promise.all([
    loadAppConfig(true),
    loadRouteConfig(true),
    loadIconConfig(true)
  ])
}

/**
 * 获取图标配置的异步函数
 * @returns 图标配置对象
 */
export async function getIconConfigAsync(): Promise<IconConfigYaml> {
  return await loadIconConfig()
}


// 自动初始化
initializeConfig()



