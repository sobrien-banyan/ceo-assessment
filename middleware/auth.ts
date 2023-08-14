export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig();
    to.fullPath = to.path
    // using vueEmail in nuxt.config.ts to pass the key
    if (to.query.token !== config.public.vueEmailOptions.key) {
        return navigateTo('/')
    } 
  });