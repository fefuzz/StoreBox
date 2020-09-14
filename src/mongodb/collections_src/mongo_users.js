const bcrypt = require('bcryptjs')


async function getAllUsers (client) {
  try {

    const database = client.db('StoreBox')
    const collection = database.collection('users')

    let result = await collection.find({})

    return result

  } catch(error){
    console.log(error)
    return null
  }
}

async function searchUserByUsername(client, username) {
    try {

      const database = client.db('StoreBox');
      const collection = database.collection('users');
  
      // Query for a movie that has the title 'Back to the Future'
      const query = { username: username };
      const user = await collection.findOne(query);
  

      if(!user) return null

      return (
        {
          "id" : user._id,
          "username" : user.username,
          "email" : user.email,
          "telegram_id" : user.telegram_id
        }
      )
    } catch(error) {
      console.log(error);
      return null;
    }
  }


async function searchUserByEmail(client, email) {
  try {

    const database = client.db('StoreBox');
    const collection = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    const query = { email };
    const user = await collection.findOne(query);


    if(!user) return null

    return (
      {
        "id" : user._id,
        "username" : user.username,
        "email" : user.email,
        "telegram_id" : user.telegram_id
      }
    )
  } catch(error) {
    console.log(error);
    return null;
  }
}

async function userLogin(client, username, password){
  try {
    const database = client.db('StoreBox');
    const collection = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    const query = { username };
    const user = await collection.findOne(query);

    //user not exist
    if(!user) return false

    //check if submitted psw is equal to hashed psw in db by bcrypt compare method
    const compare = await bcrypt.compare(password, user.password);
    if(!compare) return false
    
    //user exist and password is correct, login
    return (
      {
        "id" : user._id,
        "username" : user.username,
        "email" : user.email,
        "telegram_id" : user.telegram_id
      }
    )

  } catch(error){
    console.log(error)
    return false;
  }
}

let insertNewUser = async (client, username, password, email, tgUserCode) => {

  try {

    // Generating salt and psw hash
    const generatedSalt = await bcrypt.genSalt(16)
    const hashedPsw = await bcrypt.hash(password, generatedSalt)
    

    const database = client.db('StoreBox');
    const collection = database.collection('users');

    const query = {username, email, password : hashedPsw, telegram_id : tgUserCode}

    const insertion = await collection.insertOne( query )

    if(!insertion) return false

    let retUser = {
      "id" : insertion.ops[0]._id,
      "username" : insertion.ops[0].username,
      "email" : insertion.ops[0].email,
      "telegram_id" : insertion.ops[0].telegram_id
    }

    console.log("Mongo: new User Inserted")

    return retUser

  } catch(error) {

    console.log(error)
    return false

  }

}


let insertUserTgCode = async (client, username, tgUserCode) => {
  try {
    const database = client.db('StoreBox');
    const collection = database.collection('users');

    const updateRes = await collection.updateOne( 
      {
        "username" : username,
        "telegram_id" : -1
      },
      { $set : { telegram_id : tgUserCode} }
    )

    return true

  } catch(error) {
    console.log(error)
    return false
  }
}

  module.exports = {
    searchUserByUsername : async (mInstance, user) => {return await searchUserByUsername(mInstance, user)},
    searchUserByEmail : async (mInstance, email) => {return await searchUserByEmail(mInstance, email)},
    userLogin : async (mInstance, user, psw) => {return await userLogin(mInstance, user, psw)},
    insertNewUser : async (mInstance, username, psw, email, tgUserCode) => { return await insertNewUser(mInstance, username, psw, email, tgUserCode)},
    insertUserTgCode : async(mInstance, username, tgUserCode) => {return await insertUserTgCode(mInstance, username, tgUserCode)},
    getAllUsers : async(mInstance) => {return await getAllUsers(mInstance)}
  }