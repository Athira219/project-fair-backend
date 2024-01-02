

const addMiddleware = (req,res,next)=>{
    console.log('middleware function ');
    next()

}

module.exports = addMiddleware