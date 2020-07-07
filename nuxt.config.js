
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bán giá sỉ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    // middleware: ['auth']
  },

  axios: {
    baseURL: 'http://bagisto.local/api',
    withCredentials: true,
    cors: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/customer/login', method: 'post', propertyName: 'token' },
          user: { url: '/customer/get', method: 'get', propertyName: 'data' },
          logout: false
        
        },
        tokenRequired: true,
        tokenType: 'Token',
        tokenName: 'Authorization'
      }
    },
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   callback: '/login',
    //   home: '/'
    // }
  }
}
