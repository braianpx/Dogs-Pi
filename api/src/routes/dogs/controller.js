const { Breed, Temperaments} = require('../../db')
const axios = require('axios')
const { API_KEY } = process.env;

async function getDogs (req, res){
 const { name } = req.query;
    try{
        if(name){
            const info2 = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
            const breeds1 = await Breed.findAll({
            where:{
                name:name
            }
        })
        const apiC1 = breeds1.concat(info2.data);
         res.status(200).json(info2.data)
 }else{
        const info1 = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);        
        const breeds = await Breed.findAll();
        const apiC = breeds.concat(info1.data);
        res.status(200).json(apiC)
}
}catch(err){
        res.status(404).json({data: err + ""})
    }};

async function breedForId(req,res){
  const { idRaza } = req.params;
try{
        const breedApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
if(breedApi.data[idRaza]){
    const breed1 = breedApi.data[idRaza - 1];
    res.status(200).json(breed1)
}else{
    const breed = await Breed.findByPk(idRaza,{
        include: Temperaments
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