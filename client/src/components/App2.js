import {useState, useEffect} from 'react'

export default function App2() {
  const [dayFile, setDayFile] = useState()
  const [imgSource, setImgSource] = useState()

  useEffect(() => {
    fetch("http://localhost:3001/day/61f70f102639145201c9642e/file")
      .then(response => response.blob())
      .then(blb => {
        console.log(blb)
        const blob = new Blob([blb], {type: 'image/png'})
        const url = URL.createObjectURL(blob);
        console.log(url)
        setImgSource(url)
      })
  }, [])
  
  function onFileChange(newFile) {
    setDayFile(newFile)
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log(dayFile)
    const formData = new FormData()
    formData.append('file', dayFile)

    fetch("http://localhost:3001/day/61f70f102639145201c9642e", {
      method: 'put',
      mode: 'cors',
      body: formData
    })

    console.log(formData)
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => onFileChange(e.target.files[0])}/>
        <button>Submit</button>
      </form>
      {imgSource !== undefined ? <img src={imgSource}/> : <></>}
    </>
  )
}
