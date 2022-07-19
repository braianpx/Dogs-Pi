const { Router } = require('express');
const { createUser } = require('./controller.js')

const route = Router();

route.post('/',createUser);

module.exports = route; 