var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const multer  = require('multer');

/* Multer configuration */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, `../../../tmpUploads/`, req.body.username));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  })
  var upload = multer({ storage : storage })
  /* Multer configuration */

//Configuration json
const api_config = require('../../config/api_config.json');

//Used modules
const authMiddleware = require('../auth')
const airgController = require('../../airgram/airgram_controller');
const mongoController = require('../../mongodb/mongo_controller');

router.post('/', authMiddleware, upload.single('file'), async (req, res) => {  
  try{
    let username = req.body.username

    let workAirgInstance = await airgController.airgInit(api_config.users_dir+username)

    let insertFileResponse = await mongoController.insertNewFile(username, req.file.originalname, req.file.mimetype, "UPLOADING")

    let uploadTelegramResponse = await airgController.airgUploader(workAirgInstance, req.file.originalname, insertFileResponse.id, username)

    res.send({
      "status" : 200,
      "message" : "Upload In Progress",
      "file_id" : insertFileResponse.id
    })

    console.log('Upload Response')

    console.log(uploadTelegramResponse)

    workAirgInstance.on("updateMessageSendSucceeded", async (message)=>{

      //File uploading Finished, close airgram connection and updateFileStatus on mongoDb collection
      let updateStatusResponse = await mongoController.updateFileStatus(insertFileResponse.id, 'UPLOADED')

      //Deleting all files in directory of user
      console.log('Cleaning Tmp Directory')
      fs.readdir(path.join(__dirname, `../../../tmpUploads/`, req.body.username), (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(__dirname, `../../../tmpUploads/`, req.body.username, file), err => {
            if (err) throw err;
          });
        }
      });

      console.log('File Uploaded Correctly')

      let airgPause = await workAirgInstance.provider.pause()
      let airgDestroy = await workAirgInstance.provider.destroy()

    })

    return

  } catch (error){

    console.log(error)
      res.send({
        "status" : 500,
        "message" : "Internal Server Error"
      })
      return
  }

  })


router.post('/checkStatus', authMiddleware, async (req, res) => {  

  let fileId = req.body.file_id;

  let searchResponse = await mongoController.checkUploadStatus(fileId)

  res.send(searchResponse)

})
  



  module.exports = router;