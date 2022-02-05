import React, {useState, useEffect} from 'react'
import {url} from '../App'
import DayTextView from './DayTextView'
import DayImageView from './DayImageView'

export default function DayView({day}) {
    const [isLoading, setIsLoading] = useState(true)
    const [blob, setBlob] = useState()
    const dayFileURL = url + "day/" + day._id + "/file"

    useEffect(() => {
        fetch(dayFileURL)
          .then(response => response.blob())
          .then(blb => {
            console.log(blb)
            let blob
            switch(day.filetype) {
                case "txt":
                    blob = new Blob([blb], {type: 'text/plain'})
                    break
                case "png":
                    blob = new Blob([blb], {type: 'image/png'})
                    break
                case "jpeg":
                    blob = new Blob([blb], {type: 'image/jpeg'})
                    break
            }

            setBlob(blob)
            setIsLoading(false)
            // const url = URL.createObjectURL(blob);
            // console.log(url)
            // setFileSource(url)
          })
      }, [])

    function renderSwitch(filetype) {
        switch(day.filetype) {
            case "txt":
                return <DayTextView blob={blob} />
            case "png":
                return <DayImageView blob={blob}/>
            case "jpeg":
                return <DayImageView blob={blob}/>
            default:
                return <></>
        }
    }

    
    if(isLoading) {
        return <>Loading!</>
    } else {
        return (
            <div>
                {renderSwitch()}
            </div>
        )
    }
}
