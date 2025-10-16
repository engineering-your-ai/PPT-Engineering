<template>
  <div class="responsive-sidebar-container">
    <aside 
      class="responsive-sidebar"
      :class="{
        'responsive-sidebar--collapsed': isCollapsed
      }"
    >
      <div class="sidebar-header">
        <div class="logo-section">
          <transition name="logo-fade" mode="out-in">
            <div v-if="!isCollapsed" key="title" class="app-title-wrapper">
              <Icon 
                v-if="appConfig.icon" 
                :name="appConfig.icon" 
                class="app-title-icon" 
                :size="24" 
              />
              <h1 class="app-title">
                {{ appConfig.title }}
              </h1>
            </div>
            <div v-else key="icon" class="sidebar-app-icon" :title="appConfig.title">
              <Icon 
                v-if="appConfig.icon" 
                :name="appConfig.icon" 
                :size="20" 
              />
              <span v-else>
                {{ appConfig.title.charAt(0).toUpperCase() }}
              </span>
            </div>
          </transition>
        </div>
        
        <button 
          class="collapse-toggle"
          @click="toggleCollapse"
          :title="isCollapsed ? '展开侧边栏' : '收起侧边栏'"
        >
          <ChevronLeft 
            :size="20" 
            :class="{ 'rotate-180': isCollapsed }"
          />
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-scroll-container">
          <ul class="nav-menu">
            <li 
              v-for="item in navigationItems" 
              :key="item.path"
              class="nav-item"
            >
              <div v-if="item.children && item.children.length > 0" class="nav-group">
                <div 
                  class="nav-parent"
                  @mouseenter="isCollapsed ? showHoverMenu(item.path, $event) : null"
                  @mouseleave="isCollapsed ? hideHoverMenu() : null"
                >
                  <div
                    class="nav-link nav-link--parent"
                    :class="{ 
                      'nav-link--active': isActiveRoute(item.path),
                      'nav-link--has-active': hasActiveChildRoute(item)
                    }"
                    @click="handleNavClick(item)"
                  >
                    <div class="nav-icon-wrapper">
                      <Icon 
                        v-if="item.icon" 
                        :name="item.icon" 
                        class="nav-icon" 
                        :size="20" 
                      />
                    </div>
                    <span v-if="!isCollapsed" class="nav-text">
                      {{ item.title }}
                    </span>
                    <ChevronDown 
                      v-if="!isCollapsed && item.children.length > 0"
                      class="nav-expand-icon"
                      :class="{ 'rotate-180': isMenuExpanded(item.path) }"
                      :size="16"
                    />
                  </div>
                  
                  <Teleport to="body">
                    <div 
                      v-if="isCollapsed && hoverMenuVisible === item.path"
                      class="hover-menu-overlay"
                      :style="{
                        position: 'fixed',
                        top: hoverMenuPosition.top + 'px',
                        left: hoverMenuPosition.left + 'px',
                        zIndex: 9999
                      }"
                      @mouseenter="keepHoverMenu"
                      @mouseleave="hideHoverMenu"
                    >
                      <div class="hover-menu-content">
                        <div class="hover-menu-title">{{ item.title }}</div>
                        <ul class="hover-submenu">
                          <li v-for="child in item.children" :key="child.path">
                            <router-link 
                              :to="child.path"
                              class="hover-submenu-link"
                              :class="{ 'hover-submenu-link--active': isActiveRoute(child.path) }"
                            >
                              {{ child.title }}
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                   </Teleport>
                </div>
                
                <transition name="submenu-slide">
                  <ul
                    v-if="isMenuExpanded(item.path) && !isCollapsed"
                    class="nav-submenu"
                  >
                    <li
                      v-for="child in item.children"
                      :key="child.path"
                      class="nav-subitem"
                    >
                      <router-link 
                        :to="child.path"
                        class="nav-link nav-link--child"
                        :class="{ 'nav-link--active': isActiveRoute(child.path) }"
                      >
                        <span class="nav-text">{{ child.title }}</span>
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </div>
              
              <div 
                v-else 
                class="nav-single"
                @mouseenter="isCollapsed ? showSimpleTooltip(item.title, $event) : null"
                @mouseleave="isCollapsed ? hideSimpleTooltip() : null"
              >
                <router-link 
                  :to="item.path"
                  class="nav-link"
                  :class="{ 'nav-link--active': isActiveRoute(item.path) }"
                >
                  <div class="nav-icon-wrapper">
                    <Icon 
                      v-if="item.icon" 
                      :name="item.icon" 
                      class="nav-icon" 
                      :size="20" 
                    />
                  </div>
                  <span v-if="!isCollapsed" class="nav-text">
                    {{ item.title }}
                  </span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      
      <div class="sidebar-footer">
        <button 
          class="settings-button"
          @click="openSettings"
          @mouseenter="isCollapsed ? showSimpleTooltip('主题设置', $event) : null"
          @mouseleave="isCollapsed ? hideSimpleTooltip() : null"
          :title="isCollapsed ? '' : '主题设置'"
        >
          <div class="nav-icon-wrapper">
            <Settings class="nav-icon" :size="20" />
          </div>
          <span v-if="!isCollapsed" class="nav-text">
            主题设置
          </span>
        </button>
      </div>
    </aside>
    
    <Teleport to="body">
      <div 
        v-if="simpleTooltipVisible && simpleTooltipText"
        class="simple-tooltip-overlay"
        :style="{
          position: 'fixed',
          top: simpleTooltipPosition.top + 'px',
          left: simpleTooltipPosition.left + 'px',
          zIndex: 9999
        }"
      >
        <div class="simple-tooltip-content">
          {{ simpleTooltipText }}
        </div>
      </div>
    </Teleport>
    
    <SettingsModal 
      :visible="settingsModalVisible"
      @close="closeSettings"
      @update="handleSettingsUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, Settings } from 'lucide-vue-next'
import type { MenuItem } from '@/core/types/menu'
import { isRouteActive, hasActiveChild } from '@/core/utils/route-generator'

import Icon from '@/components/layout/contentcommon/Icon.vue'
import SettingsModal from '@/layouts/SettingsModal.vue'

/**
 * 组件属性定义
 */
interface Props {
  navigationItems: MenuItem[]
  appConfig: {
    icon?: string
    title: string
    version?: string
    description?: string
  }
}

const props = defineProps<Props>()

// 调试日志
// console.log('ResponsiveSidebar - navigationItems:', props.navigationItems)
// console.log('ResponsiveSidebar - navigationItems length:', props.navigationItems?.length)



/**
 * 组件事件定义
 */
const emit = defineEmits<{
  (e: 'collapseChange', collapsed: boolean): void
}>()

/**
 * 响应式状态
 */
const isCollapsed = ref(false)
const expandedMenus = ref<Set<string>>(new Set())
const hoverMenuVisible = ref<string | null>(null)
const hoverMenuPosition = ref({ top: 0, left: 0 })
const hoverMenuTimer = ref<number | null>(null)
const simpleTooltipVisible = ref(false)
const simpleTooltipText = ref('')
const simpleTooltipPosition = ref({ top: 0, left: 0 })
const simpleTooltipTimer = ref<number | null>(null)
const settingsModalVisible = ref(false)

/**
 * 当前路由和路由器
 */
const route = useRoute()
const router = useRouter()



/**
 * 切换折叠状态
 */
const toggleCollapse = (): void => {
  isCollapsed.value = !isCollapsed.value
  emit('collapseChange', isCollapsed.value)
}



/**
 * 切换菜单展开状态
 */
const toggleMenuExpansion = (menuPath: string): void => {
  if (expandedMenus.value.has(menuPath)) {
    expandedMenus.value.delete(menuPath)
  } else {
    expandedMenus.value.add(menuPath)
  }
}

/**
 * 判断菜单是否展开
 */
const isMenuExpanded = (menuPath: string): boolean => {
  return expandedMenus.value.has(menuPath)
}



/**
 * 判断路由是否激活
 */
const isActiveRoute = (path: string): boolean => {
  return isRouteActive(path, route.path)
}

/**
 * 判断是否有激活的子路由
 */
const hasActiveChildRoute = (item: MenuItem): boolean => {
  return hasActiveChild(item, route.path)
}

/**
 * 处理导航点击
 */
const handleNavClick = (item: MenuItem): void => {
  // 如果有子菜单
  if (item.children && item.children.length > 0) {
    // 检查当前是否已经在一级菜单页面或其子页面
    const isCurrentlyActive = isActiveRoute(item.path) || hasActiveChildRoute(item)
    const isExpanded = isMenuExpanded(item.path)
    
    // 如果菜单处于展开状态且处于非激活状态，点击时不切换折叠状态，直接导航
    if (isExpanded && !isCurrentlyActive) {
      router.push(item.path)
      return
    }
    
    // 如果当前不在该菜单页面，先导航到一级菜单页面
    if (!isCurrentlyActive) {
      router.push(item.path)
    }
    
    // 在非折叠状态切换展开状态
    if (!isCollapsed.value) {
      toggleMenuExpansion(item.path)
    }
    
    // 如果已经在该菜单页面且菜单已展开，再次点击时导航到一级菜单页面
    if (isCurrentlyActive && isExpanded) {
      router.push(item.path)
    }
  } else {
    // 没有子菜单的项目进行路由跳转
    router.push(item.path)
  }
}

/**
  * 显示悬浮菜单
  */
const showHoverMenu = (itemPath: string, event: MouseEvent): void => {
   if (hoverMenuTimer.value) {
     clearTimeout(hoverMenuTimer.value)
     hoverMenuTimer.value = null
   }
   
   const target = event.currentTarget as HTMLElement
   const rect = target.getBoundingClientRect()
   
   // 找到对应的菜单项
   const item = props.navigationItems.find(nav => nav.path === itemPath)
   
   // 计算悬浮菜单位置
   const menuLeft = rect.right + 8
   const menuTop = rect.top
   
   // 检查是否超出视窗右边界
   const menuWidth = 200 // 预估菜单宽度
   const viewportWidth = window.innerWidth
   
   let finalLeft = menuLeft
   if (menuLeft + menuWidth > viewportWidth) {
     finalLeft = rect.left - menuWidth - 8
   }
   
   // 检查是否超出视窗下边界
   const menuHeight = item?.children ? item.children.length * 40 + 60 : 100 // 预估菜单高度
   const viewportHeight = window.innerHeight
   
   let finalTop = menuTop
   if (menuTop + menuHeight > viewportHeight) {
     finalTop = viewportHeight - menuHeight - 20
   }
   
   hoverMenuPosition.value = {
     top: Math.max(20, finalTop),
     left: Math.max(20, finalLeft)
   }
   
   hoverMenuVisible.value = itemPath
 }

/**
 * 隐藏悬浮菜单
 */
const hideHoverMenu = (): void => {
  hoverMenuTimer.value = window.setTimeout(() => {
    hoverMenuVisible.value = null
  }, 100)
}

/**
    * 保持悬浮菜单显示
    */
  const keepHoverMenu = (): void => {
    if (hoverMenuTimer.value) {
      clearTimeout(hoverMenuTimer.value)
      hoverMenuTimer.value = null
    }
  }
  
  /**
    * 显示简单tooltip
    */
  const showSimpleTooltip = (text: string, event: MouseEvent): void => {
    if (simpleTooltipTimer.value) {
      clearTimeout(simpleTooltipTimer.value)
      simpleTooltipTimer.value = null
    }
    
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    
    // 计算tooltip位置
    const tooltipLeft = rect.right + 12
    const tooltipTop = rect.top + rect.height / 2
    
    // 检查是否超出视窗右边界
    const tooltipWidth = text.length * 8 + 24 // 预估tooltip宽度
    const viewportWidth = window.innerWidth
    
    let finalLeft = tooltipLeft
    if (tooltipLeft + tooltipWidth > viewportWidth) {
      finalLeft = rect.left - tooltipWidth - 12
    }
    
    // 检查是否超出视窗边界
    const viewportHeight = window.innerHeight
    let finalTop = tooltipTop
    
    if (tooltipTop < 20) {
      finalTop = 20
    } else if (tooltipTop > viewportHeight - 40) {
      finalTop = viewportHeight - 40
    }
    
    simpleTooltipPosition.value = {
      top: finalTop,
      left: Math.max(12, finalLeft)
    }
    
    simpleTooltipText.value = text
    simpleTooltipVisible.value = true
  }
  
  /**
    * 隐藏简单tooltip
    */
  const hideSimpleTooltip = (): void => {
    simpleTooltipTimer.value = window.setTimeout(() => {
      simpleTooltipVisible.value = false
      simpleTooltipText.value = ''
    }, 100)
  }

/**
 * 自动展开包含当前路由的菜单
 */
const autoExpandCurrentRoute = (): void => {
  props.navigationItems.forEach(item => {
    if (hasActiveChild(item, route.path)) {
      expandedMenus.value.add(item.path)
    }
  })
}

/**
 * 监听路由变化
 */
watch(
  () => route.path,
  () => {
    autoExpandCurrentRoute()
  }
)



/**
 * 打开设置模态框
 */
const openSettings = (): void => {
  settingsModalVisible.value = true
}

/**
 * 关闭设置模态框
 */
const closeSettings = (): void => {
  settingsModalVisible.value = false
}

/**
 * 处理设置更新
 */
const handleSettingsUpdate = (): void => {
  // console.log('设置已更新，主题可能已变更')
  // 主题更新会通过全局状态自动响应，无需额外处理
}

/**
 * 组件挂载
 */
onMounted(() => {
  autoExpandCurrentRoute()
})

/**
 * 组件卸载
 */
onUnmounted(() => {
  // 清理定时器
  if (hoverMenuTimer.value) {
    clearTimeout(hoverMenuTimer.value)
  }
  if (simpleTooltipTimer.value) {
    clearTimeout(simpleTooltipTimer.value)
  }
})
</script>

<style scoped>
/* 响应式侧边栏容器 */
.responsive-sidebar-container {
  position: relative;
  z-index: 100;
}



/* 侧边栏主体 */
.responsive-sidebar {
  position: relative;
  height: 100vh;
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 折叠状态 */
.responsive-sidebar--collapsed {
  width: 64px;
}

/* 侧边栏头部 */
.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  background-color: #f9fafb;
}

.logo-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.app-title-icon {
  color: #3b82f6;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  text-align: center;
}

.sidebar-app-icon {
  width: 40px;
  height: 40px;
  background-color: #f8fafc;
  color: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.sidebar-app-icon:hover {
  transform: scale(1.05);
  background-color: #f1f5f9;
  color: #2563eb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

/* Logo 过渡动画 */
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: all 0.3s ease;
}

.logo-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.logo-fade-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

/* 折叠按钮 */
.collapse-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-toggle:hover {
  /* background-color: #f3f4f6; */
  color: #374151;
  transform: scale(1.1);
}

.collapse-toggle svg {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}



/* 导航区域 */
.sidebar-nav {
  flex: 1;
  overflow: hidden;
}

.nav-scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

/* 自定义滚动条 */
.nav-scroll-container::-webkit-scrollbar {
  width: 4px;
}

.nav-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.nav-scroll-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.nav-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 折叠状态下隐藏滚动条 */
.responsive-sidebar--collapsed .nav-scroll-container {
  scrollbar-width: none;
}

.responsive-sidebar--collapsed .nav-scroll-container::-webkit-scrollbar {
  display: none;
}

/* 导航菜单 */
.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 4px;
}

/* 导航组 */
.nav-group {
  position: relative;
}

.nav-parent {
  position: relative;
}

/* 导航链接 */
.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  margin: 0 8px;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #374151;
  transform: translateX(4px);
}

.nav-link--active {
  background-color: #3b82f6;
  color: white !important;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.9);
}

.nav-link--active:hover {
  background-color: #2563eb;
  color: white !important;
  transform: translateX(4px);
}

.nav-link--has-active {
  background-color: rgba(59, 130, 246, 0.9);
  color: #1d4ed8;
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-weight: 600;
}

.nav-link--has-active:hover {
  background-color: rgba(59, 130, 246, 0.9);
  color: #1e40af;
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateX(4px);
}

/* 折叠状态下的导航链接 */
.responsive-sidebar--collapsed .nav-link {
  justify-content: center;
  padding: 12px;
  margin: 0 8px;
}

.responsive-sidebar--collapsed .nav-link:hover {
  transform: scale(1.1);
}

/* 图标包装器 */
.nav-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.responsive-sidebar--collapsed .nav-icon-wrapper {
  margin-right: 0;
}

.nav-icon {
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.nav-icon--small {
  opacity: 0.8;
}

/* 导航文本 */
.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 展开图标 */
.nav-expand-icon {
  margin-left: auto;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

/* 子菜单 */
.nav-submenu {
  list-style: none;
  margin: 8px 0 0 0;
  padding: 4px 0;
  background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
}

.nav-subitem {
  margin: 0;
}

.nav-link--child {
  padding: 8px 16px 8px 32px;
  margin: 2px 8px;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.nav-link--child:hover {
  background-color: #e5e7eb;
  transform: translateX(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link--child.nav-link--active {
  background-color: #3b82f6;
  color: white !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.nav-link--child.nav-link--active:hover {
  background-color: #2563eb;
  color: white !important;
  transform: translateX(4px);
}

/* 子菜单动画 */
.submenu-slide-enter-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.submenu-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.submenu-slide-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.submenu-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.submenu-slide-enter-to,
.submenu-slide-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

/* 悬浮菜单覆盖层 */
.hover-menu-overlay {
  pointer-events: auto;
  animation: hoverMenuFadeIn 0.2s ease-out;
}

.hover-menu-content {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 200px;
  max-width: 280px;
  white-space: nowrap;
}

@keyframes hoverMenuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hover-menu-title {
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.hover-submenu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hover-submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.hover-submenu-link:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.hover-submenu-link--active {
  background-color: #3b82f6;
  color: white !important;
}

.hover-submenu-link--active:hover {
  background-color: #2563eb;
  color: white !important;
}

.hover-submenu-icon {
  margin-right: 8px;
  flex-shrink: 0;
}

/* 简单提示样式 */
.simple-tooltip-overlay {
  pointer-events: none;
  animation: tooltipFadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.simple-tooltip-content {
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(-50%);
  position: relative;
}

.simple-tooltip-content::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent #1f2937 transparent transparent;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


/* 侧边栏底部 */
.sidebar-footer {
  margin-top: auto;
  /* padding: 1rem 0.5rem; */
  border-top: 1px solid #e5e7eb;
}

/* 设置按钮 */
.settings-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  margin: 0;
  background: transparent;
  border: none;
  color: #6b7280;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: 500;
}

.settings-button:hover {
  background-color: #f3f4f6;
  color: #374151;
  /* transform: translateX(4px); */
}

/* .settings-button:active {
  transform: translateX(2px);
} */

/* 折叠状态下的设置按钮 */
.responsive-sidebar--collapsed .settings-button {
  justify-content: center;
  padding: 12px;
}

.responsive-sidebar--collapsed .settings-button .nav-text {
  display: none;
}
</style>