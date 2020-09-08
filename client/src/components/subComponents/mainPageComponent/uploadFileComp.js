import React from 'react'

function uploadFileComp(props) {

    let upload = props.uploadFile

    return (
        <div>
            <form>
                <input type="file" name="file" id="fileSelected" className="inputfile" />
                <label htmlFor="fileSelected">Choose File</label>
                <br />
                <button type="button" className='simple-btn-white' onClick={async () => {await upload()}} >Upload</button>
            </form>
        </div>
    )
}

export default uploadFileComp
