import React from 'react'

function registerComponent(props) {

    //Utils functions
    let requestRegister = props.requestRegister

    return (
        <div className='full-page-form'>
        <div className="form-box">
        <h2 className='form-name'>Register</h2>
        <form>
            <div className="field-box">
            <input type='text' name='username' id='usernameField' defaultValue='' />
            <label>Username</label>
            </div>
            <div className="field-box">
            <input type='mail' name='username' id='emailField' defaultValue='' />
            <label>Email</label>
            </div>
            <div className="field-box">
            <input type='password' defaultValue='' name='password' id='passwordField' />
            <label>Password</label>
            </div>
            <div className="field-box">
            <input type='password' defaultValue='' name='password' id='checkPswField' />
            <label>Re-Type Password</label>
            </div>
            <input type='button' className='form-button' onClick={()=> {requestRegister()}} value='Submit'/>
        </form>
        </div>
        </div>
    )
}

export default registerComponent
