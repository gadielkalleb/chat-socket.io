const Rooms = require('../models/room')

module.exports = io => {
  io.on('connection', socket => {
    Rooms.find({}, (err, rooms) => {
      socket.emit('roomList', rooms)
    })
    socket.on('addRoom', roomName => {
      const room = new Rooms({
        name: roomName,
      })
      room.save()
        .then(() => io.emit('newRoom', room))
        .catch(e => console.log('Error ao salvar a Sala ', e))
    })
    socket.on('join', roomId => {
      socket.join(roomId)
    })
  })
}
