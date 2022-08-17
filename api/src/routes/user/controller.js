const bcrypt = require('bcrypt')
const { User } = require("../../db")
const jwt = require('jsonwebtoken');

/////////////////////    Register    //////////////////////

async function createUser(req,res) { 
try{
    const { username, password } = req.body;
    if(!username||!password) res.status(401).json({data:"missing data"})

    let passwordHash = await bcrypt.hash(password, 10)
    let user = await User.findOrCreate({
        where:{username:username},
        defaults:{
            password:passwordHash
        } 
    });
    if(user[1]){
        res.status(201).json({data: 'The user was created successfully'})
    }else{
        res.status(401).json({data: `The username ${username} already exists`})
    }
    
}catch(err){
    res.status(404).json({data: err + ""});
}
} 

/////////////////// LogIn /////////////////////////

async function logIn(req,res){
const { username, password } = req.body;
try{
let user = await User.findOne({where:{username:username}})

let confirmPassword = user === null ? false : await bcrypt.compare(password, user.password);

if(!(user && confirmPassword)){
res.status(404).json({data: "Invalid username or password"})
}else{

const userForToken = {
    id: user.id,
    username: username
};
const token = jwt.sign(userForToken, process.env.SECRETT, {
    expiresIn: 60 * 60 * 24 * 3,
  });

res.send({username: user.username, token});
}
}catch(err){
res.status(404).json({data: err + ""})
}
};



///////////////////// Delete user ////////////////////////


async function deleteUser(req,res){
const { username } = req.body;
req.user = false;
try{
    await User.destroy({where:{username:username}})
    res.status(200).json({data:"The user was successfully deleted"})
}
catch(err){
    res.status(404).json({data: err + ""})
}
}


module.exports = {
    createUser,
    logIn,
    deleteUser

} 