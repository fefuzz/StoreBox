import React from 'react'

import '../styles/start_page.css'
import logo from '../images/logo.png'

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
        </div>
    )
}

export default startPageComponent
