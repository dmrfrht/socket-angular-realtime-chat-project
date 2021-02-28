const rediClient = require('../redisClient')

function Users() {
  this.client = rediClient.getClient()
}

module.exports = new Users()

Users.prototype.upsert = function (connectionId, meta) {
  this.client.hset(
    'online',
    meta._id,
    JSON.stringify({
      connectionId,
      meta,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err)
    }
  )
}

Users.prototype.remove = function (_id) {
  this.client.hdel(
    'online',
    _id,
    err => {
      if (err) console.error(err)
    }
  )
}

Users.prototype.list = function (cb) {
  let active = []

  this.client.hgetall(
    'online',
    function (err, users) {
      if (err) {
        console.error(err)
        return cb([])
      }

      for (let user in users) {
        active.push(JSON.parse(users[user]))
      }

      return cb(active)
    }
  )
}
