const jwt = require('jsonwebtoken');


async function validateUser(req,res,next){
try{    
const authorization = req.get('Authorization')
let token = null;

if(authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7);
}

const decodedToken = jwt.verify(token, process.env.SECRETT)

if(!token || !decodedToken.id ){
    res.status(401).json({data: "token invalid or missing"}).redirect('/home/logIn')
}

next();

}
catch(err){
    res.status(404).json({data: err + ""})
}
};


module.exports = validateUser;

