$(function(){
  const socket = io()
  let selectedRoom = ''
  $('.room-list').on('click', '.room-item', function() {
    socket.emit('join', $(this.attr('data-id')))
  })
  const addRoom = (room) =>  $('.room-list').append(`<li data-id="${room._id}" class="room-item">${room.name}</li>`)
  socket.on('newRoom', room => {
    addRoom(room)
  })
  socket.on('roomList', rooms => {
    $('.room-list').html('')
    rooms.map(addRoom)
  })
  $('.add-room').click(function(){
    const roomName = prompt('Informe o nome da sala:')
    if (roomName) {
      socket.emit('addRoom', roomName)
    }
  })
})