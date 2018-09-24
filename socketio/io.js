const Rooms = require('../models/room')
const Message = require('../models/message')

module.exports = async io => {
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
      Message
        .find({ room: roomId })
        .then((msgs) => socket.emit('msgsList', msgs))
        .catch(e => console.log('erro ao trazer a lista de msgs ====>', e))
    })
    socket.on('sendMsg', msg => {
      const message = new Message({
        author: socket.handshake.session.user.name,
        when: new Date(),
        msgType: 'text',
        message: msg.msg,
        room: msg.room,
      })
      message
        .save()
        .then(() => io.to(msg.room).emit('newMsg', message))
        .catch(e => console.log(e))
    })
    socket.on('sendAudio', msg => {
      const message = new Message({
        author: socket.handshake.session.user.name,
        when: new Date(),
        msgType: 'audio',
        message: msg.data,
        room: msg.room,
      })
      message
        .save()
        .then(() => io.to(msg.room).emit('newAudio', message))
        .catch(e => console.log(e))
    })
  })
}
