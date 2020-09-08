const airgInit = require('./airgram_src/airgram_constructor')
const airgDownloader = require('./airgram_src/airgram_downloader')
const airgUploader = require('./airgram_src/airgram_uploader')


module.exports = {
    airgInit : async (userDir) => { return await airgInit.constructor(userDir) },

    airgDownloader : async (airgInstance, username, fileId) => { return await airgDownloader.downloader(airgInstance, username, fileId)},
    airgUploader : async (airgInstance, filename, fileId, username) => { return await airgUploader.uploader(airgInstance, filename, fileId, username)},
}