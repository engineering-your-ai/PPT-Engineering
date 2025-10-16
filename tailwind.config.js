/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      // 创建色阶生成函数 - 使用现代 rgb(from var(...)) 语法
      colors: (() => {
        const createColorScale = (cssVar) => {
          return {
            50: `rgb(from var(${cssVar}) calc(r + (255 - r) * 0.9) calc(g + (255 - g) * 0.9) calc(b + (255 - b) * 0.9) / <alpha-value>)`,
            100: `rgb(from var(${cssVar}) calc(r + (255 - r) * 0.8) calc(g + (255 - g) * 0.8) calc(b + (255 - b) * 0.8) / <alpha-value>)`,
            200: `rgb(from var(${cssVar}) calc(r + (255 - r) * 0.65) calc(g + (255 - g) * 0.65) calc(b + (255 - b) * 0.65) / <alpha-value>)`,
            300: `rgb(from var(${cssVar}) calc(r + (255 - r) * 0.5) calc(g + (255 - g) * 0.5) calc(b + (255 - b) * 0.5) / <alpha-value>)`,
            400: `rgb(from var(${cssVar}) calc(r + (255 - r) * 0.3) calc(g + (255 - g) * 0.3) calc(b + (255 - b) * 0.3) / <alpha-value>)`,
            500: `rgb(from var(${cssVar}) r g b / <alpha-value>)`, // 默认色阶，使用原始颜色
            600: `rgb(from var(${cssVar}) calc(r * 0.85) calc(g * 0.85) calc(b * 0.85) / <alpha-value>)`,
            700: `rgb(from var(${cssVar}) calc(r * 0.7) calc(g * 0.7) calc(b * 0.7) / <alpha-value>)`,
            800: `rgb(from var(${cssVar}) calc(r * 0.55) calc(g * 0.55) calc(b * 0.55) / <alpha-value>)`,
            900: `rgb(from var(${cssVar}) calc(r * 0.4) calc(g * 0.4) calc(b * 0.4) / <alpha-value>)`,
            DEFAULT: `rgb(from var(${cssVar}) r g b / <alpha-value>)` // 默认值，兼容不带数字的用法
          }
        }
        
        return {
          // 主题文本色系统 - 支持完整色阶
          primary: createColorScale('--tw-color-text-primary'),
          secondary: createColorScale('--tw-color-text-secondary'),
          invert: createColorScale('--tw-color-text-invert'),
          default: createColorScale('--tw-color-bg-default'),
          // 主题背景色系统 - 支持完整色阶
          background: {
            ...createColorScale('--tw-color-bg-default'),
            invert: createColorScale('--tw-color-bg-invert')
          },
          
          // 主题边框色系统 - 支持完整色阶
          border: {
            ...createColorScale('--tw-color-border-default'),
            subtle: createColorScale('--tw-color-border-subtle')
          },
          
          // 主题链接色系统 - 支持完整色阶
          link: {
            ...createColorScale('--tw-color-link-default'),
            hover: createColorScale('--tw-color-link-hover'),
            visited: createColorScale('--tw-color-link-visited')
          },
          
          // 强调色系统 - 六个预设强调色，支持完整色阶
          accent1: createColorScale('--tw-color-accent1'),
          accent2: createColorScale('--tw-color-accent2'),
          accent3: createColorScale('--tw-color-accent3'),
          accent4: createColorScale('--tw-color-accent4'),
          accent5: createColorScale('--tw-color-accent5'),
          accent6: createColorScale('--tw-color-accent6'),
        }
      })(),
      
      // 字体家族映射
      fontFamily: {
        'heading': ['var(--tw-font-heading)', 'sans-serif'],
        'body': ['var(--tw-font-body)', 'sans-serif'],
        'code': ['var(--tw-font-code)', 'monospace']
      },
      
      // 动态字体大小系统 - 基于 --tw-font-size-base 变量
      fontSize: {
        // 超小字体 (0.75倍基础大小)
        'xs': `calc(var(--tw-font-size-base) * 0.75)`,
        // 小字体 (0.875倍基础大小)
        'sm': `calc(var(--tw-font-size-base) * 0.875)`,
        // 基础字体 (1倍基础大小)
        'base': `var(--tw-font-size-base)`,
        // 大字体 (1.125倍基础大小)
        'lg': `calc(var(--tw-font-size-base) * 1.125)`,
        // 超大字体 (1.25倍基础大小)
        'xl': `calc(var(--tw-font-size-base) * 1.25)`,
        // 2倍大字体 (1.5倍基础大小)
        '2xl': `calc(var(--tw-font-size-base) * 1.5)`,
        // 3倍大字体 (1.875倍基础大小)
        '3xl': `calc(var(--tw-font-size-base) * 1.875)`,
        // 4倍大字体 (2.25倍基础大小)
        '4xl': `calc(var(--tw-font-size-base) * 2.25)`,
        // 5倍大字体 (3倍基础大小)
        '5xl': `calc(var(--tw-font-size-base) * 3)`,
        // 6倍大字体 (3.75倍基础大小)
        '6xl': `calc(var(--tw-font-size-base) * 3.75)`,
        // 7倍大字体 (4.5倍基础大小)
        '7xl': `calc(var(--tw-font-size-base) * 4.5)`,
        // 8倍大字体 (6倍基础大小)
        '8xl': `calc(var(--tw-font-size-base) * 6)`,
        // 9倍大字体 (8倍基础大小)
        '9xl': `calc(var(--tw-font-size-base) * 8)`,
      },
      
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
