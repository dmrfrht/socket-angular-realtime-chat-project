const shortid = require('shortid')
const rediClient = require('../redisClient')

function Messages() {
  this.client = rediClient.getClient()
}

module.exports = new Messages()

Messages.prototype.upsert = function ({roomId, message, userName, userSurName}) {
  this.client.hset(
    'messages:' + roomId,
    shortid.generate(),
    JSON.stringify({
      userName,
      userSurName,
      message,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err)
    }
  )
}

Messages.prototype.list = function (roomId, cb) {
  let messageList = []

  this.client.hgetall(
    'messages:' + roomId,
    function (err, messages) {
      if (err) {
        return cb([])
      }

      for (let message in messages) {
        messageList.push(JSON.parse(messages[message]))
      }

      return cb(messageList)
    }
  )
}
