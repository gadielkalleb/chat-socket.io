const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  author: String,
  when: Date,
  msgType: String,
  message: String,
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'room',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

module.exports = mongoose.model('Message', MessageSchema)
