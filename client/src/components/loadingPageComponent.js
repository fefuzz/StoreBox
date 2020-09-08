import React from 'react'

import '../styles/loading_page.css'

import logoImg from '../images/logo_simple.png'

function loadingPageComponent() {
    return (
        <div className='logoLoading'>
            <img src={logoImg} alt="logo" />
        </div>
    )
}

export default loadingPageComponent
