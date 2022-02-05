import React, {useState, useEffect} from 'react'
import {url} from '../App'
import DayForm from './DayForm'
import DayView from './DayView'

export default function Day({day_id, setSelectedDay}) {
    const [isLoading, setIsLoading] = useState(true)
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
    }, [])

    if(isLoading) {
        return <h1>Is Loading!</h1>
    } else if(day.Complete) {
        return (
            <>
                {JSON.stringify(day)}
                <br />
                <DayView day={day} />
                <br/>
                <button onClick={() => setSelectedDay()}>
                    Back
                </button>
            </>
        )
    } else {
        return (
            <>
                <DayForm day={day} setDay={setDay} />
                <button onClick={() => setSelectedDay()}>
                    Back
                </button>
            </>
        )
    }
}
