const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const sharedSession = require('express-socket.io-session')

const port = process.env.PORT || 3000

const socket = require('./socketio/io')
const mongoose = require('./db/mongodb')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const login = require('./routes/login')
const room = require('./routes/room')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const expressSession = session({
  secret: 'socket.io',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 10*60*100
  }
})

app.use(expressSession)
io.use(sharedSession(expressSession, { autosave: true }))

app.set('view engine', 'ejs')

// rotas do meu chat
app.use('/', login)
app.use('/room', room)

http.listen(port, () => {
  console.log('chat rodando...')
  mongoose
  socket(io)
})
