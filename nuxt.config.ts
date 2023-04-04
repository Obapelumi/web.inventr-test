// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  components: false,
  runtimeConfig: {
    public: { apiBaseUrl: process.env.API_BASE_URL }
  },
  tailwindcss: { viewer: false },
  imports: { dirs: ['composables/resources'] }
})
