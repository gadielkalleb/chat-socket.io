const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const login = require('./routes/login')
const room = require('./routes/room')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'socket.io',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 10*60*100
  }
}))

app.set('view engine', 'ejs')


// rotas do meu chat
app.use('/', login)
app.use('/room', room)

const socket = require('./socketio/io')

socket(io)

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/chat-socketio', { useNewUrlParser: true })
  .then(() => {
    http.listen(3000, () => console.log('chat rodando...'))
  }).catch(e => console.log(e))
