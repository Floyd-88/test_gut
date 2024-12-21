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
 <div>About</div>
</template>

<style lang="less" src="./about.less" />
