const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  mongoose.connection.on('open', () => {
    console.log('mongodb connected')
  })

  mongoose.connection.on('error', (err) => {
    console.log('mongodb: error', err)
  })

  mongoose.Promise = global.Promise
}
