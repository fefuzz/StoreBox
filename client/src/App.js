import React, { useState, useEffect } from 'react'
import download from 'js-file-download';

import './styles/app.css'
import './styles/globals.css'

import LoadingPage from './components/loadingPageComponent'
import StartPage from './components/startPageComponent'
import Register from './components/registerComponent'
import VerifyPhone from './components/verifyPhoneComponent'
import VerifyCode from './components/verifyCodeComponent'
import MainPage from './components/mainPageComponent'
import Login from './components/loginComponent';

import { 
        getUserList, 
        login, 
        downloadFile, 
        uploadFile, 
        checkFileStatus,
        register,
        verifyPhone,
        verifyCode,
        checkToken
      } from './utils/axios_apis'

function App() {

  const [ authState, setAuth ] = useState('LOADING_PAGE')
  const [ userObj, setUser] = useState({})
  const [ userFileList, setFileList] = useState({ 'file_list' : [], 'status' : 200 })
  const [ inUseApi, setInUse] = useState('FREE')


  useEffect(() => { 
    //Hook to keep state of the logged in user after refresh of the application

    //Retrieve eventual user from the localstorage
    const loggedInUser = localStorage.getItem("user");

    //If not exist return the start page
    if(!loggedInUser){
      setAuth('START_PAGE')
      return
    }

    //If exist continue:

    //Parse the json
    const foundUser = JSON.parse(loggedInUser);

    //Call the api in the axios_apis util file to retrieve user session by token
    checkToken(foundUser.username, foundUser.token).then( (responseToken) => {
      if(responseToken.data.status === 200){
        //If the status is 200 the token is not exiper yet, session active, retrieve user list
        getUserList(foundUser.username, foundUser.token).then((responseUserList) => {
          if(responseUserList.data.status === 200) setFileList(responseUserList.data)
        })
        setUser(foundUser);
        setAuth('MAIN_PAGE')
      }
      else{
        //Else the token is expired, or other error, the user in the localStorage is cleared
        //And the page is setted to start page
        localStorage.clear("user")
        setAuth('START_PAGE')
      }
    })
  }, []) //[] means that only at first application loading the hook trigger, so only after a refresh



  //Login function
  let requestLogin = async () => {

    //get username and password
    let username = document.getElementById('usernameField').value
    let password = document.getElementById('passwordField').value

    //render loading component
    setAuth('LOADING_PAGE')

    //calling login and getUserList afther clicking on login button
    let response = await login(username, password)

    //Error in Login process: retry login 
    if(!response) {
      setAuth('START_PAGE')
      return
    }

    if(response.data.status === 417){
      setUser(response.data.user)
      setAuth('VERIFY_PHONE_PAGE')
      return
    }

    if(response.data.status !== 200){
      setAuth('LOGIN_PAGE')
      return
    }

    //User logged correctly in server and in airgram: retrieve file list
    let responseList = await getUserList(username, response.data.user.token)

    //Error in retrieving file list
    if(!responseList || responseList.data.status !== 200){
      setAuth('LOGIN_PAGE')
      return
    }

    //all correct, set user and render main page
    localStorage.setItem('user', JSON.stringify(response.data.user))
    setFileList(responseList.data)
    setUser(response.data.user)
    setAuth('MAIN_PAGE')

  }

  //file download function
  let requestFileDownload = async (fileId) => {
    setInUse('IN_USE')
    let downloadFileResponse = await downloadFile(fileId, userObj.username, userObj.token)
    download(downloadFileResponse.data, downloadFileResponse.headers['x-suggested-filename'])
    setInUse('FREE')
  }

  //file upload function
  let requestUploadFile = async () => {

    let file = document.getElementById('fileSelected').files[0]
    if(!file) return; 

    setInUse('IN_USE')
    
    let uploadFileResponse = await uploadFile(file, userObj.username, userObj.token)
    
    let checkTimer = setInterval( async () => {
        let uploadStatus = await checkFileStatus(uploadFileResponse.data.file_id, userObj.token)

        if(uploadStatus.data.status === "UPLOADED"){
            clearInterval(checkTimer)

            //Uploading State: User File List, Permit to Update FileList Component

            //Get Old State
            let newFileListArray = userFileList.file_list
            //Add new File Response
            newFileListArray.push(uploadStatus.data)
            //Construct new Json
            let newFileListJson = {
                "status" : 200,
                "file_list" : newFileListArray
            }
            //Insert New Json as New State
            setFileList(newFileListJson)

        }
    }, 1000)

    setInUse('FREE')
  }


  //logout function
  let requestLogout = () => {
    localStorage.clear('user');
    window.location.reload()
  }

  let setRegisterPage = () => {
    setAuth('REGISTER_PAGE')
  }

  let setLoginPage = () => {
    setAuth('LOGIN_PAGE')
  }

  //registration function
  let requestRegister = async () => {
    let username = document.getElementById('usernameField').value
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    let checkPswField = document.getElementById('checkPswField').value

    //render loading component
    setAuth('LOADING_PAGE')

    let response = await register(username, email, password, checkPswField)

    if(response.data.status === 200){
      setUser(response.data.user)
      setAuth('VERIFY_PHONE_PAGE')
    }
    else{
      setAuth('REGISTER_PAGE')
    }
  }

  //verify phone function
  let requestVerifyPhone = async () => {
    let telephone = document.getElementById('phoneField').value

    //render loading component
    setAuth('LOADING_PAGE')

    let response = await verifyPhone(userObj.username, telephone)

    //Error in request, render again the verify phone page
    if(response.data.status !== 200){
      setAuth('VERIFY_PHONE_PAGE')
      return
    }

    setAuth('VERIFY_CODE_PAGE')
  }

  let requestVerifyCode = async () => {
    let code = document.getElementById('codeField').value

    //render loading component
    setAuth('LOADING_PAGE')

    let responseVerifyCode = await verifyCode(userObj.username, code)

    //Error in request, render again the verify phone page
    if(responseVerifyCode.data.status !== 200){
      setAuth('VERIFY_PHONE_PAGE')
      return
    }

    setUser(responseVerifyCode.data.user)
    localStorage.setItem('user', responseVerifyCode.data.user)
    setAuth('MAIN_PAGE')
  }



  let render = () => {
    if(authState === 'START_PAGE'){
      return <StartPage 
              setRegisterPage={setRegisterPage}
              setLoginPage={setLoginPage}
            />
    }
    if(authState === 'REGISTER_PAGE'){
      return <Register 
              requestRegister={requestRegister}
            />
    }
    if(authState === 'VERIFY_PHONE_PAGE') {
      return <VerifyPhone
              requestVerifyPhone={requestVerifyPhone}
            />
    }
    if(authState === 'VERIFY_CODE_PAGE') {
      return <VerifyCode 
                requestVerifyCode={requestVerifyCode}
            />
    }
    if(authState === 'LOGIN_PAGE'){
      return <Login 
                login={requestLogin}
              />
    }
    if(authState === 'MAIN_PAGE' && userObj) { 
      //Check if user is setted before render the MainPage
      return <MainPage 
              user={userObj} 
              userList={userFileList} 
              inUseApi={inUseApi}
              requestFileDownload={requestFileDownload}
              requestUploadFile={requestUploadFile}
              requestLogout={requestLogout}
            />
    }
    else{
      return <LoadingPage />
    }
  }


  return (
    <div className='Main'>{render()}</div>
  );
}

export default App;
