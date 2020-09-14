import React from 'react'


function timelineComponent(props) {

    let listUploading = props.listUploading

    /* not work
    let fadeOutPromise = () => {
        return new Promise ( (res, rej) => {
    
            console.log('in promise')
            try{
                let toFade = document.getElementsByClassName('uploading-element')[0]
                if(!toFade) res('NO') 
    
                toFade.addEventListener('animationend', () => {res('OK')})
                
                toFade.classList.add('animate-fadeout')
    
            } catch(error){
                rej('ERROR')
            }
        })
    }
    */   

    let render = () => {
        if(!listUploading) return
        let workArray = listUploading.map( (elem) => {
                return <div className='uploading-element'><p>{elem}</p></div>
        })

        return workArray
    }

    return (
        <div className='timeline'>
            { render() }    
        </div>
    )
}

export default timelineComponent
