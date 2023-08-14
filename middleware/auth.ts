export default defineNuxtRouteMiddleware((to, from) => {
    to.fullPath = to.path
    if (to.query.token !== '8h2je!78w3bri&') {
        return navigateTo('/')
    } 
  });