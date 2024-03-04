const app = require('./server')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)

server.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})