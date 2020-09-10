import React from 'react'

import UploadForm from './uploadFileComp'

import logoSimple from '../../../images/logo_simple.png'

function sideBarComponent(props) {

    let user = props.user
    let requestUploadFile = props.uploadFile
    let requestLogout = props.logout
    let updateUploadForm = props.updateUploadForm

    return (
        <div className='sidebar'>
            <img className='logo-simple' src={logoSimple} alt="logo simple" />
            <p className='username'>{user.username}</p>
            <UploadForm uploadFile={requestUploadFile} updateUploadForm={updateUploadForm} />
            <div className='TODO COLLECTIONS'>  </div>
            <p className='logout' onClick={()=>{requestLogout()}}>logout</p>
        </div>
    )
}

export default sideBarComponent
