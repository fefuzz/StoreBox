const { Airgram, Auth, prompt, toObject } = require('airgram')

let airgDownloader = async function (airgram, username, fileId) {

  try{
    let user = await airgram.api.getMe()

    const { response: chats } = await airgram.api.getChats({
      limit: 1,
      offsetChatId: user.response.id,
      offsetOrder: '9223372036854775807'
    })

    let searchMessage = await airgram.api.searchChatMessages({
        chatId: user.response.id,
        filter: {
            _ : "searchMessagesFilterDocument"
        },
        fromMessageId: 0,
        limit: 1,
        offset: 0,
        query : `#${fileId}`,
        senderUserId: 0
    })

    let downloadMessage = await airgram.api.getMessage({
        chatId: user.response.id,
        messageId: searchMessage.response.messages[0].id
    })

    let downloadFile = await airgram.api.downloadFile({
        fileId: downloadMessage.response.content.document.document.id,
        limit: 0,
        offset: 0,
        priority: 32,
        synchronous: true
    })

    //getting file name and file path to return as result
    let fileName = downloadMessage.response.content.document.fileName
    let filePath = downloadFile.response.local.path


    return ({
      fileName,
      filePath
    })
  } catch (error){
    console.log(error)
    return false
  }
}


module.exports = {
  downloader : async (airg, username, fileId) => {return await airgDownloader(airg, username, fileId)}
}