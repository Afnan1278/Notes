const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db')
const modelUser = db.model('user');
//const {API_GROUPS} = require("../const");
/**
 * for authenticating role base urls
 */
 const withAuth = (roles) => {
    return (req, res, next)=>{
        const authHeader = req.headers['authorization'];
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            
            jwt.verify(token, process.env.JWT_SECRETE,{}, (err, user) => {
                //check api roles against user role       
                if (err || roles.indexOf(user.role) == -1) {
                    return res.sendStatus(403);
                }
                // assign token data as authUser in each request
                req.authUser = {...user,token:token};
                next();
            });
        } else {
            res.sendStatus(401);
        }    
    }
};

/**
 * for public urls
 */
const withoutAuth = (req, res, next) => {
    next();
}

// create secure token using user info
const sign = (params)=>{
    return jwt.sign(params, process.env.JWT_SECRETE,{expiresIn:'7d'});
}

const verify = async(token)=>{
    return await jwt.verify(token, process.env.JWT_SECRETE);
}



module.exports = {withAuth,withoutAuth,sign,verify};