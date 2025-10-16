import { computed, type ComputedRef } from 'vue'

/**
 * 网格列数类型定义
 */
export type GridColumns = 1 | 2 | 3 | 4

/**
 * 网格间距类型定义
 */
export type GridGap = 'small' | 'medium' | 'large'

/**
 * 网格布局 Composable
 * 提供网格布局的样式类名计算逻辑
 */
export function useGrid(
  columns: GridColumns | ComputedRef<GridColumns>,
  gap: GridGap | ComputedRef<GridGap>
) {
  /**
   * 计算网格样式类名
   */
  const gridClass = computed(() => {
    const currentColumns = typeof columns === 'number' ? columns : columns.value
    const currentGap = typeof gap === 'string' ? gap : gap.value

    const columnClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4'
    }[currentColumns]

    const gapClass = {
      small: 'gap-4',
      medium: 'gap-6',
      large: 'gap-8'
    }[currentGap]

    return `grid ${columnClass} ${gapClass}`
  })

  return {
    gridClass
  }
}