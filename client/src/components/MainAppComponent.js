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
    checkToken
  } from '../utils/axios_apis'

import app_state_json from '../utils/app_state.json'

function MainAppComponent() {

    const [ appState , setAppState] = useState(app_state_json)

    let AppStateSetter = (workState) => {

      let appoState = {
        "render" : workState.render,
        "user" : workState.user,
        "file_list" : workState.file_list,
        "sem_api" : workState.sem_api,
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
          checkToken(foundUser.username, foundUser.token).then( (responseToken) => {
            if(responseToken.data.status === 200){
              //If the status is 200 the token is not exiper yet, session active, retrieve user list
              getUserList(foundUser.username, foundUser.token).then((responseUserList) => {
                if(responseUserList.data.status === 200) {
                  workState.file_list = responseUserList.data
                }
              })
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
        } catch(error){
          workState.render = "LOADING_PAGE"
          AppStateSetter(workState)
        }
      }, []) //[] means that only at first application loading the hook trigger, so only after a refresh
    
    
    
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
    
        //Error in Login process: retry login 
        if(!response) {
          workState.render = "START_PAGE"
          workState.component_errors.login = "General Error, Please Retry"
          AppStateSetter(workState)
          return
        }
    
        if(response.data.status === 417){
          workState.user = response.data.user
          workState.render = "VERIFY_PHONE_PAGE"
          AppStateSetter(workState)
          return
        }
    
        if(response.data.status !== 200){
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
    
      //file download function
      let requestFileDownload = async (fileId) => {

        let workState = appState
        workState.sem_api = "IN_USE"
        AppStateSetter(workState)

        let downloadFileResponse = await downloadFile(fileId, workState.user.username, workState.user.token)
        download(downloadFileResponse.data, downloadFileResponse.headers['x-suggested-filename'])
        
        workState.sem_api = "FREE"
        AppStateSetter(workState)

      }
    
      //file upload function
      let requestUploadFile = async () => {

        let workState = appState
    
        let file = document.getElementById('fileSelected').files[0]
        if(!file) return; 
    
        workState.sem_api = "IN_USE"
        AppStateSetter(workState)
        
        let uploadFileResponse = await uploadFile(file, workState.user.username, workState.user.token)
        
        let checkTimer = setInterval( async () => {
            let uploadStatus = await checkFileStatus(uploadFileResponse.data.file_id, workState.user.token)
    
            if(uploadStatus.data.status === "UPLOADED"){
                clearInterval(checkTimer)
    
                //Uploading State: User File List, Permit to Update FileList Component
    
                //Get Old State
                let newFileListArray = workState.file_list.file_list
                //Add new File Response
                newFileListArray.push(uploadStatus.data)
                //Construct new Json
                let newFileListJson = {
                    "status" : 200,
                    "file_list" : newFileListArray
                }
                //Insert New Json as New State and Render page again
                workState.sem_api = "FREE"
                workState.file_list = newFileListJson
                AppStateSetter(workState)
            }
        }, 1000)
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
    
        //render loading component
        workState.render = "LOADING_PAGE"
        AppStateSetter(workState)
    
        let response = await verifyPhone(workState.user.username, telephone)
    
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
          workState.component_errors.verify_code = responseVerifyCode.data.message
          AppStateSetter(workState)
          return
        }
    
        workState.user = responseVerifyCode.data.user
        workState.render = "MAIN_PAGE"
        workState.component_errors.verify_code = "NO_ERROR" //reset error
        localStorage.setItem('user', responseVerifyCode.data.user)

        AppStateSetter(workState)
      }
    
    
      //Function to update file name when selected in the upload form
      let updateUploadForm = () => {
        let formUpload = document.getElementById('fileSelected')
        let formLabel = document.getElementById('fileSelectedName')
    
        //Update label name
        if(formUpload.files && formLabel){
          formLabel.textContent = formUpload.files[0].name
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
                  inUseApi={workState.sem_api}
                  requestFileDownload={requestFileDownload}
                  requestUploadFile={requestUploadFile}
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
