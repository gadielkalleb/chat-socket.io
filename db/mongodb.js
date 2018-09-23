const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/chat-socketio', { useNewUrlParser: true })
  .then(() => {
    console.log('conectado ao mongodb')
  }).catch(e => console.log('não foi possivel conectar ao mongodb ==>>', e))

module.exports = mongoose
