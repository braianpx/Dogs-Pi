const { Router } = require('express');
const { createUser, logIn, deleteUser } = require('./controller.js')
const route = Router();

route.post('/register', createUser);
route.post('/logIn', logIn)
route.delete('/delete', deleteUser)

module.exports = route; 