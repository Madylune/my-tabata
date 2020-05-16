import React, { useState, useCallback } from 'react'
import Settings from './components/Settings'
import Training from './components/Training'
import Workouts from './components/Workouts'
import Videos from './components/Videos'
import { BREAKPOINTS } from './theme'
import styled from 'styled-components'

const StyledApp = styled.div`
  position: relative;
  padding: 0 10px;
`
const StyledHeader = styled.div`
  @media (max-width: ${BREAKPOINTS.sm}) {
    display: ${props => props.isStarted ? 'none' : undefined};
  }
`

const StyledLogo = styled.img`
  height: 150px;
  cursor: pointer;
  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 90px;
  }
`

const StyledSpotify = styled.iframe`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border: none;
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
    <StyledApp>
      <StyledHeader className="App-header" isStarted={isStarted}>
        <StyledLogo src={require('./assets/logo.png')} className="Logo" alt="logo" onClick={() => document.location.reload(true)} />
      </StyledHeader>
      {isStarted 
        ? <Training data={data} />
        : <Settings onSubmitCallback={onSubmitCallback} />
      }
      {!isStarted && (
        <>
          <Workouts onSubmitCallback={onSubmitCallback} />
          <Videos />
        </>
      )}
    
      <StyledSpotify 
        src="https://open.spotify.com/embed/playlist/6uQyxRW4t2otqHVlwfW83o"
        height="80" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media"
        >
      </StyledSpotify>
    </StyledApp>
  )
}

export default App
