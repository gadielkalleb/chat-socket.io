const express = require('express')

const routes = express.Router()

const login = require('../controllers/login')

routes.get('/', (req, res) => res.render('home'))
routes.post('/', login.processLogin)

module.exports = routes