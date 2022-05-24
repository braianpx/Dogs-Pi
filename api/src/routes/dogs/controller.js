const { Breed, Temperament } = require('../../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;

async function getDogs (req, res){
 const { name } = req.query;
    try{
        const info1 = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        if(name){
            const info2 = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);   
            info1.data.forEach(elem=>{
                info2.data.forEach(el=>{
                    if(elem.reference_image_id === el.reference_image_id)
                    el.image = {url: elem.image.url}
                })
            })


            const breeds1 = await Breed.findAll();
            const breedsFilter = breeds1.filter(elem => elem.name.toUpperCase().includes(name.toUpperCase()))
            
            const apiC1 = breedsFilter.concat(info2.data);
         res.status(200).json(apiC1)
 }else{ 
        const breeds = await Breed.findAll(
            {
            include: [
                {
                    model: Temperament
                }
            ]
        }
        );
        const apiC = info1.data.concat(breeds);
        res.status(200).json(apiC)
}
}catch(err){
        res.status(404).json({data: err + ""})
    }};

///////////////////////////////////////////

async function breedForId(req,res){
  const { idRaza } = req.params;
try{
    const breedApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let idRazaSwitch = false;
    breedApi.data.forEach(elem =>{
        if(String(elem.id) === String(idRaza)){
            idRazaSwitch = elem;
        }       
    })  
if(idRazaSwitch){
    res.status(200).json(idRazaSwitch)
}else{
    const breed = await Breed.findByPk(idRaza,{
        include:[{
            model: Temperament
            }]
    });
res.status(200).json(breed)
}   
}catch(err){
res.status(404).json({data: err + ""})
}};

module.exports = {
    getDogs,
    breedForId,
}