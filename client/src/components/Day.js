import React, {useState, useEffect} from 'react'
import {url} from './App'

export default function Day({day_id, setSelectedDay}) {
    const [isLoading, setIsLoading] = useState()
    const [day, setDay] = useState()
    const dayUrl = url + "day/" + day_id

    useEffect(() => {
        fetch(dayUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setDay(result.day)
                    setIsLoading(false)
                },
                (error) => {
                    console.log(error)
                    setIsLoading(false)
                }
            )
    })

    if(isLoading) {
        return <h1>Is Loading!</h1>
    } else {
        return (
            <>
                {JSON.stringify(day)}
                <br/>
                <button onClick={() => setSelectedDay()}>
                    Back
                </button>
            </>
        )
    }
}
