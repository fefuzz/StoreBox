import React from 'react'

function loginComponent(props) {

    //login function
    let requestLogin = props.login

    return (
        <div className='full-page-form'>
            <div className="form-box">
            <h2 className='form-name'>Login</h2>
            <form>
                <div className="field-box">
                <input type='text' name='username' id='usernameField' defaultValue='' />
                <label>Username</label>
                </div>
                <div className="field-box">
                <input type='password' defaultValue='' name='password' id='passwordField' />
                <label>Password</label>
                </div>
                <input type='button' className='form-button' onClick={()=> {requestLogin()}} value='Submit'/>
            </form>
            </div>
        </div>
    )
}

export default loginComponent
