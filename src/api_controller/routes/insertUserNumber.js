var express = require('express');
var router = express.Router();

//Configuration json
const api_config = require('../../config/api_config.json');

//Used Modules
const airgController = require('../../airgram/airgram_controller');

/* Check User number Api */
router.post('/', async (req, res) => {

    try{
      let phoneNumber = req.body.telephone;
      let username = req.body.username;

      let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)
  
      const checkNumResponse = await workAirgInstance.api.setAuthenticationPhoneNumber({
        phoneNumber,
        settings: {
            _ : "phoneNumberAuthenticationSettings",
            allowFlashCall : false,
            allowSmsRetrieverApi : false,
            isCurrentPhoneNumber : false
        }
      })
  
      if(checkNumResponse.response._ === "error"){
        res.send({
          "status" : 414,
          "message" : checkNumResponse.response.message
        })

        let airgPause = await workAirgInstance.provider.pause()
        let airgDestroy = await workAirgInstance.provider.destroy()

        return
      }


      res.send({
        "status" : 200,
        "message" : "code sent"
      })

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