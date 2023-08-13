module.exports = {
    apps: [
      {
        name: 'ceo-assessment',
        port: '80',
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
      }
    ]
  }