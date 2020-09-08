const { MongoClient } = require("mongodb")

const collectionUsers = require('./collections_src/mongo_users')
const collectionFiles = require('./collections_src/mongo_files')

//load configuration file
const mongoConfig = require('../config/mongo_config.json');


// Replace the uri string with your MongoDB deployment's connection string.
const uri = mongoConfig.uri;

const mongoInstance = new MongoClient(uri, { useUnifiedTopology: true });

let mongoConnect = async () => {
    try{
        await mongoInstance.connect();
        console.log("Mongo: Db Connected")
    } catch(error) {
        console.log(error)
    }
}

mongoConnect();

module.exports = {
    searchUserByUsername : async (username) => {return await collectionUsers.searchUserByUsername(mongoInstance, username)},
    searchUserByEmail : async (email) => {return await collectionUsers.searchUserByEmail(mongoInstance, email)},
    userLogin : async (username, password) => {return await collectionUsers.userLogin(mongoInstance, username, password)},
    insertNewUser : async (username, password, email, tgUserCode) => {return await collectionUsers.insertNewUser(mongoInstance, username, password, email, tgUserCode)},
    insertTgUserCode : async (username, tgUserCode) => { return await collectionUsers.insertUserTgCode(mongoInstance, username, tgUserCode)},

    insertNewFile : async (username, fileName, fileType, status) => {return await collectionFiles.insertFile(mongoInstance, username, fileName, fileType, status)},
    updateFileStatus : async (fileId, status) => {return await collectionFiles.updateFileStatus(mongoInstance, fileId, status)},
    checkUploadStatus : async (fileId) => {return await collectionFiles.checkUploadStatus(mongoInstance, fileId)},
    getFileList : async(username) => {return await collectionFiles.getFileList(mongoInstance, username)},

}

