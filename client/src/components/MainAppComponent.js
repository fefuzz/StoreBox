import React, { useState, useEffect } from 'react'
import download from 'js-file-download';

import LoadingPage from './subComponents/loadingPageComponent'
import StartPage from './subComponents/startPageComponent'
import Register from './subComponents/registerComponent'
import VerifyPhone from './subComponents/verifyPhoneComponent'
import VerifyCode from './subComponents/verifyCodeComponent'
import MainPage from './subComponents/mainPageComponent'
import Login from './subComponents/loginComponent';

import '../styles/app.css'
import '../styles/globals.css'


import { 
    getUserList, 
    login, 
    downloadFile, 
    uploadFile, 
    checkFileStatus,
    register,
    verifyPhone,
    verifyCode,
    checkToken, checkAirgramAuth
  } from '../utils/axios_apis'


import {
  insertElemInTimeline,
  removeElemFromTimeline
} from '../utils/update_timeline'

import app_state_json from '../utils/app_state.json'

let sem_wait = 1 //for waiting the operations in list

function MainAppComponent() {

    const [ appState , setAppState] = useState(app_state_json)
    const [ queue, setQueue] = useState({"op_name" : "NO_OP"})

    let AppStateSetter = (workState) => {

      let appoState = {
        "render" : workState.render,
        "user" : workState.user,
        "file_list" : workState.file_list,
        "component_errors" : workState.component_errors
      }
      setAppState(appoState)
    }

    useEffect(() => { 
      //Hook to keep state of the logged in user after refresh of the application

      //Get application global state
      let workState = appState

      try{
        //Retrieve eventual user from the localstorage
        const loggedInUser = localStorage.getItem("user");
    
        //If not exist return the start page
        if(!loggedInUser){
          workState.render = "START_PAGE"
          AppStateSetter(workState)
          return
        }
    
        //If exist continue:
    
        //Parse the json
        const foundUser = JSON.parse(loggedInUser);
    
        //Call the api in the axios_apis util file to retrieve user session by token
        checkToken(foundUser.username, foundUser.token).then( async (responseToken) => {
          if(responseToken.data.status === 200){
            //If the status is 200 the token is not exiper yet, session active, retrieve user list
            let responseUserList = await getUserList(foundUser.username, foundUser.token)

            if(responseUserList.data.status === 200) {
              workState.file_list = responseUserList.data
            }

            workState.user = foundUser
            workState.render = "MAIN_PAGE"
          }
          else{
            //Else the token is expired, or other error, the user in the localStorage is cleared
            //And the page is setted to start page
            localStorage.clear("user")
            workState.render = "START_PAGE"
          }

          AppStateSetter(workState)
        
        })
      } catch(error){ //some error appear, go to start page and delete user in local storage
        workState.render = "START_PAGE"
        localStorage.clear("user")
        AppStateSetter(workState)
      }
    }, []) //[] means that only at first application loading the hook trigger, so only after a refresh

    useEffect(() => {

      if(queue.op_name === "NO_OP") return

      let downloadFileEffect = async () => {

        let objQueue = queue

        let downloadFileResponse = await downloadFile(objQueue.file_id, objQueue.username, objQueue.token)
        download(downloadFileResponse.data, downloadFileResponse.headers['x-suggested-filename'])

        let appoStateQueue = {"op_name" : "NO_OP"}
        setQueue(appoStateQueue)

        removeElemFromTimeline()

        sem_wait = 1
      }

      //Function to upload single file of a list of files, called by requestUploadFiles
      let reqSingleWithCallback = async (files, username, token, i) => {

        if(i === files.length){ //Last iteration of the function, no more files to upload
          setQueue({"op_name" : "NO_OP"})
          removeElemFromTimeline()
          //call method to update file list

          sem_wait = 1
          return;
        }

        let uploadFileResponse = await uploadFile(files[i], username, token)

        setTimeout(async function run() {
          let uploadStatus = await checkFileStatus(uploadFileResponse.data.file_id, token)

          if(uploadStatus.data.status === "UPLOADED"){
            reqSingleWithCallback(files,username,token, ++i)
            return;
          }
          setTimeout(run, 1000)
        },1000)
      }


      let uploadFileEffect = async () => {

        let objQueue = queue

        //call function to upload every file starting from the first (at position 0)
        await reqSingleWithCallback(objQueue.files, objQueue.username, objQueue.token, 0);
      }


      switch (queue.op_name){
        case "DOWNLOAD_FILE" : 
          downloadFileEffect()
          return
        case "UPLOAD_FILE" : 
          uploadFileEffect()
          return
        default :
          return
      }
    }, [queue])

    let insertInQueue = (objQueue) => {
      if(!objQueue || !objQueue.op_name || objQueue.op_name === "NO_OP") return //nothing to insert in queue

      //calling method to insert in timeline
      insertElemInTimeline(objQueue.op_name)

      setTimeout(function run () {
        //let workQueue = queue
        if(/*workQueue && workQueue.op_name === "NO_OP"*/ sem_wait === 1){
          sem_wait = 0
          setQueue(objQueue)
          return;
        }

        setTimeout(run, 1000)
      }, 0)
    }

    //file download function
    let requestFileDownload = (fileId) => {

      let workState = appState

      insertInQueue(
        {
          "op_name" : "DOWNLOAD_FILE", 
          "file_id" : fileId,
          "username" : workState.user.username,
          "token" : workState.user.token
        }
      )
    }

    //Function to request multiple upload of files
    let requestUploadFiles = async () => {
      let workState = appState //get application state

      let files = document.getElementById('fileSelected').files //get all files
      if(!files) return;

      insertInQueue(
        {
          "op_name" : "UPLOAD_FILE", 
          "username" : workState.user.username,
          "token" : workState.user.token,
          files
        }
      )

    }
    
    //Login function
    let requestLogin = async () => {    
      //get username and password
      let username = document.getElementById('usernameField').value
      let password = document.getElementById('passwordField').value

      let workState = appState
  
      //render loading component
      workState.render = "LOADING_PAGE"
      AppStateSetter(workState)
  
      //calling login and getUserList afther clicking on login button
      let response = await login(username, password)
      let responseAuth = await checkAirgramAuth(username)

      
      //Error in Login process: retry login 
      if(!response || !responseAuth) {
        workState.render = "LOGIN_PAGE"
        workState.component_errors.login = "General Error, Please Retry"
        AppStateSetter(workState)
        return
      }

      if(responseAuth.data.status === 440 || responseAuth.data.status === 441) {//waiting phone number or code
        workState.user = response.data.user
        workState.render = "VERIFY_PHONE_PAGE"
        AppStateSetter(workState)
        return
      }
  
      if(response.data.status !== 200 || responseAuth.data.status !== 200){
        //other possible errors like 420 from response or 442 from responseAuth
        workState.render = "LOGIN_PAGE"
        workState.component_errors.login = response.data.message
        AppStateSetter(workState)
        return
      }
  
      //User logged correctly in server and in airgram: retrieve file list
      let responseList = await getUserList(username, response.data.user.token)
  
      //Error in retrieving file list
      if(!responseList || responseList.data.status !== 200){
        workState.render = "LOGIN_PAGE"
        workState.component_errors.login = "Error in Retrieving user file list, Please Retry"
        AppStateSetter(workState)
        return
      }
  
      //all correct, set user and render main page
      localStorage.setItem('user', JSON.stringify(response.data.user))
      workState.file_list = responseList.data
      workState.user = response.data.user
      workState.render = "MAIN_PAGE"
      workState.component_errors.login = "NO_ERROR" //delete possible previus errors

      AppStateSetter(workState)
    }

    //logout function
    let requestLogout = () => {
      localStorage.clear('user');
      window.location.reload()
    }
  
    let setRegisterPage = () => {
      let workState = appState
      workState.render = "REGISTER_PAGE"
      AppStateSetter(workState)
    }
  
    let setLoginPage = () => {
      let workState = appState
      workState.render = "LOGIN_PAGE"
      AppStateSetter(workState)
    }
  
    //registration function
    let requestRegister = async () => {

      let workState = appState

      let checkBoxTherms = document.getElementById('ThermsConditions')
      let checkBoxPrivacy = document.getElementById('PrivacyPolicy')

      if(!checkBoxPrivacy.checked || !checkBoxTherms.checked){
        workState.component_errors.register = "Please Agree to Therms & Conditions and Privacy Policy"
        AppStateSetter(workState)
        return
      }

      let username = document.getElementById('usernameField').value
      let email = document.getElementById('emailField').value
      let password = document.getElementById('passwordField').value
      let checkPswField = document.getElementById('checkPswField').value
  
      //render loading component
      workState.render = "LOADING_PAGE"
      AppStateSetter(workState)
  
      let response = await register(username, email, password, checkPswField, checkBoxPrivacy.checked, checkBoxTherms.checked)
  
      if(response.data.status === 200){
        workState.user = response.data.user
        workState.component_errors.register = "NO_ERROR" //reset error
        workState.render = "VERIFY_PHONE_PAGE"

      }
      else{
        workState.render = "REGISTER_PAGE"
        workState.component_errors.register = response.data.message
      }

      AppStateSetter(workState)
    }
  
    //verify phone function
    let requestVerifyPhone = async () => {

      let workState = appState

      let telephone = document.getElementById('phoneField').value
      let prefix = document.getElementById('country-code').value

      let complete_number = `${prefix}${telephone}`

      console.log(complete_number)
  
      //render loading component
      workState.render = "LOADING_PAGE"
      AppStateSetter(workState)
  
      let response = await verifyPhone(workState.user.username, complete_number)
  
      //Error in request, render again the verify phone page
      if(response.data.status !== 200){
        workState.render = "VERIFY_PHONE_PAGE"
        workState.component_errors.verify_phone = response.data.message
        AppStateSetter(workState)
        return
      }

      workState.render = "VERIFY_CODE_PAGE"
      workState.component_errors.verify_phone = "NO_ERROR" //reset error
      AppStateSetter(workState)    
    }
  
    let requestVerifyCode = async () => {

      let workState = appState

      let code = document.getElementById('codeField').value
  
      //render loading component
      workState.render = "LOADING_PAGE"
      AppStateSetter(workState)
  
      let responseVerifyCode = await verifyCode(workState.user.username, code)
  
      //Error in request, render again the verify phone page with error message
      if(responseVerifyCode.data.status !== 200){
        workState.render = "VERIFY_PHONE_PAGE"
        workState.component_errors.verify_phone = responseVerifyCode.data.message
        AppStateSetter(workState)
        return
      }

      let responseUserList = await getUserList(responseVerifyCode.data.user.username, responseVerifyCode.data.user.token)
  
      workState.user = responseVerifyCode.data.user
      workState.render = "MAIN_PAGE"
      workState.file_list = responseUserList.data
      workState.component_errors.verify_code = "NO_ERROR" //reset error
      workState.component_errors.verify_phone = "NO_ERROR" //reset error
      localStorage.setItem('user', JSON.stringify(responseVerifyCode.data.user))

      AppStateSetter(workState)
    }
  
  
    //Function to update file name when selected in the upload form
    let updateUploadForm = () => {
      let formUpload = document.getElementById('fileSelected')
      let formLabel = document.getElementById('fileSelectedName')
  
      //Update label name
      if(formUpload.files && formLabel){
        formLabel.textContent = `${formUpload.files.length} File Selected`
      }
  
    }
    
    let renderPage = () => {

      let workState = appState

      if(workState.render === "START_PAGE"){
        return <StartPage 
                setRegisterPage={setRegisterPage}
                setLoginPage={setLoginPage}
              />
      }
      if(workState.render === "REGISTER_PAGE"){
        return <Register 
                requestRegister={requestRegister}
                error = {appState.component_errors.register}
              />
      }
      if(workState.render === "VERIFY_PHONE_PAGE") {
        return <VerifyPhone
                requestVerifyPhone={requestVerifyPhone}
                error = {appState.component_errors.verify_phone}
              />
      }
      if(workState.render === "VERIFY_CODE_PAGE") {
        return <VerifyCode 
                  requestVerifyCode={requestVerifyCode}
                  error = {appState.component_errors.verify_code}
              />
      }
      if(workState.render === "LOGIN_PAGE"){
        return <Login 
                  login={requestLogin}
                  error = {appState.component_errors.login}
                />
      }
      if(workState.render === "MAIN_PAGE" && workState.user) { 
        //Check if user is setted before render the MainPage
        return <MainPage 
                user={workState.user} 
                userList={workState.file_list}
                requestFileDownload={requestFileDownload}
                requestUploadFile={requestUploadFiles}
                requestLogout={requestLogout}
                updateUploadForm={updateUploadForm}
              />
      }
      else{
        return <LoadingPage />
      }
    }

    return (
        <div className='Main'>{renderPage()}</div>
    )
}

export default MainAppComponent
