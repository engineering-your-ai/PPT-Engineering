<template>
  <div v-if="visible" class="settings-modal-overlay" @click="handleOverlayClick">
    <div class="settings-modal" @click.stop>
      <!-- 模态框头部 -->
      <div class="settings-header">
        <h2 class="settings-title">应用设置</h2>
        <button class="close-button" @click="closeModal" title="关闭">
          <X :size="20" />
        </button>
      </div>

      <!-- 设置内容 -->
      <div class="settings-content">
        <!-- 全局主题配置 -->
        <div class="settings-section">
          <h3 class="section-title">全局主题配置</h3>
          <div class="setting-group">
            <label class="setting-label">应用主题</label>
            <select 
              v-model="localTheme" 
              class="setting-select"
              @change="onThemeChange"
            >
              <option v-for="theme in themeOptions" :key="theme.value" :value="theme.value">
                {{ theme.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- 当前配置预览 -->
        <div class="settings-section">
          <h3 class="section-title">当前配置预览</h3>
          <div class="config-preview">
            <div class="preview-item">
              <span class="preview-label">当前主题:</span>
              <span class="preview-value">{{ getThemeName(localTheme) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 模态框底部 -->
      <div class="settings-footer">
        <button class="reset-button" @click="resetToDefaults">
          重置为默认值
        </button>
        <button class="confirm-button" @click="applySettings">
          应用设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { X } from 'lucide-vue-next'
import type { CustomTheme } from '@/core/composables/useTheme'
import { loadThemeConfigs, getThemeConfigs, getAvailableThemes, getDefaultTheme } from '@/core/composables/useTheme'
import { useGlobalTheme } from '@/core/composables/useTheme'

/**
 * 组件属性接口
 */
interface Props {
  /** 是否显示模态框 */
  visible: boolean
}

/**
 * 组件事件接口
 */
interface Emits {
  /** 关闭模态框事件 */
  (e: 'close'): void
  /** 配置更新事件 */
  (e: 'update'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 全局主题管理
const { currentTheme, setGlobalTheme, getThemeDisplayName, availableThemes: globalAvailableThemes } = useGlobalTheme()

/**
 * 本地主题配置
 */
const localTheme = ref<CustomTheme>('white')

/**
 * 主题选项
 */
const themeOptions = computed(() => {
  const themes = globalAvailableThemes.value
  return themes.map(theme => ({
    value: theme,
    label: getThemeDisplayName(theme)
  }))
})

/**
 * 获取主题名称
 */
const getThemeName = (themeKey: CustomTheme): string => {
  const configs = getThemeConfigs()
  return configs?.[themeKey]?.name || themeKey
}

/**
 * 初始化本地配置
 */
const initializeLocalConfig = (): void => {
  // console.log('=== 初始化设置模态框配置 ===')
  
  // 使用当前全局主题作为初始值
  localTheme.value = currentTheme.value || getDefaultTheme()
  
  // console.log('当前主题:', localTheme.value)
  // console.log('本地配置初始化完成')
}

/**
 * 主题变化处理
 */
const onThemeChange = (): void => {
  // console.log('主题变化:', localTheme.value)
}

/**
 * 应用所有设置
 */
const applySettings = (): void => {
  // console.log('=== 应用设置 ===')
  // console.log('应用主题配置:', localTheme.value)
  
  // 更新全局主题状态
  setGlobalTheme(localTheme.value)
  
  // 触发更新事件
  emit('update')
  
  // 显示成功提示
  console.log('设置已应用')
  
  // 关闭模态框
  closeModal()
}

/**
 * 重置为默认配置
 */
const resetToDefaults = (): void => {
  console.log('=== 重置为默认配置 ===')
  
  const defaultTheme = getDefaultTheme()
  localTheme.value = defaultTheme
  
  console.log('已重置为默认配置:', defaultTheme)
}

/**
 * 关闭模态框
 */
const closeModal = (): void => {
  emit('close')
}

/**
 * 处理遮罩层点击
 */
const handleOverlayClick = (): void => {
  closeModal()
}

/**
 * 组件挂载时加载主题配置
 */
onMounted(async () => {
  await loadThemeConfigs()
  initializeLocalConfig()
})

/**
 * 监听visible变化，初始化配置
 */
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      initializeLocalConfig()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* 模态框遮罩层 */
.settings-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 模态框主体 */
.settings-modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 90%;
  max-width: 500px;
  max-height: 70vh;
  overflow: hidden;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 模态框头部 */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.settings-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #e5e7eb;
  color: #374151;
}

/* 设置内容 */
.settings-content {
  padding: 20px 24px;
  max-height: 40vh;
  overflow-y: auto;
}

/* 设置区域 */
.settings-section {
  margin-bottom: 20px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e7eb;
}

/* 设置组 */
.setting-group {
  margin-bottom: 16px;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.setting-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

/* 选择框 */
.setting-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #374151;
  background: white;
  transition: all 0.2s ease;
}

.setting-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.setting-select:hover {
  border-color: #9ca3af;
}

/* 配置预览 */
.config-preview {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.preview-item:last-child {
  border-bottom: none;
}

.preview-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.preview-value {
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 600;
}

/* 模态框底部 */
.settings-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.reset-button {
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.confirm-button {
  padding: 10px 20px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-button:hover {
  background: #2563eb;
}

/* 滚动条样式 */
.settings-content::-webkit-scrollbar {
  width: 6px;
}

.settings-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.settings-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.settings-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>



