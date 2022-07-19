const { Favorites, User } = require('../../db');



async function newFavorite(req,res){
const { idBreed, idUser } = req.body;
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
    if(userFavorite.favorites[0]){
        let likes = userFavorite.favorites[0].likes;
        likes.push(idBreed);
        let idLike = userFavorite.favorites[0].id;
        await Favorites.update({likes:likes }, {where:{id:idLike}});

        res.status(201).json({data: "Favorites update" })
    }else{
        let favorite =  await Favorites.create({likes:[idBreed]});
        await favorite.save();
        let user = await User.findByPk(idUser);
        user.setFavorites(favorite.id);
    
       res.status(201).json({data: "Favorites create"});
    }
}catch(err){
    res.status(404).json({data: err + ""})
}
};

//////////////////////////////////////////////////////


async function getAllFavorites(req,res){
const { username } = req.params;
try{
    console.log(username);
    let user = await User.findOne({
        where:{username:username},
        include:{
            model: Favorites
        }
    })
    console.log("pepe")
    res.status(200).json(user.favorites[0].likes)
}catch(err){
    res.status(404).json({datas: err + ""})
} 
}

module.exports = {
    newFavorite,
    getAllFavorites
}