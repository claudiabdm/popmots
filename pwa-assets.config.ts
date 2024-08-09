import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      sizes: [{ width: 512, height: 512 }],
      padding: 0
    },
    apple: {
      sizes: [{ width: 512, height: 512 }],
      padding: 0,
    }
  },
  images: 'public/favicon.svg',
})
