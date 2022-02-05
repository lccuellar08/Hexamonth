import React, {useState, useEffect} from 'react'
import {url} from '../App'

export default function MonthForm({month, setMonth}) {
    const [isLoading, setIsLoading] = useState()
    const [successfulPost, setSuccessfulPost] = useState()
    const monthFormURL = url + "month/" + month._id

    function handleChanges(change) {
        const newMonth = {...month, ...change}
        setMonth(newMonth)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            Theme: month.Theme,
            Description: month.Description
        }
        fetch(monthFormURL, {
            method: "PUT",
            body: JSON.stringify(body),
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(res => {
            if(res.status == 200) {
                console.log("Successful post")
            }
            return res.json()
        })
        .then(
          (result) => {
                console.log(result)
                setMonth(result.month)
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
                <h2>{month.MonthName} Form</h2>
                <div>
                    <label>Theme</label>
                    <input type="text"
                        name="theme"
                        id="theme"
                        value={month.Theme}
                        onChange={e => handleChanges({Theme: e.target.value})}
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="textarea"
                        name="description"
                        id="description"
                        value={month.Description}
                        onChange={e => handleChanges({Description: e.target.value})}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
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
                {JSON.stringify(month)}
            </div>
        )
    }
}
