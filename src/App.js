import React, { useState, useCallback } from 'react'
import Settings from './components/Settings'
import Timer from './components/Timer'

const App = () => {
  const [ isStarted, setIsStarted ] = useState(false)
  const [ data, setData ] = useState([])
  const onSubmitCallback = useCallback(
    data => {
      setIsStarted(true)
      setData(data)
    }, [])
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./assets/logo.png')} className="Logo" alt="logo" height="150px"/>
      </header>
      {isStarted 
        ? <Timer data={data} />
        : <Settings onSubmitCallback={onSubmitCallback} />
      }
    </div>
  )
}

export default App
