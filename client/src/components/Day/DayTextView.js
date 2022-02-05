import React, {useEffect, useState} from 'react'

export default function DayTextView({blob}) {
    const [textSource, setTextSource] = useState()

    useEffect(() => {
        blob.text().then(text => {
            setTextSource(text)
        })
    }, [blob])

    return (
        <div>
            <p>{textSource}</p>
        </div>
    )
}
