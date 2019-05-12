const Mongoose = require('mongoose')

Mongoose.Promise = global.Promise

const connectToDb = async () => {
  const dbHost = '127.0.0.1'
  const dbPort = '27017'
  const dbName = 'materials'

  try {
    await Mongoose.connect(
      `mongodb://${dbHost}:${dbPort}/${dbName}`,
      { useNewUrlParser: true }
    )
    console.log('Connected to mongo!!!')
  } catch (err) {
    console.error('Could not connect to MongoDB')
  }
}

module.exports = connectToDb
