$(function(){
  const socket = io()
  let selectedRoom = ''
  let audioPermission = false
  let mediaRecorder
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioPermission = true
      mediaRecorder = new MediaRecorder(stream)
      let chunks = []
      mediaRecorder.ondataavailable = data => {
        chunks.push(data.data)
      }
      mediaRecorder.onstop = () => {
        const reader = new window.FileReader()
        const blob = new Blob(chunks, { type: 'audio/ogg; codec=opus' })
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
           socket.emit('sendAudio', {
            data: reader.result,
            room: selectedRoom
          })
        }
        chunks = []
      }
    }, err => {
      console.log(err)
      mediaRecorder = null
      audioPermission = false
    })

  $('.send-audio')
    .mouseup(function(){
      if (audioPermission && selectedRoom !== '') {
        mediaRecorder.stop()
      }
    })
    .mousedown(function(){
      if (audioPermission && selectedRoom !== '') {
        mediaRecorder.start()
      }
    })

  $('.msg').keyup(function(key) {
    if (selectedRoom !== '' && key.keyCode === 13) {
      socket.emit('sendMsg', {
        msg: $('.msg').val(),
        room: selectedRoom,
      })
      $('.msg').val('')
    }
  })

  $('.room-list').on('click', '.room-item', function() {
    const roomId = $(this).attr('data-id')
    socket.emit('join', roomId)
    selectedRoom = roomId
  })

  const renderMsg = (type, msg) => {
    if (type === 'text') {
      return msg
    } else if (type === 'audio') {
      return `<audio src="${msg}" controls="true"></audio>`
    } 
    return ''
  }

  const addRoom = (room) =>  $('.room-list').append(`<li data-id="${room._id}" class="room-item">${room.name}</li>`)
  const addMsg = msg => {
      const html = `<div class="message"><span class="author">${msg.author}</span><br>
      <span class="msg-body">${renderMsg(msg.msgType, msg.message)}</span></div>`
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
  socket.on('newAudio', msg => {
    console.log(msg)
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