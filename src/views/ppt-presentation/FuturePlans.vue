<template>
  <DefaultContentPage title="未来规划" subtitle="PPT Engineering的发展路线图">
    <template #content>
      <div class="space-y-8 p-6">
        <!-- 发展愿景 -->
        <div class="flex items-center mb-6">
          <Icon name="Target" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">发展愿景</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <p class="font-body text-lg text-secondary leading-relaxed mb-4">
            PPT Engineering致力于成为AI时代最强大的PPT构建框架，通过持续创新和社区贡献，为用户提供更智能、更灵活的演示解决方案。
          </p>
          <p class="font-body text-lg text-secondary leading-relaxed">
            我们相信，未来的PPT创建将不再依赖传统模板，而是通过AI理解和配置驱动，实现真正个性化的演示内容生成。
          </p>
        </div>

        <!-- 短期计划 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Calendar" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">短期计划 (3-6个月)</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Zap" :size="24" color="text-accent1" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">功能增强</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">动画效果支持</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">更多图表类型</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">多媒体内容支持</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent1" />
                <span class="font-body text-sm text-secondary ml-2">交互式组件</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
            <div class="flex items-center mb-4">
              <Icon name="Code" :size="24" color="text-accent2" />
              <h3 class="font-heading text-xl font-semibold text-primary ml-3">开发体验</h3>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">可视化编辑器</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">组件市场</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">实时预览</span>
              </li>
              <li class="flex items-center">
                <Icon name="CheckCircle" :size="16" color="text-accent2" />
                <span class="font-body text-sm text-secondary ml-2">调试工具</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 中期计划 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Calendar" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">中期计划 (6-12个月)</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <div class="flex items-center mb-4">
                <Icon name="Brain" :size="24" color="text-accent3" />
                <h3 class="font-heading text-xl font-semibold text-primary ml-3">AI集成</h3>
              </div>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent3" />
                  <span class="font-body text-sm text-secondary ml-2">智能内容生成</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent3" />
                  <span class="font-body text-sm text-secondary ml-2">自动布局优化</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent3" />
                  <span class="font-body text-sm text-secondary ml-2">智能配色建议</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div class="flex items-center mb-4">
                <Icon name="Users" :size="24" color="text-accent4" />
                <h3 class="font-heading text-xl font-semibold text-primary ml-3">协作功能</h3>
              </div>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent4" />
                  <span class="font-body text-sm text-secondary ml-2">多人协作编辑</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent4" />
                  <span class="font-body text-sm text-secondary ml-2">版本控制</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent4" />
                  <span class="font-body text-sm text-secondary ml-2">评论与反馈</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 长期愿景 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Rocket" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">长期愿景 (1-2年)</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="Globe" :size="24" color="text-accent1" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">生态系统</h3>
                <p class="font-body text-secondary">构建完整的PPT生态系统，包括模板库、插件市场和开发者社区</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Cloud" :size="24" color="text-accent2" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">云服务集成</h3>
                <p class="font-body text-secondary">提供云端存储、同步和协作服务，支持多平台无缝体验</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Mobile" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">移动端支持</h3>
                <p class="font-body text-secondary">开发移动端应用，实现跨平台的PPT创建和演示</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Api" :size="24" color="text-accent4" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">开放API</h3>
                <p class="font-body text-secondary">提供开放API，支持第三方集成和定制化开发</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 技术演进 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="TrendingUp" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">技术演进</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="font-heading text-xl font-semibold text-primary mb-4">前端技术</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">Vue 3.x 升级</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">TypeScript 5.x</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">Vite 6.x</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent1" />
                  <span class="font-body text-sm text-secondary ml-2">Web Components</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-heading text-xl font-semibold text-primary mb-4">架构优化</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent2" />
                  <span class="font-body text-sm text-secondary ml-2">微前端架构</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent2" />
                  <span class="font-body text-sm text-secondary ml-2">性能优化</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent2" />
                  <span class="font-body text-sm text-secondary ml-2">PWA支持</span>
                </li>
                <li class="flex items-center">
                  <Icon name="CheckCircle" :size="16" color="text-accent2" />
                  <span class="font-body text-sm text-secondary ml-2">离线功能</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 社区建设 -->
        <div class="flex items-center mb-6 mt-8">
          <Icon name="Users" :size="32" color="text-primary" />
          <h2 class="font-heading text-3xl font-bold text-primary ml-4">社区建设</h2>
        </div>
        
        <div class="bg-default border border-border-default rounded-lg p-6 shadow-theme-sm">
          <ul class="space-y-4">
            <li class="flex items-start">
              <Icon name="Book" :size="24" color="text-accent3" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">文档完善</h3>
                <p class="font-body text-secondary">建立完善的文档体系，包括教程、API参考和最佳实践</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="GraduationCap" :size="24" color="text-accent4" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">学习资源</h3>
                <p class="font-body text-secondary">提供视频教程、在线课程和工作坊，降低学习门槛</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="Award" :size="24" color="text-accent5" />
              <div class="ml-4">
                <h3 class="font-heading text-lg font-semibold text-primary">贡献激励</h3>
                <p class="font-body text-secondary">建立贡献者激励机制，鼓励社区参与和代码贡献</p>
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
  name: 'FuturePlans'
})
</script>