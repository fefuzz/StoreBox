import React from 'react'

import FileList from './mainPageComponent/fileListComp'
import SideBar from './mainPageComponent/sideBarComponent'
import TimelineComponent from './mainPageComponent/timelineComponent';


//<LoadingDivComponent />

import '../../styles/main_page.css'


function mainPageComponent(props) {

    //State
    let user = props.user
    let userList = props.userList

    //Utils functions
    let requestFileDownload = props.requestFileDownload
    let requestUploadFile = props.requestUploadFile
    let requestLogout = props.requestLogout
    let updateUploadForm = props.updateUploadForm


    let render = () => {
        return (
            <>
            <SideBar user={user} uploadFile={requestUploadFile} logout={requestLogout} updateUploadForm={updateUploadForm}/>
            <TimelineComponent />
            <FileList userList={userList} downloadFile={requestFileDownload}/>
            </>
        )
    }

    return (
    <div className='main_page' id='main-page'>{render()}</div>
    )
}

export default mainPageComponent
