module.exports = {
    apps: [
      {
        name: 'ceo-assessment',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'npm run dev'
      }
    ]
  }