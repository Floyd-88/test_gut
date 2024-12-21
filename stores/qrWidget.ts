export const useQrStore = defineStore('QrStore', () => {
  const settings = ref({});
  const show = ref(false);
  const loaded = ref(false);

  // actions
  const setSettings = (newSettings: Record<string, any>) => {
    settings.value = newSettings;
  };
  const setShow = (value: boolean) => {
    show.value = value;
  };
  const setLoaded = (value: boolean) => {
    loaded.value = value;
  };
  const loadSettings = async () => {
    try {
      const data: Record<string, any> = await $fetch(process.env.QR_DOMAIN, {
        params: { id: 0 },
        baseURL: '',
      });
      setSettings(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    settings,
    show,
    loaded,
    setSettings,
    setShow,
    setLoaded,
    loadSettings,
  };
});
