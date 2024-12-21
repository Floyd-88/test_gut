export const useStore = defineStore("Store", () => {
  // state
  const isMenuOpened = ref(false);

  // actions
  function toggleMenu() {
    isMenuOpened.value = !isMenuOpened.value;
  }

  // getters
  return { isMenuOpened, windowWidth, toggleMenu };
});
