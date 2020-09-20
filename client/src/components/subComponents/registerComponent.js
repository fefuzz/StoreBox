import React from 'react'

function registerComponent(props) {

    //Utils functions
    let requestRegister = props.requestRegister
    let goStartPage = props.goStartPage

    //Errors
    let error = props.error

    let displayError = () => {
        if(error !== "NO_ERROR") {
            return (<div className='form-error-div'><p>{error}</p></div>)
        }
    }

    return (
        <div className='full-page-form'>
            <div className='back-button'>
                <input type="button" className="simple-btn-white" value="HOME" onClick={()=>{goStartPage()}}/>
            </div>
            <div className="form-box">
                <h2 className='form-name'>Register</h2>
                <form>
                    <div className="field-box">
                    <input type='text' name='username' id='usernameField' defaultValue='' required/>
                    <label>Username</label>
                    </div>
                    <div className="field-box">
                    <input type='mail' name='username' id='emailField' defaultValue='' required/>
                    <label>Email</label>
                    </div>
                    <div className="field-box">
                    <input type='password' defaultValue='' name='password' id='passwordField' required/>
                    <label>Password</label>
                    </div>
                    <div className="field-box">
                    <input type='password' defaultValue='' name='password' id='checkPswField' required/>
                    <label>Re-Type Password</label>
                    </div>
                    <div className='field-check-info'>
                        <p>Before proceeding please read and agree to our <a href='https://www.storebox.app/privacy_policy'>Privacy Policy</a> and our <a href='https://www.storebox.app/terms_conditions'>Terms of Use</a></p>
                    
                        <div className='field-check'>
                        <input type='checkbox' name='PrivacyPolicy' id='PrivacyPolicy' required/><label for='PrivacyPolicy' className='CheckboxLabel'>I have read and agree to StoreBox Privacy Policies</label>
                        </div>

                        <div className='field-check'>
                        <input type='checkbox' name='ThermsConditions' id='ThermsConditions' required/><label for='ThermsConditions' className='CheckboxLabel'>I have read and agree to StoreBox Terms And Conditions</label>
                        </div>
                    
                    </div>
                    <input type='button' className='form-button' onClick={()=> {requestRegister()}} value='Submit'/>
                </form>
                {displayError()}
            </div>
        </div>
    )
}

export default registerComponent
