import React from 'react'

import FileList from './mainPageComponent/fileListComp'
import SideBar from './mainPageComponent/sideBarComponent'
import LoadingDivComponent from './mainPageComponent/loadingDivComponent';

import '../../styles/main_page.css'

function mainPageComponent(props) {

    //State
    let user = props.user
    let userList = props.userList
    let inUseApi = props.inUseApi

    //Utils functions
    let requestFileDownload = props.requestFileDownload
    let requestUploadFile = props.requestUploadFile
    let requestLogout = props.requestLogout
    let updateUploadForm = props.updateUploadForm


    let render = () => {
        switch (inUseApi) {
            case 'FREE':
                return (
                    <>
                    <SideBar user={user} uploadFile={requestUploadFile} logout={requestLogout} updateUploadForm={updateUploadForm}/>
                    <FileList userList={userList} downloadFile={requestFileDownload}/>
                    </>
                )
            default:
                return (
                    <>
                    <LoadingDivComponent />
                    <SideBar user={user} uploadFile={requestUploadFile} logout={requestLogout} updateUploadForm={updateUploadForm}/>
                    <FileList userList={userList} downloadFile={requestFileDownload}/>
                    </>
                )
        }

    }

    return (
    <div className='main_page'>{render()}</div>
    )
}

export default mainPageComponent
