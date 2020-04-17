import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'
import times from 'lodash/fp/times'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  const [ exerciseCounter, setExerciseCounter ] = useState(data.exerciseTime)
  const [ cycleCounter, setCycleCounter ] = useState(data.cycleTime)

  const [ title, setTitle ] = useState(undefined)

  useEffect(() => {
    times(() => {
      switch(true) {
        case prepareCounter > 0:
          setTitle('Préparation')
          setTimeout(() => setPrepareCounter(prepareCounter - 1), 1000)
          break

        case cycleCounter > 0:
          if (workCounter > 0) {
            setTitle('Effort')
            setTimeout(() => setWorkCounter(workCounter - 1), 1000)
          } else if (restCounter > 0) {
            setTitle('Repos')
            setTimeout(() => setRestCounter(restCounter - 1), 1000)
          } else {
            setExerciseCounter(exerciseCounter - 1)
            if (exerciseCounter > 1) {
              setWorkCounter(data.workTime)
              setRestCounter(data.restTime)
            } else {
              setCycleCounter(cycleCounter - 1)
              if (cycleCounter > 1) {
                setExerciseCounter(data.exerciseTime)
                setWorkCounter(data.workTime)
                setRestCounter(data.restTime)
              }
            }
          }
          break

        default:
          setTitle('Terminé')
      }
    }, data.cycleTime)
  }, [prepareCounter, exerciseCounter, workCounter, restCounter, cycleCounter, data])

  useEffect(() => {
    var sound = document.querySelector('.Audio')
    sound.play()
  }, [title])

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
  return (
    <StyledWrapper>
      <StyledText variant="h5">Cycle(s) restant(s): {cycleCounter}</StyledText>
      <StyledText variant="h5">Exercice(s) restant(s): {exerciseCounter}</StyledText>
    <StyledTimer title={title}>
      <Typography variant="h3">{title}</Typography>
      {title === 'Préparation' && <Typography variant="h1">{prepareCounter}</Typography>}
      {title === 'Effort' && <Typography variant="h1">{workCounter}</Typography>}
      {title === 'Repos' && <Typography variant="h1">{restCounter}</Typography>}
      <audio className="Audio"
        src={require(`../assets/sounds/${getSound(title)}.mp3`)}>
      </audio>
    </StyledTimer>
    </StyledWrapper>
  )
}

export default Timer