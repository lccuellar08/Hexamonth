import React, {useEffect, useState} from 'react'
import Day from '../Day/Day'
import DayList from '../Day/DayList'
import MonthForm from './MonthForm'
import MonthView from './MonthView'
import {url} from '../App'

export default function Month({month_id, setSelectedMonth}) {
    const [isLoading, setIsLoading] = useState(true)
    const [days, setDays] = useState()
    const [month, setMonth] = useState()
    const [selectedDay, setSelectedDay] = useState()
    const monthUrl = url+"month/"+month_id

    useEffect(() => {
        fetch(monthUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setDays(result.days)
                    setMonth(result.month)
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
    } else if(selectedDay === undefined) {
        return (
            <div>
                {month.Complete ?
                    <MonthView month={month}/> :
                    <MonthForm month={month} setMonth={setMonth}/>
                }
                <DayList days={days} setSelectedDay={setSelectedDay}/>
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
