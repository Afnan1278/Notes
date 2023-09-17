const express = require('express');
const expressRoutes = express.Router();
const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');

const jwtAuth = require('../controllers/jwtAuth');
const logger = require('../utils/logger');
/**
 * api payload output format
 */
const payload = (data,success,message)=>{
    if(success)
        return {success:true,data:data,message:message};
    else
        return {success:false,message:message};
}
/**
 * bind routing
 * @param {*} route 
 */
const bindRoute = (routes)=>{
    for(let cName in routes){
        routes[cName].forEach((route)=>{
            
            let method = route.m.toLowerCase().trim();
            
            // middle middleware
            let jwtAuthentication = (route.r && route.r.length)? jwtAuth.withAuth(route.r): (jwtAuth.withoutAuth);
            
            expressRoutes[method](route.p,jwtAuthentication,async(req,res)=>{
                // JWT param
                let authUser = (req.authUser?req.authUser:null)
                let _error = null
                try{       
                    // load model dynamically - as define in routes json
                    let controller = require(`../controllers/${cName}`);
                    
                    // append jwt param to every request 
                    let params = {};
                    if(method == 'get')
                        params = {...req.query,authUser:authUser};
                        
                    else if(method == 'post')
                        params = {...req.body,authUser:authUser};
                    else if(method == 'put')
                        params = {...req,authUser:authUser};
                    else if(method == 'delete')
                    params = {...req.body,authUser:authUser};

                    // call model action method
                    
                    let result = await controller[route.a](params);
                
                    res.send(payload(result,true,''));
                    
                    
                    
                    
                    
                }catch(error){
                    res.status(400);
                    res.send(payload('',false,error.toString()));      
                    _error = error;
                    logger.log(`error: ${_error}`)
                }
                finally{
                //    logger.log(`req path: ${route.p}`)
                }
            })
        });    
    }
} 

// auth routes
bindRoute(authRoutes);

// normal routes
bindRoute(publicRoutes);


module.exports = expressRoutes;