# SBER BoilerPlate

## Запуск проекта

```zsh
npm i
npm run dev
```

В шаблоне используется [Volta](https://volta.sh/). Минимальная версия nodejs - 22.9.0.

Для конкретной работы [nuxt-vite-legacy](https://www.npmjs.com/package/nuxt-vite-legacy), нужно обновить caniuse-lite списки браузеров.
Поддерживаем версии браузеров от 2020 и младше.
```zsh
npx update-browserslist-db@latest
```

## Работа с ассетами

Шрифты, иконки, изображения необходимо размещать в папке assets, public не используем.
Для подключения картинки в шаблонах импортируем composible useAsset.

```vue
<script setup lang="ts">
  const asset = useAsset();
</script>

<template>
  <img :src="asset(`/images/component-folder/image.jpg`)" alt="imageTitle" />
</template>
```

## GSAP
В проекте подключена Business версия gsap версии 3.12.5.<br>
[Список доступных плагинов](https://gsap.com/pricing/#features-table).

## pxToRem
В проекте используется pxToRem, что позволяет сократить количество медиазапросов при подготовке адаптивов.
Основной конфиг уже есть, он опирается на размер шрифта тэга ```<html>```.

```less
// assets/styles/main.less
html {
  font-size: 16px;

  @media (max-width: 1440px) {
    font-size: 1.1111111vw;
  }

  @media @tablet {
    font-size: 2.08334vw;
  }

  @media @mobile {
    font-size: 4.266667vw;
  }
}
```
Значения можно посчитать по формуле: ```16px / 1440px * 100% ```

Где: <br />
**16** - базовый размер шрифта;<br />
**1440** - ширина экрана по макету;<br />
**100** - полная ширина экрана.

Как правило, на экранах шире 1440px - pxToRem отключаем указав корневому элементу значение в 16px.

## useDevice

Решение основанное на nuxt-viewport, предоставляет удобные методы для conditional рендеринга элементов.

```vue
<script setup lang="ts">
// в script секции, нужно использовать .value для получения булевых значений(прим. isMobile.value)
const { isMobile, isTablet, isDesktop, isTouch } = useDevice();
</script>

<template>
  <!--  отрендерится только на экранах < 480px -->
  <div v-if="isMobile">
    Some content
  </div>
</template>
```

## QR виджет

Для работы виджета в components/qrWidget.ts нужно добавить уникальный ID проекта в запрос и добавить вызов
метода qrStore.loadSettings() в layouts/default.vue.

```vue

<script setup lang="ts">
const qrStore = useQrStore();
const { isDesktop, isTouch } = useDevice();
onMounted(() => {
  qrStore.loadSettings();
});
</script>

<template>
  <TheQrWidget v-if="isDesktop && !isTouch" />
</template>
```

Для тестирования необходимо
установить [расширение](https://chromewebstore.google.com/detail/empty-title/idgpnmonknjnojddfkpgkljpfnnfcklj).

Далее импортировать конфиг:<br>
опции(три вертикальные точки) > import profile > вставить json в текстовое поле > нажать кнопку **import**.

```json
[
  {
    "headers": [
      {
        "enabled": true,
        "name": "Referer",
        "value": "https://www.sberbank.com/"
      },
      {
        "enabled": true,
        "name": "Origin",
        "value": "www.sberbank.com"
      }
    ],
    "respHeaders": [
      {
        "enabled": true,
        "name": "Access-Control-Allow-Origin",
        "value": "*"
      }
    ],
    "shortTitle": "1",
    "title": "Sber",
    "version": 2
  }
]
```

## Yandex метрика
При необходимости, можно использовать данный [модуль](https://github.com/nuxt-community/yandex-metrika-module).

## Сборка
У проекта может быть несколько вариантов сборки.
При необходимости, в проект нужно добавить файлы .env.prod и .env.stage и указать в них путь, который будет
использоваться
при выкате проекта на стороне клиента.
Сборка опирается на окружение(.env) для работы с ассетами.

```zsh
# domainname.com не прописывается и описан только для примера. Ссылки относительные.
# domainname.com/promo/project/test
npm run build:stage

# domainname.com/promo/project/
npm run build:prod
```

Для передачи клиенту билдов можно использовать:

```zsh
npm run build-and-pack
```

Скрипт соберет две версии проекта для боевого и тестового окружения и запакует их в архивы в папке ```/builds```.

Вариации, позволяющие собрать архивы по отдельности:
```zsh
npm run build:stage
npm run build:prod
```
