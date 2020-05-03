import React from 'react'
import styled from 'styled-components'
import map from 'lodash/fp/map'
import { Typography } from '@material-ui/core'
import { VIDEOS } from '../fixtures'
import { BREAKPOINTS } from '../theme'

const StyledWrapper = styled.div`
  margin-top: 30px;
`

const StyledVideos = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledSeparator = styled.hr`
  width: 80%;
  margin: 20px auto;
`

const StyledIframe = styled.iframe`
  margin: 10px;
`

const Videos = () => 
  <StyledWrapper>
    <StyledSeparator />
    <Typography variant="h4">
      Recommandations
    </Typography>
    <StyledVideos>
      {map(video => 
        <StyledIframe 
          key={video.url}
          width="300" 
          height="200" 
          src={video.url}
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;" 
          allowfullscreen>
        </StyledIframe>
      ,VIDEOS)}
    </StyledVideos>
  </StyledWrapper>

export default Videos