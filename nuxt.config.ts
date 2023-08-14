// https://nuxt.com/docs/api/configuration/nuxt-config
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
    awsSesRegion: process.env.AWS_SES_REGION,
    senderEmail: process.env.SENDER_EMAIL_ADDRESS,
    authSecret: process.env.AUTH_SECRET,
    authPassword: process.env.AUTH_PASSWORD,
    authUser: process.env.AUTH_USER_NAME,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  vueEmail: {
    key: process.env.AUTH_SECRET,
  },

});
