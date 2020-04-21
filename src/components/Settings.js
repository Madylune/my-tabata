import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { 
  Paper, 
  Button,
  IconButton,
  TextField as Input,
  Typography
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import toNumber from 'lodash/fp/toNumber'
import map from 'lodash/fp/map'
import get from 'lodash/fp/get'
import toArray from 'lodash/fp/toArray'
import isEmpty from 'lodash/fp/isEmpty'
import { BREAKPOINTS } from '../theme'
import ExercicesModal from './Exercises'

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledWrapper = styled(Paper)`
  && {
    width: fit-content;
    padding: 20px 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.sm}) {
      padding: 10px 50px;
    }
  }
`

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: -50px;
  }
`

const StyledInput = styled(Input)`
  && {
    height: 70px;
    width: 200px;

    label {
      font-size: 24px;
    }
    input {
      font-size: 22px;  
    }
  }
`

const StyledButton = styled(Button)`
  && {
    margin: 20px 0 10px;
  }
`

const StyledExercises = styled.div`
  margin-left: 50px;
`

const StyledExercise = styled.div`

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
   
  const onSubmit = () => {
    const data = {
      prepareTime,
      workTime,
      restTime,
      exerciseNb,
      cycleNb,
      exercises
    }
    onSubmitCallback(data)
  }

  const [ open, setOpen ] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [ exercises, setExercises ] = useState([])
  const handleExercises = useCallback(
    exercises => setExercises(exercises)
  ,[])
 
  return (
    <StyledContainer>
      <StyledWrapper elevation={3}>
        <StyledInput 
          label="Préparation" 
          name="prepare" 
          type="number" 
          value={prepareTime} 
          inputProps={{ min: "0", max: "120", step: "5" }} 
          onChange={onInputNumberChange}
        />

        <StyledInput 
          label="Effort" 
          name="work" 
          type="number" 
          value={workTime} 
          inputProps={{ min: "0", max: "120", step: "5" }} 
          onChange={onInputNumberChange} 
        />

        <StyledInput 
          label="Repos" 
          name="rest" 
          type="number" 
          value={restTime} 
          inputProps={{ min: "0", max: "120", step: "5" }} 
          onChange={onInputNumberChange} 
        />

        <StyledForm>
          <StyledInput 
            label="Exercices" 
            name="exercise" 
            type="number" 
            value={exerciseNb} 
            inputProps={{ min: "0", max: "300", step: "1" }} 
            onChange={onInputNumberChange} 
          />
          <StyledIconButton aria-label="edit" onClick={handleOpen}>
            <EditIcon />
          </StyledIconButton>
          <ExercicesModal 
            open={open} 
            handleClose={handleClose} 
            exerciseNb={exerciseNb} 
            handleExercises={handleExercises}
            exercises={exercises}
          />
        </StyledForm>

        <StyledInput 
          label="Cycle" 
          name="cycle" 
          type="number" 
          value={cycleNb} 
          inputProps={{ min: "0", max: "300", step: "1" }} 
          onChange={onInputNumberChange} 
        />

        <StyledButton variant="contained" color="primary" size="large" onClick={onSubmit}>
          Commencer
        </StyledButton>
      </StyledWrapper>

      {!isEmpty(exercises) && (
        <StyledExercises>
          <Typography variant="h6">Exercices:</Typography>
          {map(exercise => 
            <StyledExercise key={get('id', exercise)}>
              <Typography variant="body1">{get('title', exercise)}</Typography>
            </StyledExercise>
          , toArray(exercises))}
        </StyledExercises>
      )}
    </StyledContainer>
  )
}

export default Settings