// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path';
import { cpSync, readdirSync, rmSync, unlinkSync } from 'fs';
import { createHash } from 'node:crypto';
import postCssPxToRem from 'postcss-pxtorem';

export default defineNuxtConfig({
  modules: ['nuxt-vite-legacy', '@pinia/nuxt', 'nuxt-swiper', 'nuxt-viewport'],
  devtools: { enabled: true },
  css: ['~/assets/styles/main.less'],

  $production: {
    app: {
      baseURL: process.env.PRODUCTION_PATH,
      buildAssetsDir: '/assets',
    },
    features: {
      inlineStyles: false,
    },
    hooks: {
      'nitro:build:public-assets': (nitro) => {
        cpSync('./assets', path.join(nitro.options.output.serverDir, 'assets'), { recursive: true });

        const outputPath = nitro.options.output.publicDir;
        ['200.html', '404.html'].forEach((file) => {
          const filePath = path.join(outputPath, file);
          try {
            unlinkSync(filePath);
            console.log(`Removed ${file}`);
          } catch (error) {
            console.error(`\x1b[31m\u2717 Failed to remove \x1b[0m ${file}:`, error);
          }
        });

        const uppercaseFilenames: string[] = [];
        const output = `${nitro.options.output.dir}/public`;
        const scan = (dirPath: string) =>
          readdirSync(dirPath, { withFileTypes: true })
            .map(item => {
              const filePath = path.join(dirPath, item.name);

              if (item.isDirectory()) {
                scan(filePath);
              } else {
                if (/[A-Z]/.test(item.name)) {
                  uppercaseFilenames.push(item.name);
                }
              }
            });

        scan(output);

        if (uppercaseFilenames.length > 0) {
          console.error(`\x1b[31m\u2717 В названии файла есть символы в верхнем регистре:\n${uppercaseFilenames.join('\n')}\x1b[0m`);
          rmSync('./dist', { recursive: true, force: true });
          process.exit(1);
        }
      },
    },
  },

  $development: {
    app: {
      baseURL: process.env.PRODUCTION_PATH ?? '/',
    },
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: true,
    },
  },

  vite: {
    plugins: [
      // @ts-ignore
      postCssPxToRem(),
    ],
    build: {
      rollupOptions: {
        output: {
          hashCharacters: 'hex',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'polyfills') {
              const hash = createHash('sha256')
                .update(`${Date.now()}`)
                .digest('hex').slice(0, 8);
              return `assets/${chunkInfo.name}.${hash}.js`;
            }
            return 'assets/[name].[hash].js';
          },
        },
      },
      assetsInlineLimit: 0,
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "~/assets/styles/helpers.less";',
        },
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            propList: [
              '*',
              '!border-left',
              '!border-right',
              '!border-top',
              '!border-bottom',
              '!border',
              '!outline',
            ],
          }),
        ],
      },
    },
  },

  viewport: {
    breakpoints: {
      mobile: 0,
      tablet: 480,
      desktop: 1024,
    },
  },

  legacy: {
    targets: ['since 2020 and not dead'],
  },

  swiper: {
    prefix: 'Swiper',
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: '2024-10-14',
});
