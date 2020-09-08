var express = require('express');
var router = express.Router();

//Configuration json
const api_config = require('../../config/api_config.json');

const path = require('path');
const fs = require('fs');

//Used modules
const authMiddleware = require('../auth')
const airgController = require('../../airgram/airgram_controller');


/* 
TODO REFACTOR API, develop new version with changes:
1- dinamic set of chatid (with fetch from user database or with param passed from frontend???)
2- develop try catch blocks and return better results 
*/


router.post('/', authMiddleware, async (req, res) => {  

  try{

    let username = req.body.username
    let fileId = req.body.file_id

    let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)

    let downloadResponse = await airgController.airgDownloader(workAirgInstance, username, fileId)

    if(downloadResponse){
      res.header("x-suggested-filename", downloadResponse.fileName)
      res.download(downloadResponse.filePath , downloadResponse.fileName)

      //Deleting all files in directory of user
      console.log('Cleaning usrDir Directory')
      fs.readdir(path.join(api_config.users_dir, username, 'documents'), (err, files) => {
        if (err) throw err;
      
        for (const file of files) {

          console.log('deleting file')
          fs.unlink(path.join(api_config.users_dir, username, 'documents', file), err => {
            if (err) throw err;
          });
        }
      });

    } else{
      res.send({
        "status" : 421,
        "message" : "Error on downloading file"
      })
    }

    let airgPause = await workAirgInstance.provider.pause()
    let airgDestroy = await workAirgInstance.provider.destroy()

    return

  } catch(error){

    console.log(error)
      res.send({
        "status" : 500,
        "message" : "Internal Server Error"
      })
      return

  }

  })



  module.exports = router;