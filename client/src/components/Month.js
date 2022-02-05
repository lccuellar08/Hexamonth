import React, {useEffect, useState} from 'react'
import Day from './Day'
import {url} from './App'

export default function Month({month_id, setSelectedMonth}) {
    const [isLoading, setIsLoading] = useState(true)
    const [days, setDays] = useState()
    const [selectedDay, setSelectedDay] = useState()
    const monthUrl = url+"month/"+month_id

    useEffect(() => {
        fetch(monthUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setDays(result.days)
                    setIsLoading(false)
                },
                (error) => {
                    console.log(error)
                    setIsLoading(false)
                }
            )
    }, [])

    if(isLoading) {
        return (
            <div>
                Loading!
            </div>
        )
    } else if(selectedDay == undefined) {
        return (
            <div>
                {days.map((d) => {
                    return (
                        <>
                            <label onClick={() => setSelectedDay(d._id)} key = {d._id}>
                                {d.Month.MonthName + " " + d.Day}
                            </label>
                            <br/>
                        </>
                    )
                })}
                <button onClick={() => setSelectedMonth()}>
                    Back
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <Day day_id = {selectedDay} setSelectedDay = {setSelectedDay}/>
            </div>
        )
    }
}
