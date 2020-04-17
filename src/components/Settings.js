import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { 
  Paper, 
  Button,
  Input,
  Typography
} from '@material-ui/core'
import toNumber from 'lodash/fp/toNumber'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled(Paper)`
  && {
    width: fit-content;
    margin: auto;
    padding: 20px 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.sm}) {
      padding: 10px 50px;
    }
  }
`

const StyledTitle = styled(Typography)`
  && {
    margin-top: 10px;
    @media (max-width: ${BREAKPOINTS.sm}) {
      margin-top: 5px;
      font-size: 21px;
    }
  }
`

const StyledInput = styled(Input)`
  && {
    height: 50px;
    width: 200px;
    font-size: 23px;

    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 21px;
      height: 40px;
    }
  }
`

const StyledButton = styled(Button)`
  && {
    margin: 20px 0 10px;
  }
`

const Settings = ({ onSubmitCallback }) => {
  const [ prepareTime, setPrepareTime ] = useState(5)
  const [ workTime, setWorkTime ] = useState(30)
  const [ restTime, setRestTime ] = useState(10)
  const [ exerciseTime, setExerciseTime ] = useState(5)
  const [ cycleTime, setCycleTime ] = useState(1)

  const onInputChange = useCallback(
    e => {
      e.preventDefault()
      switch(e.target.name) {
        case 'prepare':
          return setPrepareTime(toNumber(e.target.value))
        case 'work':
          return setWorkTime(toNumber(e.target.value))
        case 'rest':
          return setRestTime(toNumber(e.target.value))
        case 'exercise':
          return setExerciseTime(toNumber(e.target.value))
        case 'cycle':
          return setCycleTime(toNumber(e.target.value))
        default:
          return null
      }
    }, []
  )
   
  const onSubmit = () => {
    const data = {
      prepareTime,
      workTime,
      restTime,
      exerciseTime,
      cycleTime
    }
    onSubmitCallback(data)
  }

  return (
    <StyledWrapper>
      <StyledTitle variant="h5">Préparation</StyledTitle>
      <StyledInput name="prepare" type="number" value={prepareTime} inputProps={{ min: "0", max: "120", step: "5" }} onChange={onInputChange} />

      <StyledTitle variant="h5">Effort</StyledTitle>
      <StyledInput name="work" type="number" value={workTime} inputProps={{ min: "0", max: "120", step: "5" }} onChange={onInputChange} />

      <StyledTitle variant="h5">Repos</StyledTitle>
      <StyledInput name="rest" type="number" value={restTime} inputProps={{ min: "0", max: "120", step: "5" }} onChange={onInputChange} />

      <StyledTitle variant="h5">Exercices</StyledTitle>
      <StyledInput name="exercise" type="number" value={exerciseTime} inputProps={{ min: "0", max: "300", step: "1" }} onChange={onInputChange} />

      <StyledTitle variant="h5">Cycle</StyledTitle>
      <StyledInput name="cycle" type="number" value={cycleTime} inputProps={{ min: "0", max: "300", step: "1" }} onChange={onInputChange} />

      <StyledButton variant="contained" color="primary" size="large" onClick={onSubmit}>
        Commencer
      </StyledButton>
    </StyledWrapper>
  )
}

export default Settings