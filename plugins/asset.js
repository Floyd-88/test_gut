export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('useAsset', (path) => {
    const assets = import.meta.glob('~/assets/**/!(*.less|.DS_Store)', {
      eager: true,
      import: 'default',
    });
    const matchingPath = Object.keys(assets).find(key => key.endsWith(path));

    if (matchingPath) {
      return assets[matchingPath];
    } else {
      console.error('Asset not found for path:', path);
      return null;
    }
  });
});
