var express = require('express');
var router = express.Router();

//Configuration json
const api_config = require('../../config/api_config.json');

//Used modules
const airgController = require('../../airgram/airgram_controller');

/* Check Telegram Authentication state Api */
router.post('/', async(req, res) => {
    try{
      
      let username = req.body.username;

      let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)

      let tgLoginResponse = await workAirgInstance.api.getAuthorizationState()
  
      if(tgLoginResponse.response._ != "authorizationStateReady"){
        res.send(
          {
            "status" : 414,
            "message" : tgLoginResponse.response._
          }
        )
        return
      }
  
      res.send({
        "status" : 200,
        "message" : "User Ready"
      })

      let airgPause = await workAirgInstance.provider.pause()
      let airgDestroy = await workAirgInstance.provider.destroy()
  
      return
  
    } catch(error) {
  
      console.log(error)
      res.send({
        "status" : 500,
        "message" : "Internal Server Error"
      })
  
    }
  
  })

  module.exports = router;