<template>
  <div 
    id="app" 
    :class="themeClass"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useGlobalTheme, useTheme } from '@/core/composables/useTheme'

/**
 * 主应用组件
 * 提供路由视图容器并应用全局主题样式
 */

// 获取全局主题状态
const { currentTheme } = useGlobalTheme()

// 应用主题样式到根元素
const { themeClass, themeStyles } = useTheme(currentTheme)

/**
 * 将主题样式应用到document.documentElement（:root）
 * 确保CSS变量在全局范围内生效
 */
const applyThemeToRoot = () => {
  const styles = themeStyles.value
  if (styles && document.documentElement) {
    // 将所有主题CSS变量应用到:root
    Object.entries(styles).forEach(([key, value]) => {
      if (key.startsWith('--theme-')) {
        document.documentElement.style.setProperty(key, value as string)
      }
    })
    // console.log('主题样式已应用到:root', styles)
  }
}

// 监听主题变化，实时更新CSS变量
watch(
  () => themeStyles.value,
  () => {
    applyThemeToRoot()
  },
  { immediate: true, deep: true }
)

// 组件挂载时确保主题样式已应用
onMounted(() => {
  applyThemeToRoot()
})
</script>

<style>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>



