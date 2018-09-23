const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Room', RoomSchema)
