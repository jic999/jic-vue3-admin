import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss'
import { presetScalpel } from 'unocss-preset-scalpel'

export default defineConfig({
  rules: [
    [
      /wh-([\d]+)/,
      ([, size]) => ({
        width: size + 'px',
        height: size + 'px',
      }),
    ],
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
  },
  theme: {
    colors: {
      primary: 'var(--primary-c)',
      secondary: 'var(--secondary-c)',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    transformerDirectives(),
    presetScalpel(),
  ],
})
