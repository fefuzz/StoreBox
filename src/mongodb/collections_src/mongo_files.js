var ObjectID = require('mongodb').ObjectID;


let insertFile = async (client, username, filename, filetype, status) => {
    try{
        const database = client.db('StoreBox');
        const collection = database.collection('files');

        const query = { username, filename, filetype, status }

        const insertion = await collection.insertOne( query )


        if(!insertion) return false

        let retFile = {
            "id" : insertion.ops[0]._id,
            "filename" : insertion.ops[0].filename
        }

        console.log("Mongo: new File Inserted")

        return retFile

    } catch (error) {
        console.log(error)
        return false
    }

}

let updateStatus = async (client, fileId, status) => {

    try {
        const database = client.db('StoreBox');
        const collection = database.collection('files');

        const updateRes = await collection.updateOne( 
        {
            "_id" : fileId
        },
        { $set : { status } }
        )

        return true

    } catch(error) {
        console.log(error)
        return false
    }

}


let checkStatus = async (client, fileId) => {
    try{
        const database = client.db('StoreBox');
        const collection = database.collection('files');

        const query = { _id : new ObjectID(fileId) }

        const search = await collection.findOne(query)

        return search

    } catch(error){
        console.log(error)
        return false
    }
}


let getList = async (client, username) => {
    try{



        const database = client.db('StoreBox');
        const collection = database.collection('files');

        const query = { username }

        const search = await collection.find(query).toArray()

        console.log("Mongo: User File List Retrieved")

        return search

    } catch (error){
        console.log(error)
        return false
    }
}


module.exports = {
    insertFile : async (client, username, fileName, fileType, status) => {return await insertFile(client, username, fileName, fileType, status)},
    updateFileStatus : async (client, fileId, status) => {return await updateStatus(client, fileId, status)},
    checkUploadStatus : async (client, fileId) => {return await checkStatus(client, fileId)},
    getFileList : async(client, username) => {return await getList(client, username)},
}