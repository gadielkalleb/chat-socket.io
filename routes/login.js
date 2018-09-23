const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => res.render('home'))
routes.post('/', (req, res) => {
  req.session.user = {
    name: req.body.name,
  }
  res.redirect('room')
})

module.exports = routes