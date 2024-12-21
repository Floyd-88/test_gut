<script setup lang="ts">
interface ISettings {
  errorText: string,
  id: number,
  linkList: Record<string, any>[],
  loadButtonText: string,
  qrCorrectionLevel: string,
  qrFormat: string,
  qrSize: number,
}

import { addUtmMarksToURL, formBody } from './script/utils';
import { loadImage } from './script/api';

const props = withDefaults(defineProps<{
  link: Record<string, any>,
}>(), {
  link: () => ({}),
});

const qrStore = useQrStore();
const PROJECT_ID = '';
const base64String = ref('');
const error = ref(false);
const settings: ComputedRef<ISettings> = computed(() => qrStore.settings);

const reloadHandler = async () => {
  await loadImageCallback(
    `https://www.sberbank.com${props.link.link}?product_code=fund_modern8&from=${PROJECT_ID}`,
    settings.value,
  );
};

const loadImageCallback = async (targetLink: string, settings: Record<string, any>) => {
  try {
    qrStore.setLoaded(false);
    const { QRCorrectionLevel, QRFormat, QRSize } = settings;
    const {
      QRCorrectionLevel: targetQRCorrectionLevel,
      QRFormat: targetQRFormat,
      QRSize: targetQRSize,
    } = settings;

    const targetURLWithUtmMarks = addUtmMarksToURL(targetLink, [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
    ]);

    const body = formBody(
      targetURLWithUtmMarks,
      QRCorrectionLevel,
      QRFormat,
      QRSize,
      targetQRCorrectionLevel,
      targetQRFormat,
      targetQRSize,
    );

    const res = await loadImage(body) as { base64: string, url: string };
    const string = res.base64;

    if (!string) {
      throw new Error('result base64 is empty');
    }

    base64String.value = string;
    error.value = false;
  } catch (error) {
    console.error('Error in loadImageCallback:', error.message);
    error.value = true;
  } finally {
    qrStore.setLoaded(true);
  }
};

onMounted(async () => {
  await reloadHandler();
});
</script>

<template>
  <div v-if="error">
    <div class="qr-widget__error">
      <div class="qr-widget__error-text">{{ settings.errorText }}</div>
      <button
        type="button"
        :aria-label="settings.loadButtonText"
        class="qr-widget__reload-button"
        @click="reloadHandler"

      >{{ settings.loadButtonText }}
      </button>
    </div>
  </div>
  <div v-else-if="base64String">
    <div class="qr-widget__item">
      <div class="qr-widget__qrcode">
        <img :src="`data:image/png;charset=utf-8;base64, ${base64String}`" alt="">
      </div>
      <div class="qr-widget__text">
        <div class="qr-widget__text-title">{{ link.header }}</div>
        <div class="qr-widget__text-description">{{ link.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.qr-widget {
  &__item {
    display: flex;
  }

  &__qrcode {
    width: 160px;
    height: 160px;

    img {
      width: 100%;
      transform: scale(0.9);
    }
  }

  &__text {
    margin-left: 40px;
  }

  &__text-title {
    padding-top: 15px;
    color: #2c3136;
    font-size: 21px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 0.75em;
  }

  &__text-description {
    font-size: 17px;
    line-height: 26px;
    color: #2c3136;
  }

  &__error {
    padding-top: 20px;
  }

  &__error-text {
    font-size: 21px;
    line-height: 32px;
  }

  &__reload-button {
    background-color: #ffffff;
    border: 2px solid #000014;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    padding: 10px 50px 10px 40px;
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;

    &::after {
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDIyIDIyIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzAwMDAxNCIgc3Ryb2tlPSIjMDAwMDE0IiBzdHJva2Utd2lkdGg9Ii41IiBkPSJNMTAuODk0IDRjLjkzNSAwIDEuODQ1LjE5IDIuNjg4LjU1Mi44MTkuMzUyIDEuNTYzLjg2MyAyLjE5MSAxLjUwMmwuMzY5LjM3OGMuMzM2LjM1MS41ODIuNjUyLjc4Mi45NzhWNS42MThjMC0uMjc2LjIwNy0uNTA0LjQ3NS0uNTM1bC4wNjMtLjAwM2MuMjc2IDAgLjUwMy4yMDcuNTM0LjQ3NWwuMDA0LjA2M3YzLjIzYzAgLjI3Ny0uMjA4LjUwNS0uNDc2LjUzNmwtLjA2Mi4wMDNIMTQuMjNjLS4yOTggMC0uNTM5LS4yNC0uNTM5LS41MzggMC0uMjc2LjIwOC0uNTA0LjQ3Ni0uNTM1bC4wNjMtLjAwNCAxLjk1Ny4wMDItLjAyLS4wNGMtLjE2Mi0uMzQtLjM2NC0uNjItLjY5MS0uOTc1bC0uMjI0LS4yMzUtLjI0OC0uMjUzYy0uNTMtLjU0LTEuMTU4LS45NzEtMS44NDktMS4yNjgtLjcxLS4zMDUtMS40NzQtLjQ2NC0yLjI2Mi0uNDY0LS43ODcgMC0xLjU1MS4xNTktMi4yNi40NjQtLjY5Mi4yOTctMS4zMi43MjktMS44NSAxLjI2OC0uNTMxLjU0LS45NTYgMS4xOC0xLjI0OSAxLjg4NC0uMy43MjQtLjQ1OCAxLjUwNS0uNDU4IDIuMzEgMCAuODA0LjE1NyAxLjU4NS40NTggMi4zMS4yOTMuNzAzLjcxOCAxLjM0MyAxLjI1IDEuODgzLjUzLjU0IDEuMTU3Ljk3MSAxLjg0OCAxLjI2OC43MS4zMDUgMS40NzQuNDY0IDIuMjYxLjQ2NC43ODggMCAxLjU1My0uMTU5IDIuMjYyLS40NjMuNjktLjI5OCAxLjMxOC0uNzMgMS44NS0xLjI3LjQ2OS0uNDc3Ljg3Ny0xLjE1NSAxLjIxOC0xLjk3NS4xMTQtLjI3NC40My0uNDA1LjcwNC0uMjkuMjc0LjExNC40MDUuNDI5LjI5LjcwNC0uMzkuOTM2LS44NjYgMS43MjgtMS40NDUgMi4zMTctLjYyOC42MzktMS4zNzIgMS4xNS0yLjE5MiAxLjUwMy0uODQyLjM2Mi0xLjc1Mi41NTEtMi42ODcuNTUxLS45MzQgMC0xLjg0My0uMTg5LTIuNjg3LS41NTEtLjgyLS4zNTMtMS41NjQtLjg2NS0yLjE5LTEuNTAzLS42MjgtLjYzOC0xLjEzLTEuMzk0LTEuNDc2LTIuMjI1QzQuMTg1IDEyLjg3IDQgMTEuOTUgNCAxMS4wMDNjMC0uOTQ3LjE4NS0xLjg2OS41NC0yLjcyMy4zNDctLjgzMi44NDktMS41ODcgMS40NzYtMi4yMjYuNjI4LS42MzggMS4zNzItMS4xNSAyLjE5Mi0xLjUwM0M5LjA1IDQuMTkgOS45NiA0IDEwLjg5NCA0eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5NCAtMTUxKSB0cmFuc2xhdGUoOTEgMTQyKSB0cmFuc2xhdGUoMjAzIDkpIi8+CiAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wIDBIMjJWMjJIMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yOTQgLTE1MSkgdHJhbnNsYXRlKDkxIDE0MikgdHJhbnNsYXRlKDIwMyA5KSIvPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==) 50%;
      background-size: cover;
      content: "";
      height: 22px;
      position: absolute;
      right: 10px;
      top: 10px;
      width: 22px;
    }
  }
}
</style>
