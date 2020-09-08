const express = require('express')
const app = express();
const path = require('path')

var cors = require('cors');

const registerUser = require('./routes/registerUser')
const loginUser = require('./routes/loginUser')
const checkAirgramLogin = require('./routes/checkAirgLogin')
const insertUserNumber = require('./routes/insertUserNumber')
const insertUserCode = require('./routes/insertUserCode')
const fileDownloader = require('./routes/fileDownloader')
const fileUploader = require('./routes/fileUploader')
const getFileList = require('./routes/getFileList')
const checkToken = require('./routes/checkJwtToken')

// parse application/json
app.use(express.json())

//Enable cors requests and enable header exposed
const corsOptions = {
  exposedHeaders: 'x-suggested-filename'
};
app.use(cors(corsOptions))

/* Register new User API */
app.use('/register', registerUser)
/* User Login Api */
app.use('/login', loginUser)
/* Check Telegram Authentication state Api */
app.use('/checkAirgramLogin', checkAirgramLogin)
/* Check User number Api */
app.use('/insertNumber', insertUserNumber)
/* Check User code Api */
app.use('/insertCode', insertUserCode)
/* File downloader Api*/
app.use('/downloadFile', fileDownloader)
/* File uploader Api */
app.use('/uploadFile', fileUploader)
/* Get File list for user Api */
app.use('/getFileList', getFileList)
/* Check Validity of token */
app.use('/checkToken', checkToken)


app.use(express.static('client/build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'client', 'build', 'index.html'))
})


app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port ', process.env.PORT);
});