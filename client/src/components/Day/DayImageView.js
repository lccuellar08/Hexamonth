import React, {useEffect, useState} from 'react'

export default function DayImageView({blob}) {
    const [imageSource, setImageSource] = useState()

    useEffect(() => {
        const url = URL.createObjectURL(blob);
        setImageSource(url)
    }, [blob])

    return (
        <div>
            <img src={imageSource}/>
        </div>
    )
}
