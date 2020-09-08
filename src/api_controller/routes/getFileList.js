var express = require('express')
var router = express.Router()

//Configuration json
const api_config = require('../../config/api_config.json')

//Used modules
const authMiddleware = require('../auth')
const mongoController = require('../../mongodb/mongo_controller')

/* Check Telegram Authentication state Api */
router.post('/', authMiddleware, async (req, res) => {
    try{

        let username = req.body.username

        let getFileList = await mongoController.getFileList(username)

        res.send({
            "status" : 200,
            "file_list" : getFileList
        })

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