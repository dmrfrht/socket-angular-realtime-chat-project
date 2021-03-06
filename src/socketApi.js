const socketio = require('socket.io')
const io = socketio()
const socketAuthorization = require('../middlewares/socketAuthorization')

const socketApi = {
  io
}

// libs
const Users = require('./lib/Users')
const Rooms = require('./lib/Rooms')
const Messages = require('./lib/Messages')

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
    io.emit('onlineList', users)
  })

  socket.on('disconnect', () => {
    Users.remove(socket.request.user._id)

    Users.list(users => {
      io.emit('onlineList', users)
    })
  })

  socket.on('newRoom', roomName => {
    Rooms.upsert(roomName)

    Rooms.list(rooms => {
      io.emit('roomList', rooms)
    })
  })

  Rooms.list(rooms => {
    io.emit('roomList', rooms)
  })

  socket.on('newMessage', data => {
    const messageData = {
      ...data,
      userId: socket.request.user._id,
      username: socket.request.user.name,
      surname: socket.request.user.surname
    }

    Messages.upsert(messageData)
    socket.broadcast.emit('receiveMessage',  messageData)
  })
})

module.exports = socketApi
