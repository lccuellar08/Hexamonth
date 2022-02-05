import React, {useState, useEffect} from 'react'
import {url} from '../App'

export default function DayForm({day, setDay}) {
    const [isLoading, setIsLoading] = useState()
    const [successfulPost, setSuccessfulPost] = useState()
    const [dayFile, setDayFile] = useState()
    const dayURL = url + "day/" + day._id

    function onFileChange(newFile) {
        setDayFile(newFile)
      }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', dayFile)

        fetch(dayURL, {
            method: "PUT",
            body: formData,
            mode: "cors"
        }).then(res => {
            if(res.status == 200) {
                console.log("Successful post")
            }
            return res.json()
        })
        .then(
          (result) => {
                console.log(result)
                setDay(result.day)
                setSuccessfulPost(true)
          },
          (error) => {
                console.log(error)
                setSuccessfulPost(false)
          }
        )

    }

    if(isLoading) {
        return (
            <div>
                Loading!
            </div>
        )
    } else if(successfulPost === undefined) {
        return (
            <form onSubmit={handleSubmit}>
                <h2>{day.Month.MonthName + day.Day} Upload File</h2>
                <input type="file" onChange={(e) => onFileChange(e.target.files[0])}/>
                <button>Submit</button>
          </form>
        )
    } else if(successfulPost) {
        return(
            <div>
                Successful post!
            </div>
        )
    } else{
        return (
            <div>
                Whack
                {JSON.stringify(day)}
            </div>
        )
    }
}
