
//import jwt

const jwt = require('jsonwebtoken')

const jwtMilddleware = (req,res,next)=>{
    console.log('jwt middleware function');
    //split method => baear cannot need,if we use split method they remove bearer
    const tocken = req.headers['authorization'].split(' ')[1]
    console.log(tocken);
    
    try{
        //vertify return an object which contains secrete info & the iat which is the additional info(time of issue of jwt tocken)
       const jwtResponse = jwt.verify(tocken,'superkey1234')
       console.log(jwtResponse);
       //req.payload its only a variable
       req.payload = jwtResponse.userId
       next()
    }
    catch(err){
        res.status(401).json('Authorization failed... Please login')
    }

}
module.exports = jwtMilddleware