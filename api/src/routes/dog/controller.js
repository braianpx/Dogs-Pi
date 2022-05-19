const { Breed, Temperament } = require('../../db')

function createBreed(req,res){
const { name, height, weight, life_span, img , temperament} = req.body;

if(!name[0] && !name[name.length -1]) res.status(401).json({data: 'the name is empty'})
else if(!parseInt(name)){
Breed.findOrCreate({
    where:{name: name},
    defaults:{
        height,
        weight,
        life_span,
        img 
    }
}).then(dateB =>{
Temperament.findOrCreate({
   where: { name: temperament }
})
.then(dateT =>{
    if(dateB[1]){
    dateB[0].setTemperaments(dateT[0].id)
    res.status(201).json({data: 'The dog breed was created successfully'})  
    }else{
    res.status(401).json({data: `the breed of dog with the name ${name} already existsBreed exist`})        
    }
})

}).catch(err=>{
    res.status(401).json({data: err + ""})
})
}
else{
    res.status(401).json({data: 'The name should not have numbers'})
}
}



module.exports = {
    createBreed,
}