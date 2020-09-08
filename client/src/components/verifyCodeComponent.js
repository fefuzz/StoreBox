import React from 'react'

import '../styles/verify_code.css'

function verifyCodeComponent(props) {

    //Utils functions
    let requestVerifyCode = props.requestVerifyCode

    return (
        <div className='full-page-form'>
        <div className="form-box">
        <h2 className='form-name'>Verify Code</h2>
        <form>
            <div className="field-box">
            <input type='text' name='code' id='codeField' defaultValue=''/>
            <label>Received Code</label>
            </div>
            <input type='button' className='form-button' onClick={()=> {requestVerifyCode()}} value='Submit'/>
        </form>
        </div>
        </div>
    )
}

export default verifyCodeComponent
