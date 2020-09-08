const { Airgram, Auth, prompt, toObject } = require('airgram');
const { airgInit } = require('../airgram_controller');
const path = require('path')

let airgUploader = async function (airgram, fileName, fileId, username) {

  let user = await airgram.api.getMe()
  
  const { response: chats } = await airgram.api.getChats({
    limit: 1,
    offsetChatId: user.response.id,
    offsetOrder: '9223372036854775807'
  })

  let myMessage = await airgram.api.sendMessage({
    chatId: user.response.id,
    replyToMessageId: 0,
    inputMessageContent: {
      _ : "inputMessageDocument",
      document : {
        _ : 'inputFileLocal',
        path : path.join(__dirname, `../../../tmpUploads`, username, fileName)
      },
      caption : {
        _ : "formattedText",
        text : `#${fileId}`
      }
    }
  })

  return myMessage
}


module.exports = {
  uploader : async (airg, fileName, fileId, username) => {return await airgUploader(airg, fileName, fileId, username)}
}