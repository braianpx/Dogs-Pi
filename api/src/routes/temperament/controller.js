const { Temperament } = require('../../db');


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