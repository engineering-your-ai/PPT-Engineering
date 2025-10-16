/**
 * 路径处理相关工具函数
 */

/**
 * 获取应用基础路径
 * @returns 基础路径
 */
export function getBasePath(): string {
  return import.meta.env.BASE_URL || '/'
}

/**
 * 构建配置文件URL
 * @param configPath 配置文件相对路径
 * @returns 完整的配置文件URL
 */
export function buildConfigUrl(configPath: string): string {
  const basePath = getBasePath()
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  const cleanConfigPath = configPath.startsWith('/') ? configPath : `/${configPath}`
  return `${cleanBasePath}${cleanConfigPath}`
}

/**
 * 构建完整路径 - 用于菜单和导航
 * @param path 路由路径（相对或绝对）
 * @returns 完整路径（绝对）
 */
export function buildFullPath(path: string): string {
  if (!path || path === '') return '/'
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return cleanPath
}

/**
 * 解析资源路径
 * @param resourcePath 资源路径
 * @returns 解析后的完整路径
 */
export function resolveResourcePath(resourcePath: string): string {
  // 如果是绝对HTTP路径，直接返回
  if (resourcePath.startsWith('http')) {
    return resourcePath
  }
  
  // 获取BASE_URL
  const basePath = getBasePath()
  
  // 如果是以/开头的绝对路径，需要结合BASE_URL
  if (resourcePath.startsWith('/')) {
    // 移除resourcePath开头的/，然后与basePath结合
    const cleanResourcePath = resourcePath.substring(1)
    return `${basePath}${cleanResourcePath}`.replace(/\/+/g, '/')
  }
  
  // 相对路径，直接结合BASE_URL
  return `${basePath}${resourcePath}`.replace(/\/+/g, '/')
}

/**
 * 规范化路径
 * @param path 路径
 * @returns 规范化后的路径
 */
export function normalizePath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

/**
 * 连接路径片段
 * @param paths 路径片段
 * @returns 连接后的路径
 */
export function joinPaths(...paths: string[]): string {
  return normalizePath(paths.filter(Boolean).join('/'))
}