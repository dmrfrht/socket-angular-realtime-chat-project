const socketio = require('socket.io')
const io = socketio()

const socketApi = {
  io
}


/**
 * Redis Atapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
  host: 'localhost',
  port: 6379
}));

io.on('connection', socket => {
  console.log("a user logged in")
})

module.exports = socketApi
