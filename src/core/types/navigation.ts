/**
 * 导航相关类型定义
 */
import type { BaseRouteConfig, BaseRouteMeta } from './routes'

/**
 * 完整路由配置接口（用于Vue Router）
 */
export interface RouteConfig extends BaseRouteConfig {
  name: string
  component: () => Promise<any>
  meta: RouteMeta
  children?: RouteConfig[]
}

/**
 * 扩展路由元信息接口（兼容Vue Router）
 */
export interface RouteMeta extends BaseRouteMeta {
  breadcrumb?: boolean
  disabled?: boolean
  [key: string]: any // 兼容Vue Router的RouteMeta
  [key: symbol]: any // 兼容Vue Router的RouteMeta
}

/**
 * 导航项接口
 */
export interface NavigationItem {
  id: string
  title: string
  path: string
  icon?: string
  order: number
  hidden: boolean
  disabled: boolean
  children?: NavigationItem[]
  meta?: Record<string, any>
}



/**
 * 导航配置接口
 */
export interface NavigationConfig {
  items: NavigationItem[]
  collapsed: boolean
  mode: 'vertical' | 'horizontal'
}

/**
 * 路由导航配置接口（用于YAML配置）
 */
export interface RouteNavigationConfig {
  routes: BaseRouteConfig[]
  defaultPath?: string
  collapsible?: boolean
}

/**
 * 图标映射类型
 */
export type IconMap = Record<string, any>

/**
 * 路由激活状态检查函数类�? */
export type RouteActiveChecker = (path: string, currentPath: string) => boolean

/**
 * 菜单项点击事件类�? */
export type MenuItemClickHandler = (item: NavigationItem) => void