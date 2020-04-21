import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { 
  Paper, 
  Button,
  IconButton,
  TextField as Input,
  Typography,
  Switch
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import HotelIcon from '@material-ui/icons/Hotel'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
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
    padding: 20px 50px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.sm}) {
      padding: 10px 70px;
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
    @media (max-width: ${BREAKPOINTS.sm}) {
      width: 150px;
    }
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
    margin-top: 10px;
  }
`

const StyledExercises = styled.div`
  margin-left: 50px;
`

const StyledExercise = styled.div``

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
      exercises,
      sound
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

  const [ sound, setSound ] = useState(true)
  const handleSound = useCallback(
    e => setSound(e.target.checked)
  ,[])

  return (
    <StyledContainer>
      <StyledWrapper elevation={3}>
        <StyledForm>
          <DirectionsWalkIcon className="Icon" />
          <StyledInput 
            label="Préparation" 
            name="prepare" 
            type="number" 
            value={prepareTime} 
            inputProps={{ min: "0", max: "120", step: "5" }} 
            onChange={onInputNumberChange}
          />
        </StyledForm>

        <StyledForm>
          <DirectionsRunIcon className="Icon" />
          <StyledInput 
            label="Effort" 
            name="work" 
            type="number" 
            value={workTime} 
            inputProps={{ min: "0", max: "120", step: "5" }} 
            onChange={onInputNumberChange} 
          />
        </StyledForm>

        <StyledForm>
          <HotelIcon className="Icon" />
          <StyledInput 
            label="Repos" 
            name="rest" 
            type="number" 
            value={restTime} 
            inputProps={{ min: "0", max: "120", step: "5" }} 
            onChange={onInputNumberChange} 
          />
        </StyledForm>

        <StyledForm>
          <FitnessCenterIcon className="Icon" />
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

        <StyledForm>
          <AutorenewIcon className="Icon" />
          <StyledInput 
            label="Cycle" 
            name="cycle" 
            type="number" 
            value={cycleNb} 
            inputProps={{ min: "0", max: "300", step: "1" }} 
            onChange={onInputNumberChange} 
          />
        </StyledForm>

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