import {useState, useEffect} from 'react'

function App() {
  const [dayFile, setDayFile] = useState()
  
  function onFileChange(newFile) {
    setDayFile(newFile)
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log(dayFile)
    const formData = new FormData()
    formData.append('file', dayFile)

    fetch("http://localhost:3001/day/61f70f102639145201c9642a", {
      method: 'put',
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: dayFile
    })

    console.log(formData)
  }

  return(
    <form onSubmit={onSubmit}>
      <input type="file" onChange={(e) => onFileChange(e.target.files[0])}/>
      <button>Submit</button>
    </form>
  )
}

export default App;
