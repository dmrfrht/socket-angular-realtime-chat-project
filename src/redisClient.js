const redis = require('redis')

const getClient = () => {
  return redis.createClient()
}

module.exports.getClient = getClient
