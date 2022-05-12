const { Router } = require('express')
const { createBreed } = require('./controller.js')

const route = Router(); 

route.post('/',createBreed)


module.exports = route;