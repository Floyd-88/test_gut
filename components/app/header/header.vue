<script setup>
// import ScrollSmoother from '~/gsap/ScrollSmoother';
// import ScrollTrigger from '~/gsap/ScrollTrigger';

const burgerOpened = ref(false);

const handlerClickLink = (block) => {
  burgerOpened.value = false;

  // const smoother = ScrollSmoother.get();

  const topScroll = document.querySelector(block).offsetTop - 60;

  // if (smoother) {
  //   smoother.scrollTo(topScroll);
  // } else {
  //   window.scrollTo(0, topScroll);
  // }

  // ScrollTrigger.refresh();
};
</script>

<template>
  <header class="header">
      <div class="container header__container">
        <div class="header__logo">
          LOGO
        </div>
      </div>
  </header>
</template>

<style lang="less" src="./header.less" />
