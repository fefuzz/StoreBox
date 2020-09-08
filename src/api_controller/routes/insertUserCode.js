var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')

//Configuration json
const api_config = require('../../config/api_config.json');

//Used modules
const mongoController = require('../../mongodb/mongo_controller');
const airgController = require('../../airgram/airgram_controller');

router.post('/', async (req, res) => {
    try{
  
      let authCode = req.body.code;
      let username = req.body.username;


      let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)

      const checkCodeResponse = await workAirgInstance.api.checkAuthenticationCode({
        code : authCode
      })
  
      if(checkCodeResponse.response._ === "error"){
        res.send({
          "status" : 415,
          "message" : checkCodeResponse.response.message
        })

        let airgPause = await workAirgInstance.provider.pause()
        let airgDestroy = await workAirgInstance.provider.destroy()

        return;
      }
  
      /*
      Code inserted by user was correct, 
      insert telegram id in mongodb, 
      from now user is connected and verified on telegram
      */
  
      const userInfo = await workAirgInstance.api.getMe()
  
      const insertTgCodeResponse = await mongoController.insertTgUserCode(username, userInfo.response.id)

      const user = await mongoController.searchUserByUsername(username)

      if(!user) {
        res.send({
          "status" : 421,
          "message" : "Error in User Creation"
        })

        let airgPause = await workAirgInstance.provider.pause()
        let airgDestroy = await workAirgInstance.provider.destroy()

        return
      }

      //create user token
      const token = await jwt.sign(
        { id: user._id },
        api_config.jwt_secret,
        { expiresIn : 3600 }
      )

      if(!token) {
        res.send({
          "status" : 420,
          "message" : "Error in token Creation"
        })

        let airgPause = await workAirgInstance.provider.pause()
        let airgDestroy = await workAirgInstance.provider.destroy()

        return
      }

      user.token = token

      res.send({
        "status" : 200,
        "message" : "Correct Code",
        user
      })

      console.log("Api: User correctly enabled")

      let airgPause = await workAirgInstance.provider.pause()
      let airgDestroy = await workAirgInstance.provider.destroy()

      return
  
    } catch(error){
  
      console.log(error)
      res.send({
          "status" : 500,
          "message" : "Internal Server Error"
      })

      if(workAirgInstance){
        let airgPause = await workAirgInstance.provider.pause()
        let airgDestroy = await workAirgInstance.provider.destroy()
      }

      return 
  
    }
  })


module.exports = router;