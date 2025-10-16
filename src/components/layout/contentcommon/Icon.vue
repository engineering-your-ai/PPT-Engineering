<template>
  <AppIcon v-bind="$props" />
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';

/**
 * @description Icon组件，是对AppIcon的封装，提供更简洁的API和默认行为。
 * @see AppIcon
 */

interface Props {
  /**
   * @description 图标名称，必须是icons.config.yaml中定义的名称
   */
  name: string;
  /**
   * @description 图标大小，可以是数字（像素）或字符串（如'2rem'）
   * @default 24
   */
  size?: string | number;
  /**
   * @description 图标颜色
   */
  color?: string;
  /**
   * @description 自定义CSS类
   */
  class?: string;
}

defineProps<Props>();
</script>