<template>
  <DefaultContentPage title="部署指南" subtitle="快速部署与使用PPT Engineering">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 部署概览 -->
        <div class="flex items-center mb-6">
          <Icon name="Rocket" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">部署概览</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering提供了简单的部署流程，支持本地开发、构建部署和多种部署方式，满足不同场景需求。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            基于现代前端工具链，支持热重载、TypeScript类型检查和自动化构建，提供高效的开发体验。
          </p>
        </div>

        <!-- 环境要求 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Package" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">环境要求</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">系统要求</h3>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">Node.js 16.x 或更高版本</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">pnpm 8.x 或更高版本（推荐）</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent1" />
              <span class="font-body text-secondary ml-2">现代浏览器（Chrome、Firefox、Safari、Edge）</span>
            </li>
          </ul>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">安装依赖</h3>
          <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto">
            <pre># 克隆项目
git clone https://github.com/your-username/ppt-engineering.git
cd ppt-engineering

# 安装依赖
pnpm install

# 或使用npm
npm install</pre>
          </div>
        </div>

        <!-- 开发环境 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Code" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">开发环境</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">启动开发服务器</h3>
          <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto mb-4">
            <pre># 启动开发服务器
pnpm dev

# 或使用npm
npm run dev</pre>
          </div>
          <p class="font-body text-secondary">开发服务器将在 http://localhost:5173 启动，支持热重载。</p>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4 mt-6">开发工具</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">热重载：代码修改后自动刷新</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">TypeScript类型检查：实时类型错误提示</span>
            </li>
            <li class="flex items-center">
              <Icon name="CheckCircle" :size="20" color="text-accent2" />
              <span class="font-body text-secondary ml-2">代码格式化：支持Prettier和ESLint</span>
            </li>
          </ul>
        </div>

        <!-- 构建部署 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Build" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">构建部署</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">构建生产版本</h3>
          <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto mb-4">
            <pre># 构建生产版本
pnpm build

# 或使用npm
npm run build</pre>
          </div>
          <p class="font-body text-secondary mb-6">构建完成后，dist目录包含所有生产环境文件。</p>
          
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">预览构建结果</h3>
          <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto mb-4">
            <pre># 预览构建结果
pnpm preview

# 或使用npm
npm run preview</pre>
          </div>
          <p class="font-body text-secondary">预览服务器将在 http://localhost:4173 启动。</p>
        </div>

        <!-- 部署方式 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Cloud" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">部署方式</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">静态托管</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">Vercel</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">Netlify</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">GitHub Pages</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">CDN部署</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <h3 class="font-heading text-xl font-semibold text-primary mb-4">服务器部署</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Nginx</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Apache</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Express</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">Docker容器</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 配置调整 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Settings" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">配置调整</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <h3 class="font-heading text-xl font-semibold text-primary mb-4">基础URL配置</h3>
          <p class="font-body text-secondary mb-4">根据部署环境调整app.config.yaml中的baseUrl：</p>
          <div class="bg-code rounded-lg p-4 font-mono text-sm text-code overflow-x-auto">
            <pre># 本地开发
baseUrl: "/"

# GitHub Pages
baseUrl: "/repository-name/"

# 自定义域名
baseUrl: "https://your-domain.com/"</pre>
          </div>
        </div>

        <!-- 常见问题 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="HelpCircle" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">常见问题</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="AlertCircle" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">路由404问题</h3>
                <p class="font-body text-secondary">部署到静态托管时，需配置重定向规则将所有请求重定向到index.html</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="AlertCircle" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">资源加载失败</h3>
                <p class="font-body text-secondary">检查baseUrl配置是否正确，确保资源路径与部署路径匹配</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="AlertCircle" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">PDF导出失败</h3>
                <p class="font-body text-secondary">确保部署环境支持Canvas API，某些静态托管可能有限制</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </DefaultContentPage>
</template>

<script setup lang="ts">
import DefaultContentPage from '@/components/layout/pagecontainer/DefaultContentPage.vue'
import Icon from '@/components/layout/contentcommon/Icon.vue'

defineOptions({
  name: 'DeploymentGuide'
})
</script>