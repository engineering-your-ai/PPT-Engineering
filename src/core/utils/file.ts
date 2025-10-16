/**
 * 文件系统和下载相关工具函数
 */

/**
 * 生成文件名
 * @param customName 自定义文件名
 * @param nameTemplate 文件名模板，默认'export-{timestamp}'
 * @param includeTimestamp 是否包含时间戳
 * @param extension 文件扩展名，默认'.pdf'
 * @returns 生成的文件名
 */
export function generateFilename(
  customName?: string,
  nameTemplate: string = 'export-{timestamp}',
  includeTimestamp: boolean = true,
  extension: string = '.pdf'
): string {
  if (customName) {
    return customName.endsWith(extension) ? customName : `${customName}${extension}`
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  let filename = nameTemplate.replace('{timestamp}', timestamp)
  
  return filename.endsWith(extension) ? filename : `${filename}${extension}`
}

/**
 * 下载文件
 * @param blob 文件数据
 * @param filename 文件名
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 将Canvas转换为Blob
 * @param canvas Canvas元素
 * @param quality 图片质量(0-1)
 * @param type 图片类型
 * @returns Promise<Blob>
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number = 0.9,
  type: string = 'image/jpeg'
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Canvas转换为Blob失败'))
        }
      },
      type,
      quality
    )
  })
}

/**
 * 优化Canvas质量
 * @param canvas 原始canvas
 * @param quality 质量参数(0-1)
 * @returns 优化后的canvas
 */
export function optimizeCanvas(canvas: HTMLCanvasElement, quality: number = 0.9): HTMLCanvasElement {
  if (quality >= 1) {
    return canvas
  }
  
  const optimizedCanvas = document.createElement('canvas')
  const ctx = optimizedCanvas.getContext('2d')
  
  if (!ctx) {
    return canvas
  }
  
  // 根据质量调整尺寸
  const scale = Math.sqrt(quality)
  optimizedCanvas.width = canvas.width * scale
  optimizedCanvas.height = canvas.height * scale
  
  // 启用图像平滑
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  
  // 绘制优化后的图像
  ctx.drawImage(canvas, 0, 0, optimizedCanvas.width, optimizedCanvas.height)
  
  return optimizedCanvas
}