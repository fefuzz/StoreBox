export let insertElemInTimeline = (elemType) => {

    let insertDownload = () => { //insert new download element in timeline
        let timeline = document.getElementById("timeline")

        let downloadElem = document.createElement('div')
        downloadElem.classList.add('operation-element')
        let downloadImg = document.createElement('div')
        downloadImg.classList.add('operation-element-dwn')
        let downloadText = document.createElement('p')
        downloadText.textContent = "Download File"

        downloadElem.appendChild(downloadImg)
        downloadElem.appendChild(downloadText)
        timeline.appendChild(downloadElem)
    }

    let insertUpload = () => {
        let timeline = document.getElementById("timeline")

        let uploadElem = document.createElement('div')
        uploadElem.classList.add('operation-element')
        let uploadImg = document.createElement('div')
        uploadImg.classList.add('operation-element-up')
        let uploadText = document.createElement('p')
        uploadText.textContent = "Upload File"

        uploadElem.appendChild(uploadImg)
        uploadElem.appendChild(uploadText)
        timeline.appendChild(uploadElem)
    }

    if(!elemType) return //error checking

    switch (elemType) {
        case "DOWNLOAD_FILE":
            insertDownload()
            break
        case "UPLOAD_FILE" : 
            insertUpload()
            break
        default:
            return
    }

}


export let removeElemFromTimeline = () => { //remove first element from timeline
    let timeline = document.getElementById("timeline")
    let downloadElem = document.getElementsByClassName('operation-element')[0]

    downloadElem.classList.remove('operation-element')
    downloadElem.classList.add('removing-element')

    downloadElem.addEventListener('animationend', ()=> {timeline.removeChild(downloadElem)})
}