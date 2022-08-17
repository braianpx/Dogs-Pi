const { Favorites, User, Breed } = require('../../db');
const axios = require('axios');


async function newFavorite(req,res){
const { idBreed } = req.body;
const idUser = req.user;
try{
    let userFavorite = await User.findOne({
        where:{id:idUser},
        include: [
            {
                model: Favorites
            }
        ]
    }
    );

    if(userFavorite.favorites.length === 0){
        let favorite =  await Favorites.create({likes:[idBreed]});
        await favorite.save();
        let user = await User.findByPk(idUser);
        user.setFavorites(favorite.id);
    
       res.status(201).json({data: "Favorites create"});
    }else{
        if(userFavorite.favorites[0].likes.filter(el=> el === (idBreed+"")).length > 0){
            res.status(201).json({data: "Favorites update" })
    }else{
        if(userFavorite.favorites[0]){
            let likes = userFavorite.favorites[0].likes;
            likes.push(idBreed);
            let idLike = userFavorite.favorites[0].id;
            await Favorites.update({likes:likes }, {where:{id:idLike}});
    
            res.status(201).json({data: "Favorites update" })
        }   
    }
}
}catch(err){
    res.status(404).json({data: err + ""})
}
};

//////////////////////  Get All Favorites   ////////////////////////////////


async function getAllFavorites(req,res){
const id = req.user;
try{
    const breedApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
    const breedMydb = await Breed.findAll();
    let user = await User.findOne({
        where:{id:id},
        include:{
            model: Favorites
        }
    })
    if(user.favorites.length > 0){
    const userFavorites = [user.favorites[0].id];
    userFavorites.push(user.favorites[0].likes);

    let breedFilter = [];
    breedApi.data.forEach(el => {
    let aux = 0;
        while(user.favorites[0].likes[aux] !== (el.id+"") && 
            aux < user.favorites[0].likes.length-1){
            aux++
        }
        if((el.id+"") === user.favorites[0].likes[aux]){
            breedFilter.push(el)
        }
    })
    breedMydb.forEach(el => {
        let aux = 0;
            while(user.favorites[0].likes[aux] !== el.id && 
                aux < user.favorites[0].likes.length -1){
                aux++
            }
            if(el.id === user.favorites[0].likes[aux]){
                breedFilter.push(el)
            }
        })

    userFavorites.push(breedFilter);
    res.status(200).json(userFavorites);
    
}else{
        const arrayEmpty = [false,[],[]]
        res.status(200).json(arrayEmpty)
    }
}catch(err){
    res.status(404).json({data: err + ""})
}
}


////////////////////// Delete one Favorite //////////////////

async function deleteFavorite(req,res){
const { idBreed, idFavorite } = req.body;
try{
    let favorite = await Favorites.findOne({where:{id:idFavorite}})
    let likes = favorite.likes.filter(el => String(el) !== String(idBreed))
    await Favorites.update({likes:likes},{where:{id:idFavorite}})
    res.status(200).json({data:"removed from favorites"})
}catch(err){
    res.status(404).json({data: err + ""})
}
};




module.exports = {
    newFavorite,
    getAllFavorites,
    deleteFavorite,
}