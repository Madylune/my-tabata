import React from 'react'
import styled from 'styled-components'
import { Typography, CircularProgress } from '@material-ui/core'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { BREAKPOINTS } from '../theme'

const StyledCircleWrapper = styled.div`
  margin: 10px auto;
  position: relative;
  height: ${props => props.isMobile ? 300 : 350}px;
  width: ${props => props.isMobile ? 300 : 350}px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const StyledCircularProgress = styled(CircularProgress)`
  && {
    position: absolute;
    color: ${props => props.timercolor};
    z-index: 1;
    top: 0;
    left: 0;
  }
`

const StyledCircleContent = styled.div`
  position: absolute;
  background-color: rgba(0,0,0,0.6);
  height: ${props => props.isMobile ? 240 : 280}px;
  width: ${props => props.isMobile ? 240 : 280}px;
  border-radius: 50%;
`

const StyledNumber = styled(Typography)`
  && {
    margin-top: ${props => props.isMobile ? 15 : 20}%;
    font-size: 8rem;
  }
`

const StyledInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledText = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    margin: 0 10px;
    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 20px;
    }
  }
`

const Timer = ({ timerColor, isMobile, title, currentCycle, currentExercise, cycleNb, exerciseNb, max, timer }) => {
  const MIN = 0
  const normaliseCountdown = value => (value - MIN) * 100 / (max - MIN)

  return (
    <StyledCircleWrapper isMobile={isMobile}>
      <StyledCircularProgress 
        timercolor={timerColor}
        size={isMobile ? 300 : 350}
        thickness={4}
        variant="static" 
        value={normaliseCountdown(timer)} 
        title={title}
      />
      <StyledCircleContent isMobile={isMobile}>
        <StyledNumber isMobile={isMobile} variant={isMobile ? 'h3' : 'h1'}>
          {timer}
        </StyledNumber>
        <StyledInfos>
          <StyledText variant="h5">
            <AutorenewIcon className="Icon" />
            {currentCycle} / {cycleNb}
          </StyledText>
          <StyledText variant="h5">
            <FitnessCenterIcon className="Icon" /> 
            {currentExercise} / {exerciseNb}
          </StyledText>
        </StyledInfos>
      </StyledCircleContent>
    </StyledCircleWrapper>
  )
}

export default Timer