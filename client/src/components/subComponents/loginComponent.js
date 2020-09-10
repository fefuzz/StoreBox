import React from 'react'

function loginComponent(props) {

    //login function
    let requestLogin = props.login

    //Errors
    let error = props.error

    let displayError = () => {
        if(error !== "NO_ERROR") {
            return (<div className='form-error-div'><p>{error}</p></div>)
        }
    }

    return (
        <div className='full-page-form'>
            <div className="form-box">
            <h2 className='form-name'>Login</h2>
            <form>
                <div className="field-box">
                <input type='text' name='username' id='usernameField' defaultValue='' required/>
                <label>Username</label>
                </div>
                <div className="field-box">
                <input type='password' defaultValue='' name='password' id='passwordField' required/>
                <label>Password</label>
                </div>
                <input type='button' className='form-button' onClick={()=> {requestLogin()}} value='Submit'/>
            </form>
            {displayError()}
            </div>
        </div>
    )
}

export default loginComponent
