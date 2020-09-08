import React from 'react'

import '../styles/verify_phone.css'

function verifyPhoneComponent(props) {

    //Utils Functions
    let requestVerifyPhone = props.requestVerifyPhone

    return (
        <div className='full-page-form'>
        <div className="form-box">
        <h2 className='form-name'>Register Phone</h2>
        <form>
            <div className="field-box">
            <input type='text' name='phone' id='phoneField' defaultValue=''/>
            <label>Phone Number</label>
            </div>
            <input type='button' className='form-button' onClick={()=> {requestVerifyPhone()}} value='Submit'/>
        </form>
        </div>
        </div>
    )
}

export default verifyPhoneComponent
