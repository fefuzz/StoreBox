import React from 'react'

import '../../styles/loading_page.css'

import logoImg from '../../images/logo_simple.svg'

function loadingPageComponent() {
    return (
        <div className='loading-page'>
            <img src={logoImg} alt="" />
        </div>
    )
}

export default loadingPageComponent
