/*
    This file contain all the request made by axios in the React Application
    This is called in every component that need an axios request to the backend

    Every function construct the body and the header of the request,
    and return a response from the backend
                                    
                                ===> W.I.P <===
*/

import axios from 'axios'
import json_url from './api_url.json'

const registerUrl = json_url.Register_Url
const loginUrl = json_url.Login_Url
const getListUrl = json_url.GetList_Url
const downloadUrl = json_url.Download_Url
const uploadUrl = json_url.Upload_Url
const checkFileUrl = json_url.CheckFile_Url
const verifyPhoneUrl = json_url.VerifyPhone_Url
const verifyCodeUrl = json_url.VerifyCode_Url
const checkTokenUrl = json_url.CheckToken_Url
const checkAirgramUrl = json_url.CheckAirgram_Url


export let register = async (username, email, password, checkPsw) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        username,
        email,
        password,
        "repsw" : checkPsw
    }
    return await axios.post(registerUrl, body)
}

export let verifyPhone = async (username, telephone) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        "username" : username,
        telephone
    }
    return await axios.post(verifyPhoneUrl, body)
}

export let verifyCode = async (username, code) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        "username" : username,
        code
    }
    return await axios.post(verifyCodeUrl, body)
}

export let login = async (username, password) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        username,
        password
    }
    return await axios.post(loginUrl, body)
}

export let checkAirgramAuth = async (username) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        username
    }

    return await axios.post(checkAirgramUrl, body)
}

export let getUserList = async (username, token) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        username
    }
    //creating header of the request 
    //TODO: add function to do this work
    let header = {
        headers: {
          'x-auth-token': token
        }
    }
    return await axios.post(getListUrl, body, header)
}

export let checkToken = async (username, token) => {
    //creating body of the request 
    //TODO: add function to do this work
    let body = {
        username,
        token
    }
    return await axios.post(checkTokenUrl, body)
}


export let downloadFile = async (fileId, username, token) => {
    let body = {
        "username" : username,
        "file_id" : fileId
    }
    let header = {
        responseType: 'arraybuffer',
        headers: {
          'x-auth-token': token
        }
    }

    return await axios.post(downloadUrl, body, header)

}

export let uploadFile = async (file, username, token) => {

    let body = new FormData()
    body.append("username", username)
    body.append("file", file)

    let header = {
        headers: {
            'x-auth-token': token
        }
    }

    return await axios.post(uploadUrl, body, header)

}


export let checkFileStatus = async (file_id, token) => {

    let body = {
        "file_id" : file_id
    }

    let header = {
        headers: {
            'x-auth-token': token
        }
    }

    return await axios.post(checkFileUrl, body, header)

}