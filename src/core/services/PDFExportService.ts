/**
 * PDF导出服务
 * 负责协调页面捕获和PDF生成
 */

import jsPDF from 'jspdf'
import { nextTick } from 'vue'
import type { Router } from 'vue-router'
import { pageCaptureService } from './PageCaptureService'
import { ExportStatus } from '@/core/types/pdf-export'
import { generateFilename } from '../utils/file'
import type {
  ExportOptions,
  ExportProgress,
  ExportTask,
  ExportResult,
  PageCapture,
  ExportConfig,
  PageInfo
} from '@/core/types/pdf-export'

export class PDFExportService {
  private static instance: PDFExportService
  private currentTask: ExportTask | null = null
  private isExporting = false
  private router: Router | null = null
  private progressCallback: ((progress: ExportProgress) => void) | null = null

  // 默认配置
  private defaultConfig: ExportConfig = {
    pdf: {
      format: 'a4',
      orientation: 'landscape',
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    capture: {
      quality: 0.95,
      scale: 2,
      timeout: 15000,
      waitForImages: true,
      useCORS: true,
      backgroundColor: '#ffffff', // 使用白色背景避免透明问题
      proxyUrl: (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_SNAPDOM_PROXY_URL) || undefined
    },
    file: {
      nameTemplate: 'export-{timestamp}',
      includeTimestamp: true,
      compression: true
    }
  }

  /**
   * 获取单例实例
   */
  static getInstance(): PDFExportService {
    if (!PDFExportService.instance) {
      PDFExportService.instance = new PDFExportService()
    }
    return PDFExportService.instance
  }

  /**
   * 设置路由实例
   * @param router Vue Router实例
   */
  setRouter(router: Router): void {
    this.router = router
  }

  /**
   * 导出当前页面
   * @param options 导出选项
   * @returns Promise<ExportResult>
   */
  async exportCurrentPage(options?: ExportOptions): Promise<ExportResult> {
    if (this.isExporting) {
      throw new Error('已有导出任务正在进行中')
    }

    const task = this.createTask('current', options)
    this.currentTask = task
    this.isExporting = true

    try {
      // 更新任务状态
      this.updateTaskStatus(ExportStatus.IN_PROGRESS)

      // 捕获当前页面
      const canvas = await pageCaptureService.captureCurrentPage({
        scale: this.defaultConfig.capture.scale,
        useCORS: this.defaultConfig.capture.useCORS,
        allowTaint: false, // 避免污染画布
        backgroundColor: this.defaultConfig.capture.backgroundColor,
        timeout: this.defaultConfig.capture.timeout,
        proxyUrl: this.defaultConfig.capture.proxyUrl
      })

      // 生成PDF
      const pdf = await this.createPDF()
      this.addCanvasToPDF(pdf, canvas, 0)

      // 下载文件
      const filename = generateFilename(options?.filename)
      pdf.save(filename)

      // 更新任务状态
      this.updateTaskStatus(ExportStatus.COMPLETED)

      const result: ExportResult = {
        success: true,
        taskId: task.id,
        filename,
        pageCount: 1,
        duration: Date.now() - task.createdAt.getTime()
      }

      return result
    } catch (error) {
      this.updateTaskStatus(ExportStatus.FAILED, error instanceof Error ? error.message : '导出失败')
      throw error
    } finally {
      this.isExporting = false
      this.currentTask = null
    }
  }

  /**
   * 导出所有页面
   * @param options 导出选项
   * @param onProgress 进度回调函数
   * @returns Promise<ExportResult>
   */
  async exportAllPages(
    options?: ExportOptions,
    onProgress?: (progress: ExportProgress) => void
  ): Promise<ExportResult> {
    if (this.isExporting) {
      throw new Error('已有导出任务正在进行中')
    }

    if (!this.router) {
      throw new Error('未设置路由实例，无法导出所有页面')
    }

    const task = this.createTask('all', options)
    this.currentTask = task
    this.isExporting = true
    this.progressCallback = onProgress

    try {
      // 更新任务状态
      this.updateTaskStatus(ExportStatus.IN_PROGRESS)

      // 获取所有页面路由
      const pages = await this.getAllPages()
      if (pages.length === 0) {
        throw new Error('未找到可导出的页面')
      }

      // 更新任务总页面数
      task.totalPages = pages.length

      // 创建PDF实例
      const pdf = await this.createPDF()
      const captures: PageCapture[] = []

      // 逐页捕获和添加到PDF
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]

        try {
          // 更新进度
          this.updateProgress(i, pages.length, page.title)

          // 导航到页面
          await this.navigateToPage(page.route)

          // 等待页面加载
          await this.waitForPageReady()

          // 捕获页面
          const canvas = await pageCaptureService.captureCurrentPage({
            scale: this.defaultConfig.capture.scale,
            useCORS: this.defaultConfig.capture.useCORS,
            allowTaint: false, // 避免污染画布
            backgroundColor: this.defaultConfig.capture.backgroundColor,
            timeout: this.defaultConfig.capture.timeout,
            proxyUrl: this.defaultConfig.capture.proxyUrl
          })

          // 添加到PDF（第一页不需要新建页面）
          if (i > 0) {
            pdf.addPage()
          }
          this.addCanvasToPDF(pdf, canvas, i)

          // 记录捕获信息
          const capture: PageCapture = {
            id: `capture-${i}`,
            taskId: task.id,
            pageTitle: page.title,
            pageRoute: page.route,
            captureCanvas: canvas,
            order: i,
            capturedAt: new Date(),
            dimensions: {
              width: canvas.width,
              height: canvas.height
            }
          }
          captures.push(capture)

          // 更新已完成页面数
          task.completedPages = i + 1

        } catch (error) {
          console.error(`页面 ${page.title} 导出失败:`, error)
          // 继续处理下一页，不中断整个导出过程
        }
      }

      if (captures.length === 0) {
        throw new Error('没有成功捕获任何页面')
      }

      // 下载文件
      const filename = generateFilename(options?.filename)
      pdf.save(filename)

      // 更新任务状态
      this.updateTaskStatus(ExportStatus.COMPLETED)

      const result: ExportResult = {
        success: true,
        taskId: task.id,
        filename,
        pageCount: captures.length,
        duration: Date.now() - task.createdAt.getTime()
      }

      return result
    } catch (error) {
      this.updateTaskStatus(ExportStatus.FAILED, error instanceof Error ? error.message : '导出失败')
      throw error
    } finally {
      this.isExporting = false
      this.currentTask = null
      this.progressCallback = null
    }
  }

  /**
   * 取消导出
   */
  cancelExport(): void {
    if (this.currentTask && this.isExporting) {
      this.updateTaskStatus(ExportStatus.CANCELLED)
      this.isExporting = false
      this.currentTask = null
      this.progressCallback = null
    }
  }

  /**
   * 获取当前导出任务
   */
  getCurrentTask(): ExportTask | null {
    return this.currentTask
  }

  /**
   * 检查是否正在导出
   */
  isCurrentlyExporting(): boolean {
    return this.isExporting
  }

  /**
   * 创建导出任务
   * @param mode 导出模式
   * @param options 导出选项
   * @returns ExportTask
   */
  private createTask(mode: 'current' | 'all', options?: ExportOptions): ExportTask {
    const now = new Date()
    return {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      mode,
      status: ExportStatus.PENDING,
      progress: 0,
      filename: generateFilename(options?.filename),
      totalPages: mode === 'current' ? 1 : 0,
      completedPages: 0,
      createdAt: now,
      updatedAt: now
    }
  }

  /**
   * 更新任务状态
   * @param status 新状态
   * @param error 错误信息
   */
  private updateTaskStatus(status: ExportStatus, error?: string): void {
    if (this.currentTask) {
      this.currentTask.status = status
      this.currentTask.updatedAt = new Date()
      if (error) {
        this.currentTask.error = error
      }
    }
  }

  /**
   * 更新导出进度
   * @param current 当前页面索引
   * @param total 总页面数
   * @param currentPageTitle 当前页面标题
   */
  private updateProgress(current: number, total: number, currentPageTitle: string): void {
    if (this.currentTask) {
      const percentage = Math.round((current / total) * 100)
      this.currentTask.progress = percentage

      if (this.progressCallback) {
        this.progressCallback({
          current: current + 1,
          total,
          percentage,
          currentPageTitle,
          currentPageRoute: ''
        })
      }
    }
  }

  /**
   * 获取所有页面信息
   * @returns Promise<PageInfo[]>
   */
  private async getAllPages(): Promise<PageInfo[]> {
    try {
      // 直接使用route-generator.ts的函数，避免Vue composable的上下文问题
      const { getRouteInfosSortedByPageNumber } = await import('@/core/utils/route-generator')
      const routes = getRouteInfosSortedByPageNumber()
      
      return routes.map((route, index) => ({
        route: route.path,
        title: route.name || `页面 ${index + 1}`,
        order: route.pageNumber || index,
        meta: {
          pageNumber: route.pageNumber,
          level: route.level,
          hidden: route.hidden
        }
      }))
    } catch (error) {
      console.error('获取页面列表失败:', error)
      return []
    }
  }

  /**
   * 导航到指定页面
   * @param route 页面路由
   */
  private async navigateToPage(route: string): Promise<void> {
    if (!this.router) {
      throw new Error('路由实例未设置')
    }
    
    await this.router.push(route)
  }

  /**
   * 等待页面准备就绪
   * @param timeout 超时时间
   */
  private async waitForPageReady(timeout: number = 2000): Promise<void> {
    // 等待Vue的下一个tick
    await nextTick()
    
    // 等待页面加载完成
    await new Promise<void>((resolve) => {
      // 检查document.readyState
      if (document.readyState === 'complete') {
        resolve()
        return
      }
      
      const handleLoad = () => {
        document.removeEventListener('readystatechange', handleReadyStateChange)
        window.removeEventListener('load', handleLoad)
        resolve()
      }
      
      const handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
          handleLoad()
        }
      }
      
      document.addEventListener('readystatechange', handleReadyStateChange)
      window.addEventListener('load', handleLoad)
      
      // 超时保护
      setTimeout(() => {
        handleLoad()
      }, timeout)
    })
    
    // 额外等待确保页面渲染完成
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  /**
   * 创建PDF实例
   * @returns jsPDF实例
   */
  private async createPDF(): Promise<jsPDF> {
    // 获取当前页面的实际尺寸作为参考
    const { getPageDimensions } = await import('../utils/dom')
    const actualDimensions = getPageDimensions()
    
    // 计算合适的PDF尺寸
    const aspectRatio = actualDimensions.width / actualDimensions.height
    
    // 使用A4横向作为基准，但根据实际内容调整
    let pageWidth = 297 // A4横向宽度(mm)
    let pageHeight = 210 // A4横向高度(mm)
    
    // 如果内容比例与A4差异较大，使用自定义尺寸
    if (aspectRatio > 1.6 || aspectRatio < 1.2) {
      // 保持宽度，调整高度以匹配内容比例
      pageHeight = pageWidth / aspectRatio
    }
    
    return new jsPDF({
      orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pageWidth, pageHeight],
      compress: this.defaultConfig.file.compression,
      putOnlyUsedFonts: true,
      floatPrecision: 16
    })
  }

  /**
   * 将Canvas添加到PDF
   * @param pdf PDF实例
   * @param canvas Canvas元素
   * @param pageIndex 页面索引
   */
  private addCanvasToPDF(pdf: jsPDF, canvas: HTMLCanvasElement, pageIndex: number): void {
    // 获取PDF页面尺寸
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // 项目需要，不需要边距，改为全幅铺满（cover），通过裁剪消除空白边距
    const availableWidth = pageWidth
    const availableHeight = pageHeight

    // 根据PDF页面的宽高比裁剪原始canvas，避免留白且不拉伸
    const pageRatio = availableWidth / availableHeight
    const canvasRatio = canvas.width / canvas.height

    // 计算裁剪区域（源矩形）以匹配页面宽高比
    let sx = 0
    let sy = 0
    let sWidth = canvas.width
    let sHeight = canvas.height

    if (canvasRatio > pageRatio) {
      // 原画面更宽，裁掉左右两侧
      sWidth = Math.round(canvas.height * pageRatio)
      sx = Math.round((canvas.width - sWidth) / 2)
    } else if (canvasRatio < pageRatio) {
      // 原画面更高，裁掉上下两侧
      sHeight = Math.round(canvas.width / pageRatio)
      sy = Math.round((canvas.height - sHeight) / 2)
    }

    // 目标尺寸与PDF页面比例一致
    const destRatio = sWidth / sHeight
    // 使用一个中间画布进行裁剪，保持较高质量
    const cropCanvas = document.createElement('canvas')
    const cropCtx = cropCanvas.getContext('2d')
    if (!cropCtx) {
      throw new Error('无法创建裁剪Canvas上下文')
    }

    // 为减少再次缩放导致的失真，按照源裁剪区域的像素尺寸生成目标图
    cropCanvas.width = sWidth
    cropCanvas.height = sHeight
    cropCtx.imageSmoothingEnabled = true
    cropCtx.imageSmoothingQuality = 'high'
    cropCtx.drawImage(canvas, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight)

    // 导出裁剪后的图像数据
    const quality = Math.min(this.defaultConfig.capture.quality, 0.95)
    const imgData = cropCanvas.toDataURL('image/jpeg', quality)

    // 将裁剪后的图片以铺满的方式添加到PDF页面（无留白）
    const x = 0
    const y = 0
    const imgWidth = availableWidth
    const imgHeight = availableHeight

    try {
      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, '', 'FAST')
    } catch (error) {
      console.warn('添加高质量图片失败，尝试压缩图片:', error)
      const fallbackImgData = cropCanvas.toDataURL('image/jpeg', 0.7)
      pdf.addImage(fallbackImgData, 'JPEG', x, y, imgWidth, imgHeight)
    }
  }


}

// 导出单例实例
export const pdfExportService = PDFExportService.getInstance()