const jwt = require('jsonwebtoken')
function auth(req, res, next){
    const  jwtToken = req.header('Authorization')
    if(!jwtToken) return res.status(401).send('UnAuthorized');
    try
    {
       const payload = jwt.verify(jwtToken,'SecretWordToken')
       req.user = payload;
       next()
    }
    catch (e){

    }    
}

module.exports = auth