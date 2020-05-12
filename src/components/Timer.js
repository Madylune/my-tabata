import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, IconButton, CircularProgress, Button } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import times from 'lodash/fp/times'
import get from 'lodash/fp/get'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIconButton = styled(IconButton)`
  && {
    margin-top: 10px;
    svg {
      font-size: 80px;
    }
  }
`

const StyledTimer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
  }
`

const StyledTitle = styled(Typography)`
  && {
    margin: 10px auto 20px;
    color: ${props => setColor(props.title)};
  }
` 

const StyledText = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    margin: 0 10px;
    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 20px;
    }
  }
`

const StyledCircleWrapper = styled.div`
  margin: auto;
  position: relative;
  height: 350px;
  width: 350px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const StyledCircularProgress = styled(CircularProgress)`
  && {
    position: absolute;
    color: ${props => setColor(props.title)};
    z-index: 1;
    top: 0;
    left: 0;
  }
`

const StyledCircleContent = styled.div`
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  height: 280px;
  width: 280px;
  border-radius: 50%;
`

const StyledNumber = styled(Typography)`
  && {
    margin-top: 20%;
    font-size: 8rem;
  }
`

const StyledHomeButton = styled(Button)`
  && {
    margin-top: 30px;
  }
`

const setColor = title => {
  switch (title) {
    case 'Préparation':
      return '#41d29a'
    case 'Effort':
      return '#f7ad82'
    case 'Repos':
      return '#ae96f9'
    default:
      return '#525252'
  }
}

const Timer = ({ data }) => {
  const [ prepareCounter, setPrepareCounter ] = useState(data.prepareTime)
  const [ workCounter, setWorkCounter ] = useState(data.workTime)
  const [ restCounter, setRestCounter ] = useState(data.restTime)
  const [ exerciseCounter, setExerciseCounter ] = useState(data.exerciseNb)
  const [ cycleCounter, setCycleCounter ] = useState(data.cycleNb)

  const [ title, setTitle ] = useState(undefined)

  const [ pause, setPause ] = useState(false)
  const handlePause = () => pause ? setPause(false) : setPause(true)

  useEffect(() => {
    times(() => {
      switch(true) {
        case prepareCounter > 0:
          setTitle('Préparation')
          setTimeout(() => !pause && setPrepareCounter(prepareCounter - 1), 1000)
          break

        case cycleCounter > 0:
          if (workCounter > 0) {
            setTitle('Effort')
            setTimeout(() => !pause && setWorkCounter(workCounter - 1), 1000)
          } else if (restCounter > 0) {
            setTitle('Repos')
            setTimeout(() => !pause && setRestCounter(restCounter - 1), 1000)
          } else {
            setExerciseCounter(exerciseCounter - 1)
            if (exerciseCounter > 1) {
              setWorkCounter(data.workTime)
              setRestCounter(data.restTime)
            } else {
              setCycleCounter(cycleCounter - 1)
              if (cycleCounter > 1) {
                setExerciseCounter(data.exerciseNb)
                setWorkCounter(data.workTime)
                setRestCounter(data.restTime)
              }
            }
          }
          break

        default:
          setTitle('Terminé')
      }
    }, data.cycleNb)
  }, [prepareCounter, exerciseCounter, workCounter, restCounter, cycleCounter, data, pause])

  useEffect(() => {
    if (data.sound) {
      var audio = document.querySelector('.Audio')
      audio.play()
      pause && audio.pause()
    } 
  }, [title, data.sound, pause, exerciseCounter])

  const getSound = title => {
    switch(title) {
      case 'Préparation':
        return 'prepare'
      case 'Effort':
        return 'run'
      case 'Repos':
        return 'rest'
      default:
        return 'end'
    }
  } 
  
  const currentCycle = data.cycleNb - cycleCounter + 1
  const currentExercise = data.exerciseNb - exerciseCounter + 1
  const currentExerciseTitle = get(['exercises', currentExercise - 1, 'title'], data)

  const getTimer = title => {
    switch (title) {
      case 'Préparation':
        return prepareCounter
      case 'Effort':
        return workCounter
      case 'Repos':
        return restCounter
      default:
        return 0
    }
  }

  const getMax = title => {
    switch (title) {
      case 'Préparation':
        return data.prepareTime
      case 'Effort':
        return data.workTime
      case 'Repos':
        return data.restTime
      default:
        return 0
    }
  }

  const MIN = 0
  const MAX = getMax(title)
  const normaliseCountdown = value => (value - MIN) * 100 / (MAX - MIN)

  return (
    <StyledWrapper>
      <StyledTimer>
        <StyledTitle variant="h3" title={title}>
          {title === 'Effort' ? currentExerciseTitle || title : title}
        </StyledTitle>
        <StyledCircleWrapper>
          <StyledCircularProgress 
            size={350}
            thickness={4}
            variant="static" 
            value={normaliseCountdown(getTimer(title))} 
            title={title}
          />
          <StyledCircleContent>
            <StyledNumber variant="h1">{getTimer(title)}</StyledNumber>
            <StyledInfos>
              <StyledText variant="h5">
                <AutorenewIcon className="Icon" />
                {currentCycle} / {data.cycleNb}
              </StyledText>
              <StyledText variant="h5">
                <FitnessCenterIcon className="Icon" /> 
                {currentExercise} / {data.exerciseNb}
              </StyledText>
            </StyledInfos>
          </StyledCircleContent>
        </StyledCircleWrapper>
      </StyledTimer>

      {data.sound && (
        <audio className="Audio"
          src={require(`../assets/sounds/${getSound(title)}.mp3`)}>
        </audio>
      )}

      {title === 'Terminé' ? (
        <StyledHomeButton variant="contained" color="primary" size="large" onClick={() => document.location.reload(true)}>
          Accueil
        </StyledHomeButton>
      ) : (
        <StyledIconButton onClick={handlePause}>
          {pause ? <PlayIcon /> : <PauseIcon />}
        </StyledIconButton>
      )}
    </StyledWrapper>
  )
}

export default Timer