export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig();
    console.log('config', config);
    to.fullPath = to.path
    // using vueEmail in nuxt.config.ts to pass the secretKey
    if (to.query.token !== config.public.vueEmailOptions.secretKey) {
        return navigateTo('/')
    } 
  });