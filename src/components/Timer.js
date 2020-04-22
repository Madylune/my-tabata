import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Paper, Typography, IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import times from 'lodash/fp/times'
import get from 'lodash/fp/get'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    top: 15px;
    right: 15px;
    svg {
      font-size: 50px;
    }
  }
`

const StyledTimer = styled(Paper)`
  && {
    height: 300px;
    width: 400px;
    margin: auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${props => setBgColor(props.title)};

    @media (max-width: ${BREAKPOINTS.sm}) {
      width: 70%;
      height: 250px;
    }
  }
`

const StyledText = styled(Typography)`
  && {
    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 20px;
    }
  }
`

const setBgColor = title => {
  switch (title) {
    case 'Préparation':
      return '#82ffcf'
    case 'Effort':
      return '#ffc8a8'
    case 'Repos':
      return '#e0d6ff'
    default:
      return '#ffffff'
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
    var audio = document.querySelector('.Audio')
    data.sound && audio.play()
    pause && audio.pause()
  }, [title, data.sound, pause])

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

  return (
    <StyledWrapper>
      <StyledIconButton onClick={handlePause}>
        {pause ? <PlayIcon /> : <PauseIcon />}
      </StyledIconButton>

      <StyledText variant="h5">Cycle: {currentCycle} / {data.cycleNb}</StyledText>
      <StyledText variant="h5">Exercice: {currentExercise} / {data.exerciseNb}</StyledText>
      <StyledTimer title={title}>
        <Typography variant="h3">{title}</Typography>
        {title === 'Préparation' && <Typography variant="h1">{prepareCounter}'</Typography>}
        {title === 'Effort' && (
          <>
            <Typography variant="h1">{workCounter}'</Typography>
            <Typography variant="h4">{currentExerciseTitle}</Typography>
          </>
        )}
        {title === 'Repos' && <Typography variant="h1">{restCounter}'</Typography>}
        {data.sound && (
          <audio className="Audio"
            src={require(`../assets/sounds/${getSound(title)}.mp3`)}>
          </audio>
        )}
      </StyledTimer>
    </StyledWrapper>
  )
}

export default Timer