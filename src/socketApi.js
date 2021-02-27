const socketio = require('socket.io')
const io = socketio()
const socketAuthorization = require('../middlewares/socketAuthorization')

const socketApi = {
  io
}

// socketAuthorization middleware
io.use(socketAuthorization)

/**
 * Redis Atapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
  host: 'localhost',
  port: 6379
}));

io.on('connection', socket => {
  console.log("a user logged in with name: " + socket.request.user.name)
})

module.exports = socketApi
