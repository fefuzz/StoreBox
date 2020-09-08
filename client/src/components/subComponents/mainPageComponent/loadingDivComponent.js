import React from 'react'

import logoImg from '../../../images/logo_simple.png'

function loadingDivComponent() {
    return (
        <div className='loading-div'>
            <img src={logoImg} alt="logo" />
        </div>
    )
}

export default loadingDivComponent
