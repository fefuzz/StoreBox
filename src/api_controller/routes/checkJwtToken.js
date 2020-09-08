var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')

//Configuration json
const api_config = require('../../config/api_config.json');

/* Check Telegram Authentication state Api */
router.post('/', async(req, res) => {
    try{
        const token = req.body.token

        if(!token) {
            res.send({
                "status" : 401,
                "message" : "User Unauthorized"
            })
            return;
        }

        //Verify token
        const decodedToken = await jwt.verify(token, api_config.jwt_secret)

        res.send({
            "status" : 200,
            "message" : "Valid Token"
        })
        return;
        
    } catch(error){
        res.send({
            "status" : 400,
            "message" : "Bad Request: Invalid or Expired Token"
        })
        return;
    }

})


module.exports = router;