import React from 'react'
import styled from 'styled-components'
import { TextField as Input } from '@material-ui/core'
import { BREAKPOINTS } from '../theme'

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

const FormInput = ({ children, label, name, value, inputProps, onChange }) => {
  const { min, max, step } = inputProps
  return (
    <StyledForm>
      {children}
      <StyledInput 
        label={label}
        name={name} 
        type="number" 
        value={value} 
        inputProps={{ min, max, step }} 
        onChange={onChange}
      />
    </StyledForm>
  )
}

export default FormInput