import React from 'react'
import styled from 'styled-components'
import map from 'lodash/fp/map'
import { Paper, Button, Typography } from '@material-ui/core'
import { WORKOUTS } from '../fixtures'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  margin-top: 30px;
`

const StyledCards = styled.div`
  display: flex;
  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledCard = styled(Paper)`
  && {
    margin: 10px;
    width: 300px;
    height: 200px;
    background-image: ${props => `url(${require(`../assets/${props.image}`)})`};
    background-size: cover;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const StyledContent = styled.div`
  background-color: rgba(0,0,0,0.25);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
  }
`

const StyledSeparator = styled.hr`
  width: 80%;
  margin: 20px auto;
`

const Workouts = ({ onSubmitCallback }) => 
  <StyledWrapper>
    <StyledSeparator />
    <Typography variant="h4">
      Séances pré-programmées
    </Typography>
    <StyledCards>
      {map(workout => 
        <StyledCard key={workout.id} elevation={5} image={workout.image}>
          <StyledContent>
            <Typography variant="h5">
              {workout.title}
            </Typography>
            <StyledButton variant="contained" color="secondary" onClick={() => onSubmitCallback(workout)}>
              Démarrer
            </StyledButton>
          </StyledContent>
        </StyledCard>
      ,WORKOUTS)}
    </StyledCards>
  </StyledWrapper>

export default Workouts