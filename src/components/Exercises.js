import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Paper, Button, Input, Typography } from '@material-ui/core'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import toPairs from 'lodash/fp/toPairs'
import isEmpty from 'lodash/fp/isEmpty'
import get from 'lodash/fp/get'
import { BREAKPOINTS } from '../theme'

const StyledPaper = styled(Paper)`
  margin: 0 20px 20px;
  height: 450px;
  width: 250px;
  padding: 20px 50px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 70%;
  }
`

const StyledExercices = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow-y: scroll;
`

const StyledInput = styled(Input)`
  && {
    min-height: 60px;
    width: 250px;
  }
`

const StyledExercise = styled(Typography)`
  && {
    margin: 10px 0;
    width: 250px;
    display: flex;
    align-items: center;
  }
  .Icon {
    margin-right: 10px;
  }
`

const Exercices = ({ exerciseNb, handleExercises, exercises }) => {
  const [ state, setState ] = useState({})
  const handleChange = e => 
    setState({
      ...state,
      [e.target.name]: e.target.value || ''
    })
  
  const onSubmit = () => {
    const exos = toPairs(state)
    const exercicesList = map(ex => ({
      id: ex[0],
      title: ex[1]
    }), exos)

    handleExercises(exercicesList)
  }

  const [ isEdited, setIsEdited ] = useState(false)
  useEffect(() => {
    if (!isEmpty(exercises)) {
      setIsEdited(true)
    }
  }, [exercises])

  const onEdit = () => setIsEdited(false)

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5">Mes exercices</Typography>
      <StyledExercices>
        {isEdited
          ? map(exercise => 
            <StyledExercise key={exercise.id} variant="body1">
              <FitnessCenterIcon className="Icon" />
              {exercise.title}
            </StyledExercise>
          ,exercises)
          : times(exercise => 
            <StyledInput 
              key={exercise} 
              placeholder={`Exercice n°${exercise + 1}`}  
              name={`Exercise${exercise + 1}`}
              onChange={handleChange}
              defaultValue={get([exercise, 'title'], exercises)}
            />
            , exerciseNb)} 
      </StyledExercices>

      <Button variant="contained" color="primary" size="large" onClick={isEdited ? onEdit : onSubmit}>
        {isEdited ? 'Modifier' : 'Valider'}
      </Button>
    </StyledPaper>
  )
}

export default Exercices