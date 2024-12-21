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
  <div class="container">
    <div>About
    </div>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque corporis dicta ducimus fugiat, incidunt
      ipsum laudantium magnam natus necessitatibus nesciunt officia officiis pariatur, possimus praesentium, sit tenetur
      unde vero voluptas voluptatum. Ab ad, aliquam animi at atque consequatur consequuntur culpa deserunt dignissimos
      doloremque error eum expedita fugiat fugit illo impedit inventore ipsam iste laboriosam, maiores minima neque nobis
      odit perferendis quae, quibusdam quis quo ratione rem reprehenderit sapiente similique soluta sunt tempore unde
      voluptates voluptatum? Aliquid amet, architecto atque aut commodi cupiditate dolorem, dolores, ea ex excepturi
      explicabo iusto neque nulla quae quod recusandae similique sit soluta tenetur ut.
    </div>
  </div>

</template>

<style lang="less" src="./about.less" />
