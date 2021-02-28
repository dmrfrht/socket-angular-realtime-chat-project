const socketio = require('socket.io')
const io = socketio()
const socketAuthorization = require('../middlewares/socketAuthorization')

const socketApi = {
  io
}

// libs
const Users = require('./lib/Users')

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

  Users.upsert(socket.id, socket.request.user)

  Users.list(users => {
    console.log(users)
    io.emit('onlineList', users)
  })

  socket.on('disconnect', () => {
    Users.remove(socket.request.user.googleId)

    Users.list(users => {
      io.emit('onlineList', users)
    })
  })
})

module.exports = socketApi
