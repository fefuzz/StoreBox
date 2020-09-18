import React from 'react'

import '../../styles/start_page.css'
import logo from '../../images/logo.svg'

function startPageComponent(props) {
    
    let setLoginPage = props.setLoginPage
    let setRegisterPage = props.setRegisterPage

    return (
        <div className='StartPage'>
            <div className='logo'>
                <img src={logo} alt="logo"/>
            </div>
            <div className='initial-actions'>
                <h3 onClick={()=>{setLoginPage()} }>LOGIN</h3>
                <h3 onClick={()=>{setRegisterPage()} }>REGISTER</h3>
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
                    Please remember to Read our <a href='https://www.storebox.app/therms_conditions'>Therms and Conditions </a>
                    and our <a href='https://www.storebox.app/privacy_policy'>Privacy Policy </a> 
                    before you login or register to the site
                </p>
            </div>
        </div>
    )
}

export default startPageComponent
