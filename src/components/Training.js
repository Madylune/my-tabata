import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, IconButton, Button } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import times from 'lodash/fp/times'
import get from 'lodash/fp/get'
import { getDevice } from '../utils'
import Timer from './Timer'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledIconButton = styled(IconButton)`
  && {
    margin-top: ${props => props.isMobile ? 0 : 10}px;
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
    height: 50px;
    margin: 10px auto 20px;
    color: ${props => setColor(props.title)};
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

const Training = ({ data }) => {
  const { prepareTime, workTime, restTime, exerciseNb, cycleNb, sound, exercises } = data
  const [ prepareCounter, setPrepareCounter ] = useState(prepareTime)
  const [ workCounter, setWorkCounter ] = useState(workTime)
  const [ restCounter, setRestCounter ] = useState(restTime)
  const [ exerciseCounter, setExerciseCounter ] = useState(exerciseNb)
  const [ cycleCounter, setCycleCounter ] = useState(cycleNb)

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
          } else {
            if (restCounter > 0) {
              setTitle('Repos')
              setTimeout(() => !pause && setRestCounter(restCounter - 1), 1000)
            } else {
              setExerciseCounter(exerciseCounter - 1)
              if (exerciseCounter > 1) {
                setWorkCounter(workTime)
                setRestCounter(restTime)
              } else {
                setCycleCounter(cycleCounter - 1)
                if (cycleCounter > 1) {
                  setExerciseCounter(exerciseNb)
                  setWorkCounter(workTime)
                  setRestCounter(restTime)
                }
              }
            }
          }
          break

        default:
          setTitle('Terminé')
      }
    }, cycleNb)
  }, [prepareCounter, exerciseCounter, workCounter, restCounter, cycleCounter, pause, workTime, cycleNb, exerciseNb, restTime])

  useEffect(() => {
    if (sound) {
      var audio = document.querySelector('.Audio')
      audio.play()
      pause && audio.pause()
    } 
  }, [title, sound, pause, exerciseCounter])

  const getSound = title => {
    switch(title) {
      case 'Préparation':
        return 'prepare'
      case 'Effort':
        return 'go'
      case 'Repos':
        return 'bell'
      default:
        return 'end'
    }
  } 
  
  const currentCycle = cycleNb - cycleCounter + 1
  const currentExercise = exerciseNb - exerciseCounter + 1
  const currentExerciseTitle = get([currentExercise - 1, 'title'], exercises)

  const getMax = title => {
    switch (title) {
      case 'Préparation':
        return prepareTime
      case 'Effort':
        return workTime
      case 'Repos':
        return restTime
      default:
        return 0
    }
  }

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

  const device = getDevice()
  const isMobile = device === 'mobile'
  return (
    <StyledWrapper>
      <StyledTimer>
        <StyledTitle variant={isMobile ? 'h4' : 'h3'} title={title}>
          {title === 'Effort' ? currentExerciseTitle || title : title}
        </StyledTitle>
        <Timer 
          timerColor={setColor(title)}
          isMobile={isMobile}
          title={title}
          currentCycle={currentCycle}
          currentExercise={currentExercise}
          cycleNb={cycleNb}
          exerciseNb={exerciseNb}
          max={getMax(title)}
          timer={getTimer(title)}
        />
      </StyledTimer>

      {sound && (
        <audio className="Audio"
          src={require(`../assets/sounds/${getSound(title)}.mp3`)}>
        </audio>
      )}

      {title === 'Terminé' ? (
        <StyledHomeButton variant="contained" color="primary" size="large" onClick={() => document.location.reload(true)}>
          Accueil
        </StyledHomeButton>
      ) : (
        <StyledIconButton isMobile={isMobile} onClick={handlePause}>
          {pause ? <PlayIcon /> : <PauseIcon />}
        </StyledIconButton>
      )}
    </StyledWrapper>
  )
}

export default Training