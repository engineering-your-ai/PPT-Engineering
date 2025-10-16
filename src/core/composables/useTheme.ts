import { computed, ref, watch, type ComputedRef, type CSSProperties } from 'vue'
import { parse } from 'yaml'

/**
 * 主题配色系统
 * 
 * 该系统支持从 themes.yaml 配置文件动态加载主题配置，
 * 不再依赖硬编码的主题类型定义，提供更好的扩展性。
 * 
 * 使用方式：
 * 1. 在 themes.config.yaml 中定义新的主题配置
 * 2. 调用 loadThemeConfigs() 加载配置
 * 3. 使用 getAvailableThemes() 获取可用主题列表
 * 4. 使用 isValidTheme() 验证主题有效性
 */

/**
 * 自定义配色方案类型定义
 * 动态从配置文件中获取可用的主题类型
 */
export type CustomTheme = string

/**
 * 可用主题键名缓存
 */
const availableThemes = ref<string[]>(['white']) // 默认包含白色主题作为后备

/**
 * 调色板配置接口 - 根据themes.config.yaml的最新格式
 */
export interface PaletteConfig {
  text: {
    primary: string
    secondary: string
    invert: string
  }
  background: {
    default: string
    invert: string
  }
  border: {
    default: string
    subtle: string
  }
  link: {
    default: string
    hover: string
    visited: string
  }
  accent: string[]
}

/**
 * 字体排印配置接口
 */
export interface TypographyConfig {
  headingfont: string
  bodyfont: string
  codefont: string
  baseFontSize: string
}

/**
 * 主题配色配置接口 - 根据themes.config.yaml的最新格式
 */
export interface ThemeConfig {
  name: string
  description: string
  logo?: string
  invertLogo?: string // 反色Logo图片路径
  palette: PaletteConfig
  typography: TypographyConfig
}

/**
 * 主题样式变量接口
 */
export interface ThemeStyles extends CSSProperties {
  // 文本色变量
  '--theme-text-primary': string
  '--theme-text-secondary': string
  '--theme-text-invert': string
  
  // 背景色变量
  '--theme-bg-default': string
  '--theme-bg-invert': string
  
  // 边框色变量
  '--theme-border-default': string
  '--theme-border-subtle': string
  
  // 链接色变量
  '--theme-link-default': string
  '--theme-link-hover': string
  '--theme-link-visited': string
  
  // 字体变量
  '--theme-font-heading': string
  '--theme-font-body': string
  '--theme-font-code': string
  '--theme-font-size-base': string
  
  // 强调色变量（动态生成）
  [key: `--theme-accent-${number}`]: string
}

/**
 * 主题配置文件结构接口
 */
interface ThemeConfigFile {
  themes: Record<string, ThemeConfig>
  default: {
    theme: string
  }
}

// 主题配置缓存
const themeConfigs = ref<Record<string, ThemeConfig> | null>(null)
const defaultTheme = ref<string>('white')

/**
 * 加载主题配置
 */
export async function loadThemeConfigs(): Promise<void> {
  try {
    const basePath = import.meta.env.BASE_URL || '/'
    const configUrl = `${basePath}config/themes.config.yaml`.replace(/\/+/g, '/')
    
    const response = await fetch(configUrl)
    if (!response.ok) {
      throw new Error(`Failed to load themes config: ${response.statusText}`)
    }
    
    const yamlText = await response.text()
    const config = parse(yamlText) as ThemeConfigFile
    
    themeConfigs.value = config.themes
    defaultTheme.value = config.default.theme
    // 更新可用主题列表
    availableThemes.value = Object.keys(config.themes)
  } catch (error) {
    console.error('Failed to load theme configs:', error)
    // 使用默认的白色主题作为后备
    themeConfigs.value = {
      white: {
        name: '白色经典',
        description: '纯净白色，简约经典',
        logo: '/img/logo/ppt-e.png',
        palette: {
          text: {
            primary: '#4f46e5',
            secondary: '#10b981',
            invert: '#9ca3af'
          },
          background: {
            default: '#ffffff',
            invert: '#f9fafb'
          },
          border: {
            default: '#e5e7eb',
            subtle: '#d1d5db'
          },
          link: {
            default: '#3b82f6',
            hover: '#2563eb',
            visited: '#7c3aed'
          },
          accent: ['#6366f1', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa']
        },
        typography: {
          headingfont: 'Noto Sans SC',
          bodyfont: 'Noto Sans SC',
          codefont: 'Fira Code',
          baseFontSize: '16px'
        }
      }
    }
    availableThemes.value = ['white']
    defaultTheme.value = 'white'
  }
}

/**
 * 验证主题是否有效
 * @param theme 要验证的主题名称
 * @returns 主题是否在可用列表中
 */
export function isValidTheme(theme: string): boolean {
  return availableThemes.value.includes(theme)
}

/**
 * 获取可用的主题列表
 * @returns 可用主题键名数组
 */
export function getAvailableThemes(): string[] {
  return availableThemes.value
}

/**
 * 获取默认主题
 * @returns 配置文件中的默认主题
 */
export function getDefaultTheme(): string {
  return defaultTheme.value
}

/**
 * 获取所有主题配置
 * @returns 所有主题配置对象
 */
export function getThemeConfigs(): Record<string, ThemeConfig> | null {
  return themeConfigs.value
}

/**
 * 重新加载主题配置
 */
export async function reloadThemeConfigs(): Promise<void> {
  // 直接重新加载，不使用缓存
  await loadThemeConfigs()
}

/**
 * 主题配色系统 Composable
 * 提供主题配置和样式变量的计算逻辑
 * 
 * @param theme 可选的主题参数，如果不传入则自动使用全局主题
 */
export function useTheme(theme?: string | ComputedRef<string>) {
  // 确保主题配置已加载
  if (!themeConfigs.value) {
    loadThemeConfigs()
  }

  // 确保全局主题已初始化
  if (!isGlobalThemeInitialized.value) {
    initializeGlobalTheme()
  }

  /**
   * 计算当前使用的主题名称
   * 优先级：传入的主题参数 > 全局主题 > 默认主题
   */
  const resolvedTheme = computed(() => {
    if (theme) {
      // 如果传入了主题参数，使用传入的主题
      return typeof theme === 'string' ? theme : theme.value
    }
    // 如果没有传入主题参数，使用全局主题
    return globalTheme.value || getDefaultTheme()
  })

  /**
   * 计算主题配置
   */
  const themeConfig = computed(() => {
    const currentTheme = resolvedTheme.value
    const configs = themeConfigs.value
    
    if (!configs) {
      // 如果配置未加载，返回默认白色主题配置
      return undefined
    }
    
    // 确保主题配置存在，如果不存在则使用默认的白色主题
    return configs[currentTheme] || configs['white']
  })

  /**
   * 计算主题样式类名
   */
  const themeClass = computed(() => {
    const currentTheme = resolvedTheme.value
    const configs = themeConfigs.value
    
    if (!configs) {
      return 'theme-white'
    }
    
    // 确保主题值有效，如果无效则使用白色主题
    const validTheme = configs[currentTheme] ? currentTheme : 'white'
    return `theme-${validTheme}`
  })

  /**
   * 计算主题样式变量
   */
  const themeStyles = computed((): ThemeStyles => {
    const config = themeConfig.value
    if (!config) {
      return {} as ThemeStyles
    }
    
    const styles: ThemeStyles = {
      // 文本色变量
      '--theme-text-primary': config.palette.text.primary,
      '--theme-text-secondary': config.palette.text.secondary,
      '--theme-text-invert': config.palette.text.invert,
      
      // 背景色变量
      '--theme-bg-default': config.palette.background.default,
      '--theme-bg-invert': config.palette.background.invert,
      
      // 边框色变量
      '--theme-border-default': config.palette.border.default,
      '--theme-border-subtle': config.palette.border.subtle,
      
      // 链接色变量
      '--theme-link-default': config.palette.link.default,
      '--theme-link-hover': config.palette.link.hover,
      '--theme-link-visited': config.palette.link.visited,
      
      // 字体变量
      '--theme-font-heading': config.typography.headingfont,
      '--theme-font-body': config.typography.bodyfont,
      '--theme-font-code': config.typography.codefont,
      '--theme-font-size-base': config.typography.baseFontSize
    } as ThemeStyles
    
    // 动态添加强调色变量
    config.palette.accent.forEach((color, index) => {
      (styles as any)[`--theme-accent-${index + 1}`] = color
    })
    
    return styles
  })

  /**
   * 计算主题Logo路径
   */
  const themeLogo = computed(() => {
    const config = themeConfig.value
    // console.log('themeConfig', config)
    const logoPath = config.logo || 'img/logo/default.svg'
    
    // 如果是绝对HTTP路径，直接返回
    if (logoPath.startsWith('http')) {
      return logoPath
    }
    
    // 获取BASE_URL
    const basePath = import.meta.env.BASE_URL || '/'
    
    // 如果是以/开头的绝对路径，需要结合BASE_URL
    if (logoPath.startsWith('/')) {
      // 移除logoPath开头的/，然后与basePath结合
      const cleanLogoPath = logoPath.substring(1)
      return `${basePath}${cleanLogoPath}`.replace(/\/+/g, '/')
    }
    
    // 相对路径，直接结合BASE_URL
    return `${basePath}${logoPath}`.replace(/\/+/g, '/')
  })

  /**
   * 计算主题反色Logo路径
   */
  const themeInvertLogo = computed(() => {
    const config = themeConfig.value
    if (!config?.invertLogo) {
      // 如果没有配置反色Logo，返回默认Logo
      return themeLogo.value
    }
    
    const logoPath = config.invertLogo
    
    // 如果是绝对HTTP路径，直接返回
    if (logoPath.startsWith('http')) {
      return logoPath
    }
    
    // 获取BASE_URL
    const basePath = import.meta.env.BASE_URL || '/'
    
    // 如果是以/开头的绝对路径，需要结合BASE_URL
    if (logoPath.startsWith('/')) {
      // 移除logoPath开头的/，然后与basePath结合
      const cleanLogoPath = logoPath.substring(1)
      return `${basePath}${cleanLogoPath}`.replace(/\/+/g, '/')
    }
    
    // 相对路径，直接结合BASE_URL
    return `${basePath}${logoPath}`.replace(/\/+/g, '/')
  })

  return {
    themeConfig,
    themeClass,
    themeStyles,
    themeLogo,
    themeInvertLogo,
    // 暴露配置管理方法
    loadThemeConfigs,
    reloadThemeConfigs,
    getThemeConfigs,
    getAvailableThemes,
    getDefaultTheme,
    isValidTheme
  }
}

// ==================== 全局主题状态管理 ====================
// 整合自 useGlobalTheme.ts 的功能

// 全局主题状态
const globalTheme = ref<string>('')
const isGlobalThemeInitialized = ref(false)

/**
 * 从localStorage获取用户主题偏好
 * @returns 用户保存的主题名称或null
 */
function getUserThemePreference(): string | null {
  try {
    return localStorage.getItem('app-theme-preference')
  } catch {
    return null
  }
}

/**
 * 保存用户主题偏好到localStorage
 * @param theme 主题名称
 */
function saveUserThemePreference(theme: string): void {
  try {
    localStorage.setItem('app-theme-preference', theme)
    // console.log('主题偏好已保存到localStorage:', theme)
  } catch (error) {
    console.warn('无法保存主题偏好到localStorage', error)
  }
}

/**
 * 初始化全局主题状态
 */
export async function initializeGlobalTheme(): Promise<void> {
  if (isGlobalThemeInitialized.value) {
    return
  }

  // console.log('=== 初始化全局主题状态 ===')
  
  // 确保主题配置已加载
  await loadThemeConfigs()
  
  // 按优先级解析主题
  let resolvedTheme = ''
  
  // 1. 用户偏好主题（最高优先级）
  const userTheme = getUserThemePreference()
  if (userTheme && isValidTheme(userTheme)) {
    resolvedTheme = userTheme
    // console.log('使用用户偏好主题:', resolvedTheme)
  } else {
    // 2. 默认主题
    resolvedTheme = getDefaultTheme()
    // console.log('使用默认主题:', resolvedTheme)
  }
  
  // 设置全局主题
  globalTheme.value = resolvedTheme
  isGlobalThemeInitialized.value = true
  
  // console.log('全局主题初始化完成:', resolvedTheme)
}

/**
 * 切换全局主题
 * @param theme 新的主题名称
 */
export function setGlobalTheme(theme: string): void {
  if (!isValidTheme(theme)) {
    console.warn('无效的主题名称:', theme)
    return
  }
  
  console.log('切换全局主题:', theme)
  
  // 更新全局状态
  globalTheme.value = theme
  
  // 保存到localStorage
  saveUserThemePreference(theme)
  
  console.log('全局主题已更新为:', theme)
}

/**
 * 获取当前全局主题
 * @returns 当前全局主题名称
 */
export function getCurrentGlobalTheme(): string {
  return globalTheme.value || getDefaultTheme()
}

/**
 * 全局主题管理Composable
 * 提供响应式的全局主题状态和管理方法
 */
export function useGlobalTheme() {
  // 如果未初始化，自动初始化
  if (!isGlobalThemeInitialized.value) {
    initializeGlobalTheme()
  }
  
  /**
   * 当前全局主题（响应式）
   */
  const currentTheme = computed(() => {
    return globalTheme.value || getDefaultTheme()
  })
  
  /**
   * 主题是否已初始化
   */
  const initialized = computed(() => isGlobalThemeInitialized.value)
  
  /**
   * 获取可用主题列表
   */
  const availableThemes = computed(() => {
    const configs = getThemeConfigs()
    return configs ? Object.keys(configs) : ['white']
  })
  
  /**
   * 获取主题显示名称
   */
  const getThemeDisplayName = (themeKey: string): string => {
    const configs = getThemeConfigs()
    return configs?.[themeKey]?.name || themeKey
  }
  
  return {
    // 状态
    currentTheme,
    initialized,
    availableThemes,
    
    // 方法
    setGlobalTheme,
    getCurrentGlobalTheme,
    getThemeDisplayName,
    initializeGlobalTheme
  }
}
