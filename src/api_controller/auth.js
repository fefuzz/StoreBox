/*
    middleware authentication method that check jwt token of the requests for the protected routes
*/


const jwt = require('jsonwebtoken')
const api_config = require('../config/api_config.json')

let auth = async (req, res, next) => {
    try{
        const token = req.header('x-auth-token')

        if(!token) {
            res.send({
                "status" : 401,
                "message" : "User Unauthorized"
            })
            return;
        }

        //Verify token
        const decodedToken = await jwt.verify(token, api_config.jwt_secret)

        //calling next function
        next()
        
    } catch(error){
        console.log(error)
        res.send({
            "status" : 400,
            "message" : "Bad Request: Invalid or Expired Token"
        })
        return;
    }

}


module.exports = auth;