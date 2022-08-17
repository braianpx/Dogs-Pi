const { Router } = require('express')
const { createBreed, deletedBreed} = require('./controller.js')

const route = Router(); 

route.post('/',createBreed)
route.delete('/',deletedBreed)


module.exports = route;