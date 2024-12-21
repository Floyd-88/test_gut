<script setup lang="ts">
const qrStore = useQrStore();
const settings = computed(() => qrStore.settings);
const show = computed(() => qrStore.show);
const loaded = computed(() => qrStore.loaded);

const handleClose = () => {
  qrStore.setShow(false);
  qrStore.setLoaded(false);
};
</script>

<template>
  <div class="qr-widget">
    <transition name="fade" mode="out-in">
      <div
        v-if="show"
        :class="['qr-widget__modal', {'qr-widget__modal_hide': !loaded }]"
        @click.self.stop="handleClose"
      >
        <div class="qr-widget__modal-container">
          <keep-alive>
            <TheQrWidgetItem
              v-for="(link, index) in settings.linkList"
              :key="index" :link="link"
            />
          </keep-alive>
          <div tabindex="0" class="qr-widget__modal-close" @click="handleClose"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="less">
.qr-widget {
  &__link-element {
    cursor: pointer;
  }

  &__modal {
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.75);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
    padding-bottom: 70px;
    padding-top: 140px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: opacity 0.3s;

    &_hide {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__modal-container {
    width: 90vw;
    max-width: 1168px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 5px 23px -3px rgba(0, 0, 0, 0.1);
    position: relative;
    padding: 30px;
  }

  &__modal-close {
    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYgNC42NSAxMC4zNjguMjg0QS45NTYuOTU2IDAgMCAxIDExLjcyLjI3OGEuOTU1Ljk1NSAwIDAgMS0uMDA1IDEuMzU0TDcuMzUgNmw0LjM2NyA0LjM2OGMuMzc1LjM3NS4zOC45NzkuMDA1IDEuMzU0YS45NTYuOTU2IDAgMCAxLTEuMzUzLS4wMDVMNiA3LjM1bC00LjM2OCA0LjM2OGEuOTU2Ljk1NiAwIDAgMS0xLjM1My4wMDUuOTU1Ljk1NSAwIDAgMSAuMDA1LTEuMzU0TDQuNjUgNiAuMjg0IDEuNjMyQS45NTUuOTU1IDAgMCAxIC4yNzkuMjc4YS45NTYuOTU2IDAgMCAxIDEuMzUzLjAwNUw2IDQuNjVaIiBmaWxsPSIjODc4QjkwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) no-repeat 50%;
    background-size: 12px 12px;
    cursor: pointer;
    height: 52px;
    outline: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 52px;
    z-index: 1;
  }
}
</style>
