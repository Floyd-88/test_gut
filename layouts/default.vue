<script setup lang="ts">
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';

const asset = useAsset();

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

useSeoMeta({
  title: '',
  ogTitle: '',
  description: '',
  ogDescription: '',
  // ogImage: asset('static/sharing.jpeg'),
  // ogUrl: '',
  twitterTitle: '',
  twitterDescription: '',
  // twitterImage: asset('static/sharing.jpeg'),
  twitterCard: 'summary_large_image',
  formatDetection: 'telephone=no',
});

useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  script: [
    {
      innerHTML: `
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Triden t') !== -1) {
        var script3 = document.createElement('script');
        script3.async = true;
        script3.src =
          'https://www.sberbank.ru/common/img/uploaded/redirected/static/old_browsers.js';
        document.head.appendChild(script3);
      }
      `,
      type: 'text/javascript',
      defer: true,
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    gtm: ['innerHTML'],
  },
  link: [{ rel: 'icon', type: 'image/png', href: asset('static/favicon.png') }],
});

onMounted(() => {
  // if (!isTouch.value) {
  //   ScrollSmoother.create({
  //     smooth: 2,
  //   });
  //
  //   window.addEventListener('resize', () => {
  //     ScrollTrigger.refresh();
  //   });
  // }
});
</script>

<template>
  <div class="smooth-wrapper">
    <div id="smooth-content">
      <div class="wrap">
        <AppHeader />
        <slot />
        <AppFooter />
      </div>
    </div>
  </div>
</template>
<style>
.wrap {
  display: flex;
flex-direction: column;
height: 100vh;
}
</style>
