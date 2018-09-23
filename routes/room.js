const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    res.render('room', {
      name: req.session.user.name,
    })
  }
})

module.exports = routes
