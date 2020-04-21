import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Button,
  Input,
  Typography
} from '@material-ui/core'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import toPairs from 'lodash/fp/toPairs'
import { BREAKPOINTS } from '../theme'

const StyledContent = styled.div`
  border-radius: 5px;
  background-color: #ffffff;
  margin: 50px auto;
  height: 450px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
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

const Exercices = ({ open, handleClose, exerciseNb, handleExercises, exercises }) => {
  const [ state, setState ] = useState({})
  const handleChange = e => 
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  
  const onSubmit = () => {
    const exos = toPairs(state)
    const exercicesList = map(ex => ({
      id: ex[0],
      title: ex[1]
    }), exos)

    handleExercises(exercicesList)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledContent>
        <Typography variant="h5">Nommer les exercices</Typography>
        <StyledExercices>
          {times(exercise => 
            <StyledInput 
              key={exercise} 
              placeholder={`Exercice n°${exercise + 1}`}  
              name={`Exercise${exercise + 1}`}
              onChange={handleChange}
            />
            , exerciseNb
          )} 
        </StyledExercices>

        <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
          Valider
        </Button>
      </StyledContent>
    </Modal>
  )
}

export default Exercices