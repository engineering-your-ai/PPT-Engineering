import { createApp } from 'vue'
import App from './App.vue'
import { initializeConfig } from './core/utils/config'
import { initializeGlobalTheme } from './core/composables/useTheme'
import { initializeStaticIcons } from './core/utils/static-icons'

// 导入全局样式
import './styles/global.css'

/**
 * 异步初始化应用
 */
async function initializeApp() {
  // console.log('=== 应用初始化开始 ===')
  
  try {
    // 先初始化配置系统
    // console.log('初始化配置系统...')
    await initializeConfig()
    // console.log('配置系统初始化完成')
    
    // 初始化全局主题状态
    // console.log('初始化全局主题状态...')
    await initializeGlobalTheme()
    // console.log('全局主题状态初始化完成')
    
    // 初始化静态图标系统
    // console.log('初始化静态图标系统...')
    initializeStaticIcons()
    // console.log('静态图标系统初始化完成')
    
    // 动态导入并创建路由器（确保配置已加载）
    // console.log('创建路由器...')
    const { default: routerPromise } = await import('./core/router')
    const router = await routerPromise
    // console.log('路由器创建完成') 
    
    // 创建Vue应用实例
    // console.log('创建Vue应用实例...')
    const app = createApp(App)
    
    // 使用路由
    app.use(router)
    
    // 挂载应用
    app.mount('#app')
    // console.log('应用挂载完成')
    // console.log('=== 应用初始化完成 ===')
    
  } catch (error) {
    console.error('应用初始化失败', error)
    // 显示错误信息给用户
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center; color: #dc2626;">
          <h1>应用初始化失败</h1>
          <p>请刷新页面重试，或联系技术支持</p>
          <details style="margin-top: 20px; text-align: left;">
            <summary>错误详情</summary>
            <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow: auto;">${error}</pre>
          </details>
        </div>
      </div>
    `
  }
}

// 启动应用
initializeApp()




