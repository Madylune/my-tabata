import React, { useState, useCallback } from 'react'
import Settings from './components/Settings'
import Timer from './components/Timer'
import Workouts from './components/Workouts'
import { BREAKPOINTS } from './theme'
import styled from 'styled-components'

const StyledHeader = styled.div`
  @media (max-width: ${BREAKPOINTS.sm}) {
    display: ${props => props.isStarted ? 'none' : undefined};
  }
`

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
      <StyledHeader className="App-header" isStarted={isStarted}>
        <StyledLogo src={require('./assets/logo.png')} className="Logo" alt="logo" />
      </StyledHeader>
      {isStarted 
        ? <Timer data={data} />
        : <Settings onSubmitCallback={onSubmitCallback} />
      }
      {!isStarted && <Workouts onSubmitCallback={onSubmitCallback} />}
    </div>
  )
}

export default App
