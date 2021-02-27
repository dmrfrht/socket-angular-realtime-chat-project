const cookieParser = require('cookie-parser')
const passportSocketIO = require('passport.socketio')
const redis = require('redis')

const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()


function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');
  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}


module.exports = passportSocketIO.authorize({
  cookieParser,
  key: 'connect.sid',
  secret: process.env.SECRET_KEY,
  store: new RedisStore({client: redisClient}),
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail,
})
