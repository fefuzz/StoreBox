const { MongoClient } = require("mongodb")
const fs = require('fs')
const path = require('path')

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
    } catch(error) {
        console.log(error)
    }
}


let getUsers = async () => {
    try{
        let response = await collectionUsers.getAllUsers(mongoInstance)
        return response
    } catch(error){
        console.log(error)
        return null
    }
}


let connectionAndDirCreations = async () => {
    try{
        //Connection to mongoDb
        await mongoConnect()

        
        //Retrive list of all users
        let users = await getUsers()

        if(!users) return

        //creating folder for every user in the database if the directory not exist
        users.forEach(user => {
            fs.mkdirSync(path.join(__dirname, '..', '..', 'tmpUploads', user.username), { recursive: true })
            fs.mkdirSync(path.join(__dirname, '..', '..', 'usrDir', user.username), { recursive: true })
        });
        

        console.log("Mongo: Db Connected")
        console.log('Users Directories created')

    }catch(error){
        console.log(error)
    }   
  
}

connectionAndDirCreations();


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

