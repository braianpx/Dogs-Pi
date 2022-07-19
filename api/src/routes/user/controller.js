const bcrypt = require('bcrypt')
const { User } = require("../../db")


async function createUser(req,res) { 
try{
    const { username, password } = req.body;
    let passwordHash = await bcrypt.hash(password, 10)
    let user = await User.findOrCreate({
        where:{username:username},
        defaults:{
            password:passwordHash
        } 
    });
    if(user[1]){
        res.status(202).json({data: 'The user was created successfully'})
    }else{
        res.status(401).json({data: `The username ${username} already exists`})
    }
    
}catch(err){
    res.status(404).json({data: err + ""});
}
} 

module.exports = {
    createUser,

} 