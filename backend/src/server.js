const app = require('./app')
const { port, nodeEnv } = require('./config/env')

const server = app.listen(port, () => {
  console.log(`🚀 Server running in ${nodeEnv} mode on port ${port}`)
  console.log(`📍 API available at http://localhost:${port}/api`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})


