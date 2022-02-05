import React from 'react'

export default function DayList({days, setSelectedDay}) {
    return (
        <div>
            {days.map((d) => {
                    return (
                        <div key= {d._id}>
                            <label onClick={() => setSelectedDay(d._id)} key = {d._id}>
                                {d.Month.MonthName + " " + d.Day}
                            </label>
                            <br/>
                        </div>
                    )
            })}
        </div>
    )
}
