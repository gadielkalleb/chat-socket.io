const express = require('express')

const routes = express.Router()

const roomController = require('../controllers/room')

routes.get('/', roomController.room)

module.exports = routes
