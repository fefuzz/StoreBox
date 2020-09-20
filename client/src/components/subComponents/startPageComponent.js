import React from 'react'

import '../../styles/start_page.css'
import logo from '../../images/logo_simple.svg'

function startPageComponent(props) {
    
    let setLoginPage = props.setLoginPage
    let setRegisterPage = props.setRegisterPage

    return (
        <div className='StartPage'>
            <div className='logo'>
                <img src={logo} alt="logo"/>
                <h1>free as the birds that fly...</h1>
            </div>
            <div className='initial-actions'>
                <h3 onClick={()=>{setLoginPage()} }>LOGIN</h3>
                <h3 onClick={()=>{setRegisterPage()} }>REGISTER</h3>
            </div>
            <div className='other-actions'>
                <a href="https://www.storebox.app/about" target="_blank">About Us</a>
                <a href="https://www.storebox.app/terms_conditions" target="_blank">Terms And Conditions</a>
                <a href="https://www.storebox.app/privacy_policy" target="_blank">Privacy Policy</a>
            </div>
            <div className='footer'>
                <p>
                    This Site is currently in Beta Version. You can register, enter and use our services.
                    however, keep in mind that disruptions may occur. 
                </p>
                <p>
                    If you have some kind of problem, write us an email at pierpaolovanni@gmail.com and we will try to help you
                </p>
                <p>
                    Please remember to Read our <a href='https://www.storebox.app/terms_conditions'>Terms and Conditions</a> and our <a href='https://www.storebox.app/privacy_policy'>Privacy Policy</a> before you login or register to the site
                </p>
            </div>
        </div>
    )
}

export default startPageComponent
