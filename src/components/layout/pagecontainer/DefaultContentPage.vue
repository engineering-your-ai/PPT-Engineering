<template>
  <DefaultContainer>
    <!-- 标题区域 -->
    <HeaderSection
      :title="title"
      :subtitle="subtitle"
      :title-size="40"
      :subtitle-size="20"
      :padding="20"
      :show-bottom-border="true"
      :logo-config="'theme'"
      :align="'left'"
      :height="100"
    />
    
    <!-- 内容区域 -->
    <div class="flex-1  text-primary " :style="contentStyle">
      <slot name="content">
        <div class="w-full h-full flex items-center justify-center">
          <p class="font-body text-lg text-secondary">这里是默认内容区域，可以通过slot自定义内容</p>
        </div>
      </slot>
    </div>
    
    <!-- 页脚区域 -->
    <FooterSection
      :text-size="'medium'"
      :align="'left'"
      :padding="20"
      :show-top-border="true"
      :show-pagination="true"
      :height="50"
      link="https://github.com/engineering-your-ai/PPT-Engineering"
      link-text=" PPT Engineering"
      icon="Github"
    />
  </DefaultContainer>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import DefaultContainer from '@/components/layout/pagecontainer/DefaultContainer.vue'
import HeaderSection from '@/components/common/HeaderSection.vue'
import FooterSection from '@/components/common/FooterSection.vue'

/**
 * 默认内容页面组件
 * 整合HeaderSection、FooterSection和FixedSizeContainer
 * 提供标准的页面布局结构
 */
defineOptions({
  name: 'DefaultContentPage'
})

/**
 * 组件属性定义
 */
interface Props {
  /** 页面标题文字 */
  title: string
  /** 页面副标题文字,可选,默认为空 */
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  subtitle: '',
})

/**
 * 计算内容区域样式
 * 固定容器高度1080px - 标题区域100px - 页脚区域50px = 930px
 * 添加自动滚动功能，当内容超出高度时显示滚动条
 */
const contentStyle = computed((): CSSProperties => ({
  height: '930px',
  maxHeight: '930px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  overflow: 'auto'
}))
</script>

<style scoped>
/* 组件特定样式 */
</style>