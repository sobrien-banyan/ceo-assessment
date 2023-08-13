module.exports = {
    apps: [
      {
        name: 'ceo-assessment',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
      }
    ]
  }