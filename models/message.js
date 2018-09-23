const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  name: String,
  author: String,
  when: Date,
  msgType: String,
  message: String,
})

module.exports = mongoose.model('Message', MessageSchema)
