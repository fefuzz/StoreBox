import React from 'react'

import pdfImg from '../../../images/icon_pdf.png'
import docxImg from '../../../images/icon_docx.png'
import fileImg from '../../../images/icon_file.png'
import odtImg from '../../../images/icon_odt.png'
import pngImg from '../../../images/icon_png.png'
import zipImg from '../../../images/icon_zip.png'
import jpegImg from '../../../images/icon_jpeg.png'

function fileListComp(props) {

    let userFileList = props.userList
    let downloadFile = props.downloadFile

    let workIcon = (filetype) => {
        switch(filetype){
            case "application/pdf" :
                return pdfImg
            case "image/png":
                return pngImg
            case "application/x-zip-compressed":
                return zipImg
            case "image/jpeg":
                return jpegImg
            case "text/docx":
                return docxImg
            case "text/odt":
                return odtImg
            default:
                return fileImg
        }
    }

    return (
        <div className='file_list'>
            {
                userFileList.file_list.map(elem => {
                    return (
                        <div className='file_block' key={elem._id} title={elem.filename} onClick={ async () => {await downloadFile(elem._id)} }>
                            <div className='file_img'><img src={workIcon(elem.filetype)} alt='file'/></div>
                            <p>{elem.filename}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default fileListComp
