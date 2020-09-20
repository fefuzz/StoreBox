var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')

//Configuration json
const api_config = require('../../config/api_config.json');

//Used Modules
const mongoController = require('../../mongodb/mongo_controller');
const airgController = require('../../airgram/airgram_controller');

/* User Login Api */
router.post('/', async (req, res) => {

    try{
  
      let username = req.body.username;
      let password = req.body.password;
  
      const user = await mongoController.userLogin(username, password)
  
      if(!user){
        res.send({
          "status" : 410,
          "message": "Wrong Username or Password"
        })
        return;
      }
  
      /*
      if(user.telegram_id === -1){
        res.send({
          "status" : 417,
          "message" : "User Not Logged on Airgram",
          user
        })
        return
      }
      */

      //create user token
      const token = await jwt.sign(
        { id: user._id },
        api_config.jwt_secret,
        { expiresIn : "24h" }
      )

      if(!token) {
        res.send({
          "status" : 420,
          "message" : "Error Authorizing User"
        })
        return
      }

      user.token = token

      res.send({
        "status" : 200,
        "message" : "User Logged",
        user
      })

      console.log("Api: User correctly enabled")
      return
  
    } catch(error){
      console.log(error)
      res.send({
        "status" : 500,
        "message" : "Internal Server Error"
      })

      return
    }
  
  });


  module.exports = router;