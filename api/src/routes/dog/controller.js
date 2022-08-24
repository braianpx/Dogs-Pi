const { Breed, Temperament } = require('../../db')

function createBreed(req,res){
const { name, height, weight, life_span, image, temperament} = req.body;
if(!height||!weight||!life_span||!temperament) res.status(401).json({data:'missing data'})
if(!name[0] && !name[name.length -1]) res.status(401).json({data: 'the name is empty'})
else if(!parseInt(name)){
    Breed.findOrCreate({
    where:{name: name},
    defaults:{
        height,
        weight,
        life_span,
        image,
    }
}).then(dateB =>{
    const tempMap = temperament.map(elem =>{
       return Temperament.findOne({
            where: { name: elem }
         })
    })
    Promise.all(tempMap)
.then(dateT =>{
    if(dateB[1]){
    dateT.forEach(elem=>{ 
    dateB[0].setTemperaments(elem.id) 
    }) 
    res.status(201).json({data: 'The dog breed was created successfully', idBreed:dateB[0].id})  
    }else{
    res.status(401).json({data: `The dog breed with the name ${name} already exists`})        
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

///////////      deleted      /////////////

async function deletedBreed(req,res){
const {nameBreed} = req.body;
try{
await Breed.destroy({
    where: {
        name: nameBreed
    }
  });
  res.status(200).json({data:"Breed was successfully deleted"})
}catch(err){
    res.status(404).json({data:err+""})
}
}


module.exports = {
    createBreed,
    deletedBreed
}