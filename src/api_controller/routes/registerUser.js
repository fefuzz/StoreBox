var express = require('express');
var router = express.Router();
const path = require('path')

var fs = require('fs')

//Configuration json
const api_config = require('../../config/api_config.json');

//Used modules
const mongoController = require('../../mongodb/mongo_controller');
const airgController = require('../../airgram/airgram_controller');

/* Register new User API */
router.post('/', async (req, res) => {
  try{
    let username = req.body.username
    let password = req.body.password
    let check_password = req.body.repsw
    let email = req.body.email

    if(!username || !password || !check_password || !email){
      res.send({
        "status" : 416,
        "message" : "Some field Empty, please fill all the fields"
      })
      return;
    }

    if(password != check_password){
      res.send({
        "status" : 415,
        "message" : "Check Password field differ from Password field"
      })
      return;
    }

    const user = await mongoController.searchUserByUsername(username)
    const userMail = await mongoController.searchUserByEmail(email)

    if(user || userMail){
      res.send(
        {
          "status" : 411,
          "message" : "Username Or Email Already Exist"
        }
      )
      return
    }

    const mongoInsertion = await mongoController.insertNewUser(username, password, email, -1)

    if(!mongoInsertion){
      res.send(
        {
          "status" : 412,
          "message" : "Error in User insertion"
        }
      )
      return
    }

    let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)

    res.send({
      "status" : 200,
      "message" : "new User Registered",
      "user" : mongoInsertion
    });

    //Creating user Directory
    let userDirectory = await fs.promises.mkdir(path.join(__dirname, '../../../tmpUploads', username), { recursive: true })

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

});


module.exports = router;