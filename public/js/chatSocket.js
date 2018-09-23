$(function(){
  const socket = io()
  var selectedRoom = ''

  $('.msg').keyup(function(key) {
    if (selectedRoom !== '' && key.keyCode === 13) {
      socket.emit('sendMsg', {
        msg: $('.msg').val(),
        room: selectedRoom,
      })
      $('.msg').val('')
    }
  })

  // const roomList = document.querySelectorAll('.room-list')
  // roomList.forEach(room => {
  //   addEventListener('click', function() {
  //     const roomId = room.getAttribute('data-id')
  //     socket.emit('join', roomId)
  //     selectedRoom = roomId
  //   })
  // })
  $('.room-list').on('click', '.room-item', function() {
    const roomId = $(this).attr('data-id')
    socket.emit('join', roomId)
    selectedRoom = roomId
  })
  function changeRoom() {
    
  }

  const addRoom = (room) =>  $('.room-list').append(`<li data-id="${room._id}" class="room-item">${room.name}</li>`)
  const addMsg = msg => {
    const html = `<div class="message"><span class="author">${msg.author}</span><br><span class="msg-body">${msg.message}</span></div>`
    $('.messages').append(html)
  }

  socket.on('newRoom', room => {
    addRoom(room)
  })
  socket.on('roomList', rooms => {
    $('.room-list').html('')
    rooms.map(addRoom)
  })

  socket.on('newMsg', msg => {
    if (selectedRoom === msg.room) {
      addMsg(msg)
    }
  })
  socket.on('msgsList', msgs => {
    $('.messages').html('')
    msgs.map(addMsg)
  })
  $('.add-room').click(function(){
    const roomName = prompt('Informe o nome da sala:')
    if (roomName) {
      socket.emit('addRoom', roomName)
    }
  })
})