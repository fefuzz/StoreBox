import React from 'react'

import FileList from './subComponents/mainPageComponent/fileListComp'
import SideBar from './subComponents/mainPageComponent/sideBarComponent'
import LoadingDivComponent from './subComponents/mainPageComponent/loadingDivComponent';

import '../styles/main_page.css'

function mainPageComponent(props) {

    //State
    let user = props.user
    let userList = props.userList
    let inUseApi = props.inUseApi

    //Utils functions
    let requestFileDownload = props.requestFileDownload
    let requestUploadFile = props.requestUploadFile
    let requestLogout = props.requestLogout


    let render = () => {
        switch (inUseApi) {
            case 'FREE':
                return (
                    <>
                    <SideBar user={user} uploadFile={requestUploadFile} logout={requestLogout}/>
                    <FileList userList={userList} downloadFile={requestFileDownload}/>
                    </>
                )
            default:
                return (
                    <>
                    <LoadingDivComponent />
                    <SideBar user={user} uploadFile={requestUploadFile} logout={requestLogout}/>
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
