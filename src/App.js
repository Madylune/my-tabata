import React, { useState, useCallback } from 'react'
import Settings from './components/Settings'
import Timer from './components/Timer'
import { BREAKPOINTS } from './theme'
import styled from 'styled-components'

const StyledLogo = styled.img`
  height: 150px;
  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 90px;
  }
`

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
        <StyledLogo src={require('./assets/logo.png')} className="Logo" alt="logo" />
      </header>
      {isStarted 
        ? <Timer data={data} />
        : <Settings onSubmitCallback={onSubmitCallback} />
      }
    </div>
  )
}

export default App
