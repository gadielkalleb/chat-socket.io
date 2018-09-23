const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

mongoose.Promise = global.Promise

const app = express()

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

mongoose.connect('mongodb://localhost/chat-socketio', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => console.log('chat rodando...'))
  }).catch(e => console.log(e))
