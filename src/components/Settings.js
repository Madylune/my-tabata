import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Paper, Button, Switch } from '@material-ui/core'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import HotelIcon from '@material-ui/icons/Hotel'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import toNumber from 'lodash/fp/toNumber'
import { BREAKPOINTS } from '../theme'
import FormInput from './FormInput'
import Exercices from './Exercises'

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledWrapper = styled(Paper)`
  && {
    height: 450px;
    width: 250px;
    margin: 0 20px 20px;
    padding: 20px 50px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.sm}) {
      width: 70%;
    }
  }
`

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .Icon {
    font-size: 35px;
    margin: 0 15px 10px 0;
    color: rgba(0, 0, 0, 0.7);
  }
`

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
  }
`

const Settings = ({ onSubmitCallback }) => {
  const [ prepareTime, setPrepareTime ] = useState(5)
  const [ workTime, setWorkTime ] = useState(30)
  const [ restTime, setRestTime ] = useState(10)
  const [ exerciseNb, setExerciseNb ] = useState(5)
  const [ cycleNb, setCycleNb ] = useState(1)

  const onInputNumberChange = useCallback(
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
          return setExerciseNb(toNumber(e.target.value))
        case 'cycle':
          return setCycleNb(toNumber(e.target.value))
        default:
          return null
      }
    }, []
  )

  const [ exercises, setExercises ] = useState([])
  const handleExercises = useCallback(
    exercises => setExercises(exercises)
  ,[])
   
  const onSubmit = () => {
    const data = {
      prepareTime,
      workTime,
      restTime,
      exerciseNb,
      cycleNb,
      exercises,
      sound
    }
    onSubmitCallback(data)
  }

  const [ sound, setSound ] = useState(true)
  const handleSound = useCallback(
    e => setSound(e.target.checked)
  ,[])

  return (
    <StyledContainer>
      <StyledWrapper elevation={3}>
        <FormInput 
          label="Préparation" 
          name="prepare" 
          value={prepareTime} 
          inputProps={{ min: "0", max: "120", step: "5" }} 
          onChange={onInputNumberChange}>
          <DirectionsWalkIcon className="Icon" />
        </FormInput>

        <FormInput 
          label="Effort" 
          name="work" 
          value={workTime} 
          inputProps={{ min: "5", max: "120", step: "5" }} 
          onChange={onInputNumberChange}>
          <DirectionsRunIcon className="Icon" />
        </FormInput>

        <FormInput 
          label="Repos" 
          name="rest" 
          value={restTime} 
          inputProps={{ min: "0", max: "120", step: "5" }} 
          onChange={onInputNumberChange}>
          <HotelIcon className="Icon" />
        </FormInput>

        <FormInput 
          label="Exercices" 
          name="exercise" 
          value={exerciseNb} 
          inputProps={{ min: "1", max: "100", step: "1" }} 
          onChange={onInputNumberChange}>
          <FitnessCenterIcon className="Icon" />
        </FormInput>

        <FormInput 
          label="Cycle" 
          name="cycle" 
          type="number" 
          value={cycleNb} 
          inputProps={{ min: "1", max: "100", step: "1" }} 
          onChange={onInputNumberChange}>
          <AutorenewIcon className="Icon" />
        </FormInput>

        <StyledForm>
          <VolumeUpIcon />
          <Switch
            checked={sound}
            onChange={handleSound}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </StyledForm>

        <StyledButton variant="contained" color="primary" size="large" onClick={onSubmit}>
          Commencer
        </StyledButton>
      </StyledWrapper>

      <Exercices 
        exerciseNb={exerciseNb}
        handleExercises={handleExercises}
        exercises={exercises}
      />

    </StyledContainer>
  )
}

export default Settings