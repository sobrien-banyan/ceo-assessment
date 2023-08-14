// https://nuxt.com/docs/api/configuration/nuxt-config
process.env.AUTH_SECRET = process.env.AUTH_SECRET
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', 'vue-email/nuxt', '@sidebase/nuxt-pdf'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: true,
    exposeLevel: 10,
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    mongoDBName: process.env.MONGO_DB_NAME,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  vueEmail: {
    // remove
    baseUrl: 'https://ecosean1@gmail.com',
  },
});
