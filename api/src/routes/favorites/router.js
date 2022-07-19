const { Router } = require('express');
const { newFavorite, getAllFavorites } = require('./controller.js')

const route = Router();


route.post('/',newFavorite)
route.get('/:username',getAllFavorites) 


module.exports = route;