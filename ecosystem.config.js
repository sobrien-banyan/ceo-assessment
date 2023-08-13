module.exports = {
    apps: [
      {
        name: 'ceo-assessment',
        port: '80',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'npm run dev'
      }
    ]
  }