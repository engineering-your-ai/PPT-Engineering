/**
 * 全局类型定义
 */

// 应用配置接口
export interface AppConfig {
  title: string
  version: string
  description?: string
  logo?: string
}

// 侧边栏配置接口
export interface SidebarConfig {
  width: number
  collapsible: boolean
  defaultCollapsed: boolean
}



// 通用响应接口
export interface BaseResponse<T = any> {
  success: boolean
  data: T
  message?: string
  code?: number
}


// 环境变量类型
export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BUILD_TIME: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}



