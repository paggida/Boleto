const server = require('./server')

server.listen(process.env.PORT || 3000)
console.log(`API port:${process.env.PORT || 3000}`)
