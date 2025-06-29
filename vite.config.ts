import { fileURLToPath, URL } from 'node:url'
import { defineConfig, PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { generateIconNames } from 'vite-plugin-svg-sprite-names-typescript';
import { visualizer } from "rollup-plugin-visualizer";
import { DESCRIPTION, THEME_COLOR, TITLE } from './src/data/constants'
import { buildSitemap } from './src/plugin/vite-vue-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: TITLE,
        short_name: TITLE,
        description: DESCRIPTION,
        theme_color: THEME_COLOR,
      },
      pwaAssets: {
        config: './pwa-assets.config.ts',
        disabled: false,
        image: './public/favicon.svg',
        includeHtmlHeadLinks: true,
        injectThemeColor: true
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    }),
    generateIconNames({
      svgFilePath: './public/sprite.svg',
      typesFilePath: './src/types/icon-names.ts',
      typeName: 'IconName'
    }),
    buildSitemap({ baseUrl: 'https://popmots.com', paths: ['/', '/study', '/settings'] }),
    visualizer() as PluginOption
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
