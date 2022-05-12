const { Temperament } = require('../../db');
const { API_KEY } = process.env;
const axios = require('axios');


function getTemperaments(req,res){
Temperament.findAll()
.then(allTemperaments =>{
   res.status(200).json(allTemperaments) 
})
.catch(err =>{
    res.status(404).json({data: err + ""})
})


}

module.exports = {  
    getTemperaments,
};