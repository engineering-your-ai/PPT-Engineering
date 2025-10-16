import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { generateRoutes } from '@/core/utils/route-generator'
import { getRouteConfigsAsync, getDefaultRouteConfigAsync } from '@/core/utils/config'

/**
 * 异步创建路由器
 * 等待配置加载完成后再生成路由
 */
async function createAppRouter() {
  // console.log('开始创建路由器...')
  
  // 等待配置加载完成
  const routeConfigs = await getRouteConfigsAsync()
  const defaultRouteConfig = await getDefaultRouteConfigAsync()
  
  // console.log('路由配置加载完成:', routeConfigs)
  // console.log('默认路由配置:', defaultRouteConfig)
  
  // 从配置生成路由
  const generatedRoutes = generateRoutes(routeConfigs)
  // console.log('生成的路由:', generatedRoutes)

  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('@/layouts/ResponsiveLayout.vue'),
      children: [
        ...defaultRouteConfig,
        ...generatedRoutes
      ]
    }
  ]

  // console.log('最终路由配置:', routes)

  /**
   * 创建路由实例
   */
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  })

  /**
   * 路由守卫 - 设置页面标题
   */
  router.beforeEach((to, from, next) => {
    const title = to.meta?.title
    if (title) {
      document.title = `${title}`
    }
    next()
  })

  // console.log('路由器创建完成')
  return router
}

// 导出异步创建的路由器
export default createAppRouter()
