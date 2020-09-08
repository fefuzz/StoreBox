const { Airgram, Auth, prompt, toObject } = require('airgram')

let airg_contructor = async function (dir) { 
    try{
        const airgram = await new Airgram({
            apiId: process.env.APP_ID,
            apiHash: process.env.APP_HASH,
            command: process.env.TDLIB_COMMAND,
            logVerbosityLevel: 0,
            databaseDirectory: dir,
            useTestDc : false
        })

        console.log("Airgram: User Instance Initialized")

        return airgram;
    } catch (error) {
        console.log(error)
    }
 }


module.exports = {
    constructor : async (dir) => {return await airg_contructor(dir)}
}

