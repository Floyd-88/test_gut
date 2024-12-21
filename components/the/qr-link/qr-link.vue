<script setup lang="ts">
const { isDesktop, isTouch } = useDevice();

withDefaults(defineProps<{
  href: string,
}>(), {
  href: '',
});

const qrStore = useQrStore();

const isDesktopNoTouch = computed(() => isDesktop.value && !isTouch.value);
const qrSettings = computed(() => qrStore.settings);
const linkTag = computed(() => !isDesktopNoTouch.value || !qrSettings.value.id ? 'a' : 'button');

const handleClick = () => {
  if (isDesktopNoTouch) {
    qrStore.setShow(true);
  }
};
</script>

<template>
  <component
    class="qr-link"
    :is="linkTag"
    @click="handleClick"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
