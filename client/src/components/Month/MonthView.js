import React from 'react'

export default function MonthView({month}) {

    return (
        <div>
            <h2>{month.MonthName} Form</h2>
            <div>
                <label>Theme</label>
                <input type="text"
                    name="theme"
                    id="theme"
                    value={month.Theme}
                    disabled={true}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <textarea type="textarea"
                    name="description"
                    id="description"
                    value={month.Description}
                    disabled={true}
                ></textarea>
            </div>
        </div>
    )
}
