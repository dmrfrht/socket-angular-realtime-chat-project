const shortid = require('shortid')
const rediClient = require('../redisClient')

function Rooms() {
  this.client = rediClient.getClient()
}

module.exports = new Rooms()

Rooms.prototype.upsert = function (name) {
  const roomId = shortid.generate()
  this.client.hset(
    'rooms',
    '@Room:' + roomId,
    JSON.stringify({
      id: '@Room:' + roomId,
      name,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err)
    }
  )
}

Rooms.prototype.list = function (cb) {
  let roomList = []

  this.client.hgetall(
    'rooms',
    function (err, rooms) {
      if (err) {
        return cb([])
      }

      for (let room in rooms) {
        roomList.push(JSON.parse(rooms[room]))
      }

      return cb(roomList)
    }
  )
}
