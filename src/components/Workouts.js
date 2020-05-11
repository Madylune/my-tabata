import React from 'react'
import styled from 'styled-components'
import map from 'lodash/fp/map'
import round from 'lodash/fp/round'
import { Paper, Button, Typography } from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { WORKOUTS } from '../fixtures'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  margin-top: 30px;
`

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  justify-content: flex-end;
`

const StyledSubtitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
  .Icon {
    margin: 0 5px 0 10px;
  }
`

const StyledButton = styled(Button)`
  && {
    margin: 20px auto 10px;
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
      {map(workout => {
        const { exerciseNb, workTime, restTime, title, id, image, cycleNb } = workout
        const time = ((exerciseNb * (workTime + restTime)) * cycleNb) / 60
        return (
          <StyledCard key={id} elevation={5} image={image}>
            <StyledContent>
              <Typography variant="h5">
                {title}
              </Typography>
              <StyledSubtitle variant="subtitle2">
                <AlarmIcon className="Icon" />{round(time)}min
                <AutorenewIcon className="Icon" />{cycleNb}
                <FitnessCenterIcon className="Icon" />{exerciseNb}
              </StyledSubtitle>
              <StyledButton variant="contained" color="secondary" onClick={() => onSubmitCallback(workout)}>
                Démarrer
              </StyledButton>
            </StyledContent>
          </StyledCard>
        )
      },WORKOUTS)}
    </StyledCards>
  </StyledWrapper>

export default Workouts