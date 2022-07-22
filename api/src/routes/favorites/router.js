const { Router } = require('express');
const { newFavorite, getAllFavorites, deleteFavorite} = require('./controller.js')
const validateUser = require('../../middleware/authenticationUser');
const route = Router();

route.post('/',validateUser, newFavorite)
route.get('/:username',validateUser, getAllFavorites) 
route.delete('/delete',validateUser, deleteFavorite)

module.exports = route;