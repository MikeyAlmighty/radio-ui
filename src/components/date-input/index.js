import React from 'react'
import { useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'

import InputWrapper from '../input-wrapper'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'

const StyledDatePicker = styled(DatePicker)`
  background-color: ${props =>
    props.disabled ? props.theme.colors.transparent : props.theme.colors.gray[0]};
  border: 1px solid
    ${props => (props.disabled ? props.theme.colors.gray.light : props.theme.colors.gray[0])};
  font-family: inherit;
  font-size: ${props => props.theme.fontSizes.small};
  padding: 0.6em 1em;
  height: 38px;
  border-radius: ${props => props.theme.radii.small};
  width: 100%;

  ::placeholder {
    color: ${props => props.theme.colors.gray.xdark};
  }
`

function getDateString(value) {
  return value instanceof Date ? value.toDateString() : value
}

const DateInput = props => {
  const {
    disabled,
    value,
    onBlur,
    onChange,
    placeholder,
    inputProps,
    alertText: alertTextOverride,
    dateFormatter = getDateString,
    ...otherProps
  } = props

  const { id = otherProps.name, label, inputStyle, name, required } = otherProps
  const { register, errors } = useFormContext()

  return (
    <InputWrapper alertText={alertTextOverride || errors[name] ? errors[name].message : ''} {...otherProps}>
      <StyledDatePicker
        onChange={onChange}
        style={inputStyle}
        aria-label={label}
        aria-required={required}
        id={id}
        placeholderText={placeholder || label}
        disabled={disabled}
        name={name}
        ref={register}
        {...inputProps}
      />
    </InputWrapper>
  )
}

DateInput.defaultProps = {
  dateFormat: 'dd/MM/yyyy',
  onChange: () => {}
}

export default DateInput
