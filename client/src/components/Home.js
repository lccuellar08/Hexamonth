import React, {useState, useEffect} from 'react'
import {url} from './App'
import Month from './Month/Month'


export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState()
    const [months, setMonths] = useState()

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setMonths(result.months)
                    setIsLoading(false)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    if(isLoading) {
        return (
            <h2>Loading!</h2>
        )
    } else if(selectedMonth == undefined) {
        return (
            <div>
                {months.map((m) => {
                    return (
                        <h5 onClick={() => setSelectedMonth(m._id)} key = {m._id}>
                            {m.MonthName}
                        </h5>
                    )
                })}
            </div>
        )
    } else {
        return (
            <>
                <Month month_id={selectedMonth} setSelectedMonth={setSelectedMonth}/>
            </>
        )
    }
}
