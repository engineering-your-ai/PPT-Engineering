/**
 * 页面捕获服务
 * 负责捕获页面内容并转换为Canvas
 */

import { snapdom } from '@zumer/snapdom'
import type { CaptureOptions, PageInfo } from '@/core/types/pdf-export'
import { waitForPageLoad, waitForImages, getPageDimensions } from '../utils/dom'
import { optimizeCanvas } from '../utils/file'

export class PageCaptureService {
  private static instance: PageCaptureService
  private defaultOptions: CaptureOptions = {
    scale: 2,
    useCORS: true,
    allowTaint: false, // 先禁用allowTaint，避免污染画布
    backgroundColor: '#ffffff', // 使用白色背景，避免透明背景问题
    timeout: 15000
  }

  /**
   * 获取单例实例
   */
  static getInstance(): PageCaptureService {
    if (!PageCaptureService.instance) {
      PageCaptureService.instance = new PageCaptureService()
    }
    return PageCaptureService.instance
  }

  /**
   * 捕获指定元素
   * @param element 要捕获的HTML元素
   * @param options 捕获选项
   * @returns Promise<HTMLCanvasElement>
   */
  async captureElement(
    element: HTMLElement,
    options?: CaptureOptions
  ): Promise<HTMLCanvasElement> {
    const mergedOptions = { ...this.defaultOptions, ...options }
    
    // console.log('开始捕获元素:', element)
    // console.log('捕获选项:', mergedOptions)
    
    try {
      // 预处理元素以优化捕获效果
      const cleanup = this.preprocessElement(element)
      
      try {
        // 等待页面加载完成
        await waitForPageLoad(5000)
        
        // 页面加载完成后额外等待 500ms，确保异步渲染或过渡动画结束
        await new Promise<void>(resolve => setTimeout(resolve, 500))
        
        // 始终等待图片加载完成，确保资源就绪
        await waitForImages(element)
        
        // 获取元素尺寸
        const rect = element.getBoundingClientRect()
        // console.log('元素尺寸:', rect)
        
        if (rect.width === 0 || rect.height === 0) {
          throw new Error(`元素尺寸无效: ${rect.width}x${rect.height}`)
        }
        
        // 使用 snapdom 捕获（支持 useProxy）
        const capPromise = snapdom(element, {
          scale: mergedOptions.scale ?? 2,
          ...(mergedOptions.proxyUrl ? { useProxy: mergedOptions.proxyUrl } : {})
        })
        const timeout = mergedOptions.timeout ?? 15000
        const timedCap = new Promise<any>((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error(`捕获超时(${timeout}ms)`))
          }, timeout)
          capPromise.then(res => {
            clearTimeout(timer as unknown as number)
            resolve(res)
          }).catch(err => {
            clearTimeout(timer as unknown as number)
            reject(err)
          })
        })
        const result = await timedCap

        // 生成PNG图片元素
        const output = await result.toPng()

        // 规范化为 HTMLImageElement
        const img: HTMLImageElement = (output instanceof HTMLImageElement)
          ? output
          : (() => {
              const i = new Image()
              i.src = String(output)
              return i
            })()

        const ensureImageLoaded = async (): Promise<HTMLImageElement> => {
          await new Promise<void>((resolve, reject) => {
            if (img.complete && img.naturalWidth > 0) return resolve()
            const onLoad = () => {
              cleanupLoad()
              resolve()
            }
            const onError = () => {
              cleanupLoad()
              reject(new Error('图片解码失败'))
            }
            const cleanupLoad = () => {
              img.removeEventListener('load', onLoad)
              img.removeEventListener('error', onError)
            }
            img.addEventListener('load', onLoad, { once: true })
            img.addEventListener('error', onError, { once: true })
          })
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            throw new Error('图片尺寸无效')
          }
          return img
        }

        let finalImg: HTMLImageElement
        try {
          finalImg = await ensureImageLoaded()
        } catch (e) {
          // 使用代理重试
          if (mergedOptions.proxyUrl) {
            const proxied = await snapdom(element, {
              scale: mergedOptions.scale ?? 2,
              useProxy: mergedOptions.proxyUrl
            })
            const proxiedOutput = await proxied.toPng()
            finalImg = (proxiedOutput instanceof HTMLImageElement) ? proxiedOutput : (() => {
              const i = new Image()
              i.src = String(proxiedOutput)
              return i
            })()
            await ensureImageLoaded()
          } else {
            throw e
          }
        }

        // 基础画布：先用图片自然尺寸
        const baseCanvas = document.createElement('canvas')
        const baseCtx = baseCanvas.getContext('2d')
        if (!baseCtx) {
          throw new Error('无法创建Canvas上下文')
        }

        baseCanvas.width = img.naturalWidth
        baseCanvas.height = img.naturalHeight

        // 先填充背景色，避免透明背景问题
        if (mergedOptions.backgroundColor) {
          baseCtx.fillStyle = mergedOptions.backgroundColor
          baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height)
        }

        // 绘制图片到基础Canvas
        baseCtx.imageSmoothingEnabled = true
        baseCtx.imageSmoothingQuality = 'high'
        baseCtx.drawImage(img, 0, 0)

        // 如果指定了目标宽/高，则按照目标尺寸生成最终Canvas
        let finalCanvas = baseCanvas
        const targetWidth = mergedOptions.width
        const targetHeight = mergedOptions.height

        if (targetWidth || targetHeight) {
          const aspect = baseCanvas.width / baseCanvas.height
          let outW = targetWidth ?? Math.round((targetHeight as number) * aspect)
          let outH = targetHeight ?? Math.round((targetWidth as number) / aspect)

          // 保护：避免0或NaN
          outW = Math.max(1, Math.round(outW))
          outH = Math.max(1, Math.round(outH))

          const resized = document.createElement('canvas')
          const rctx = resized.getContext('2d')
          if (rctx) {
            resized.width = outW
            resized.height = outH
            rctx.imageSmoothingEnabled = true
            rctx.imageSmoothingQuality = 'high'
            rctx.drawImage(baseCanvas, 0, 0, resized.width, resized.height)
            finalCanvas = resized
          }
        }

        // console.log('snapdom捕获完成，canvas尺寸:', finalCanvas.width, 'x', finalCanvas.height)
        
        // 检查canvas是否有效
        if (finalCanvas.width === 0 || finalCanvas.height === 0) {
          throw new Error(`生成的canvas尺寸无效: ${finalCanvas.width}x${finalCanvas.height}`)
        }
        
        // 检查canvas内容是否为空
        const checkCtx = finalCanvas.getContext('2d')
        if (checkCtx) {
          const imageData = checkCtx.getImageData(0, 0, Math.min(finalCanvas.width, 100), Math.min(finalCanvas.height, 100))
          const isEmpty = imageData.data.every((pixel, index) => {
            // 检查RGBA，如果所有像素都是透明的或者都是黑色，可能有问题
            if (index % 4 === 3) return true // 跳过alpha通道
            return pixel === 0
          })
          
          if (isEmpty) {
            console.warn('警告：捕获的canvas似乎是空的或全黑的')
          }
        }
        
        return finalCanvas
      } finally {
        // 清理预处理效果
        cleanup()
      }
    } catch (error) {
      console.error('页面捕获失败:', error)
      console.error('元素信息:', {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight
      })
      throw new Error(`页面捕获失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  /**
   * 捕获当前页面的主要内容区域
   * @param options 捕获选项
   * @returns Promise<HTMLCanvasElement>
   */
  async captureCurrentPage(options?: CaptureOptions): Promise<HTMLCanvasElement> {
    // 查找主要内容区域，优先级更高
    const contentElement = this.findBestContentElement()
    if (!contentElement) {
      throw new Error('未找到页面内容区域')
    }
    
    return this.captureElement(contentElement, options)
  }



  /**
   * 获取页面尺寸
   * @returns 页面尺寸对象
   */
  getPageDimensions(): { width: number; height: number } {
    return getPageDimensions()
  }



  /**
   * 预处理页面元素以优化捕获效果
   * @param element 要处理的元素
   * @returns 清理函数
   */
  private preprocessElement(element: HTMLElement): () => void {
    const cleanupFunctions: Array<() => void> = []
    
    // console.log('开始预处理元素:', element.tagName, element.className)
    
    // 1. 确保元素可见
    const originalStyle = {
      position: element.style.position,
      visibility: element.style.visibility,
      opacity: element.style.opacity,
      display: element.style.display,
      padding: element.style.padding,
      margin: element.style.margin,
      boxShadow: element.style.boxShadow,
      borderRadius: element.style.borderRadius,
      overflow: element.style.overflow,
      backgroundClip: (element.style as any).backgroundClip
    }
    
    // 强制显示元素
    if (window.getComputedStyle(element).display === 'none') {
      element.style.display = 'block'
    }
    if (window.getComputedStyle(element).visibility === 'hidden') {
      element.style.visibility = 'visible'
    }
    if (window.getComputedStyle(element).opacity === '0') {
      element.style.opacity = '1'
    }
    
    cleanupFunctions.push(() => {
      Object.assign(element.style, originalStyle)
    })
    
    // 2. 处理懒加载图片
    const lazyImages = element.querySelectorAll('img[data-src], img[loading="lazy"]')
    // console.log('找到懒加载图片数量:', lazyImages.length)
    
    lazyImages.forEach(img => {
      const imgElement = img as HTMLImageElement
      const dataSrc = imgElement.getAttribute('data-src')
      if (dataSrc && !imgElement.src) {
        // console.log('加载懒加载图片:', dataSrc)
        imgElement.src = dataSrc
      }
      imgElement.removeAttribute('loading')
    })
    
    // 3. 等待字体加载
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // console.log('所有字体已加载完成')
      })
    }
    
    // 4. 全幅捕获（移除装饰性的边距与阴影）
    try {
      const isLikelyPageContent = element.classList.contains('page-content') ||
        /(page|content)/i.test(element.className)
      if (isLikelyPageContent) {
        // 记录直接子元素的样式（路由视图容器）
        const child = element.firstElementChild as HTMLElement | null
        const childOriginal: any = child ? {
          padding: child.style.padding,
          margin: child.style.margin,
          boxShadow: child.style.boxShadow,
          borderRadius: child.style.borderRadius,
          overflow: child.style.overflow,
        } : null

        // 去除容器和其子元素的装饰确保无边距
        element.style.padding = '0'
        element.style.margin = '0'
        element.style.boxShadow = 'none'
        element.style.borderRadius = '0'
        element.style.overflow = 'hidden'
        ;(element.style as any).backgroundClip = 'border-box'

        if (child) {
          child.style.padding = '0'
          child.style.margin = '0'
          child.style.boxShadow = 'none'
          child.style.borderRadius = '0'
          child.style.overflow = 'hidden'
        }

        cleanupFunctions.push(() => {
          if (child && childOriginal) {
            Object.assign(child.style, childOriginal)
          }
        })
      }
    } catch (e) {
      console.warn('应用全幅捕获样式时出错:', e)
    }

    // 返回统一的清理函数
    return () => {
      cleanupFunctions.forEach(cleanup => {
        try {
          cleanup()
        } catch (error) {
          console.warn('清理预处理效果时出错:', error)
        }
      })
    }
  }

  /**
   * 优化Canvas质量
   * @param canvas 原始canvas
   * @param quality 质量参数(0-1)
   * @returns 优化后的canvas
   */
  optimizeCanvas(canvas: HTMLCanvasElement, quality: number = 0.9): HTMLCanvasElement {
    return optimizeCanvas(canvas, quality)
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    // 清理可能的内存泄漏
    // 这里可以添加清理逻辑
  }

  /**
   * 创建优化的Canvas元素
   * @param element 目标元素
   * @param scale 缩放比例
   * @returns 优化的Canvas元素
   */
  private createOptimizedCanvas(element: HTMLElement, scale: number): HTMLCanvasElement | undefined {
    try {
      const rect = element.getBoundingClientRect()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return undefined
      
      // 设置高分辨率
      canvas.width = rect.width * scale
      canvas.height = rect.height * scale
      
      // 优化渲染设置
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      return canvas
    } catch (error) {
      console.warn('创建优化Canvas失败:', error)
      return undefined
    }
  }

  /**
   * 查找最佳的内容区域
   * @returns HTMLElement | null
   */
  private findBestContentElement(): HTMLElement | null {
    // 扩展的查找选择器，按优先级排序
    const selectors = [
      // Vue应用特定选择器
      '.page-content',
      '.main-content', 
      '.content-wrapper',
      '.container',
      '.app-content',
      
      // 通用内容选择器
      '[data-content]',
      '[role="main"]',
      '.content',
      'main',
      
      // Vue应用结构
      '#app > div:first-child',
      '#app > .layout',
      '#app > main',
      '#app'
    ]
    
    for (const selector of selectors) {
      try {
        const element = document.querySelector(selector) as HTMLElement
        if (this.isValidContentElement(element)) {
          // 优先选择 .page-content 的直接子元素作为真实页面内容，避免容器装饰
          if (selector === '.page-content') {
            const child = element.firstElementChild as HTMLElement | null
            if (child && this.isValidContentElement(child)) {
              return child
            }
          }
          // console.log(`找到内容元素: ${selector}`)
          return element
        }
      } catch (error) {
        console.warn(`查找元素失败: ${selector}`, error)
      }
    }
    
    // 如果都没找到，使用body作为备选
    console.warn('未找到理想的内容元素，使用body')
    return document.body
  }

  /**
   * 验证元素是否为有效的内容元素
   * @param element 要验证的元素
   * @returns 是否有效
   */
  private isValidContentElement(element: HTMLElement | null): element is HTMLElement {
    if (!element) return false
    
    // 检查元素是否可见且有尺寸
    const rect = element.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(element)
    
    const isVisible = (
      rect.width > 0 && 
      rect.height > 0 && 
      computedStyle.visibility !== 'hidden' &&
      computedStyle.display !== 'none' &&
      parseFloat(computedStyle.opacity) > 0
    )
    
    // 检查元素尺寸是否合理（至少100x100像素）
    const hasReasonableSize = rect.width >= 100 && rect.height >= 100
    
    return isVisible && hasReasonableSize
  }

  /**
   * 确保CSS变量和自定义属性可用
   * @param element 目标元素
   */
  private ensureCSSVariables(element: HTMLElement): void {
    try {
      // 获取所有CSS自定义属性
      const computedStyle = window.getComputedStyle(document.documentElement)
      const cssVariables: Record<string, string> = {}
      
      // 提取CSS变量
      for (let i = 0; i < computedStyle.length; i++) {
        const property = computedStyle[i]
        if (property.startsWith('--')) {
          cssVariables[property] = computedStyle.getPropertyValue(property)
        }
      }
      
      // 如果有CSS变量，确保它们可用
      if (Object.keys(cssVariables).length > 0) {
        // 创建一个临时样式表来确保CSS变量在捕获时可用
        const style = document.createElement('style')
        const cssText = `:root { ${Object.entries(cssVariables)
          .map(([key, value]) => `${key}: ${value}`)
          .join('; ')} }`
        style.textContent = cssText
        style.setAttribute('data-html2canvas-css-vars', 'true')
        
        document.head.appendChild(style)
        
        // 记录清理函数以便后续移除
        setTimeout(() => {
          if (style.parentNode) {
            style.parentNode.removeChild(style)
          }
        }, 1000)
      }
      
      // 处理Tailwind CSS类名确保样式正常加载
      this.ensureTailwindStyles()
      
    } catch (error) {
      console.warn('处理CSS变量时出错:', error)
    }
  }

  /**
   * 确保Tailwind CSS样式正常加载
   */
  private ensureTailwindStyles(): void {
    try {
      // 检查是否有Tailwind CSS
      const tailwindStylesheet = Array.from(document.styleSheets).find(sheet => {
        try {
          return sheet.href && (sheet.href.includes('tailwind') || 
                  Array.from(sheet.cssRules || []).some(rule => 
                    rule.cssText.includes('tailwind') || 
                    rule.cssText.includes('tw-')
                  ))
        } catch {
          return false
        }
      })
      
      if (tailwindStylesheet) {
        // console.log('Tailwind CSS样式表已找到，样式应该正常加载')
      }
    } catch (error) {
      console.warn('检查Tailwind CSS时出错:', error)
    }
  }
}

// 导出单例实例
export const pageCaptureService = PageCaptureService.getInstance()